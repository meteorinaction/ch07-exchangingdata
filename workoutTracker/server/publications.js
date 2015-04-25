Meteor.publish('workouts', function (options) {
  check(options, {
    limit: Number,
    sorting: Number
  });

  var qry = {};
  var qryOptions = {
    limit: options.limit,
    sort: {
      workoutAt: options.sorting
    }
  }

  return WorkoutsCollection.find(qry, qryOptions);
});

Meteor.publish('distanceByMonth', function () {
  var subscription = this;
  var initiated = false;
  var distances = {};

  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  var pipeline = [{
    $group: {
      _id: {
        $month: '$workoutAt'
      },
      distance: {
        $sum: '$distance'
      }
    }
  }];

  db.collection('workouts').aggregate(
    pipeline,
    Meteor.bindEnvironment(
      function (err, result) {
        console.log('result', result);
        _.each(result, function (r) {
          subscription.added('distanceByMonth', r._id, {
            distance: r.distance
          });
        })
      }
    )
  )
  var workoutHandle = WorkoutsCollection
    .find()
    .observeChanges({
      added: function (id, fields) {
        if (!initiated) return;

        idByMonth = new Date(fields.workoutAt).getMonth() + 1;

        distances[idByMonth] += fields.distance;

        subscription.changed('distanceByMonth',
          idByMonth, {
            distance: distances[idByMonth]
          }
        )
      }
    });

  subscription.ready();
});
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

  subscription.ready();
});
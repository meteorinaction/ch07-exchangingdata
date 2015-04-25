Meteor.publish('workouts', function (options) {
  check(options, {
    limit: Number
  });

  var qry = {};
  var qryOptions = {
    limit: options.limit,
    sort: {
      workoutAt: 1
    }
  }

  return WorkoutsCollection.find(qry, qryOptions);
});
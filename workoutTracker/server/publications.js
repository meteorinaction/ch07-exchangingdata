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
getRandomDate = function () {
  var start = new Date(2014, 0, 1);
  var end = new Date(2015, 0, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

Meteor.startup(function () {
  WorkoutsCollection.remove({});

  if (Meteor.users.findOne()) {
    var userId = Meteor.users.findOne()._id;

    var workouts = 100;
    for (var i = 0; i < workouts; i++) {
      // random distance between 1 and 10
      var distance = parseInt(Math.random() * 10) + 1;
      WorkoutsCollection.insert({
        type: 'jogging',
        workoutAt: getRandomDate(),
        distance: distance,
        userId: userId
      })
    }
  }
});
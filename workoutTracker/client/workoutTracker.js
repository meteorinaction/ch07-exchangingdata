Meteor.subscribe('workouts');

Template.workoutList.onCreated(function () {
  this.subscribe('workouts');
});

Template.workoutList.helpers({
  workouts: function () {
    return WorkoutsCollection.find({}, {
      sort: {
        workoutAt: -1
      }
    });
  }
});
Session.setDefault('limit', 10);

// Subscriptions
Tracker.autorun(function (computation) {
  Meteor.subscribe('workouts', {
    limit: Session.get('limit')
  });
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
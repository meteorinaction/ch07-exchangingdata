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

Template.workoutList.events({
  'click button.show-more': function (evt, tpl) {
    var newLimit = Session.get('limit') + 10;
    Session.set('limit', newLimit);
  }
});
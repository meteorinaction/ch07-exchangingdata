Session.setDefault('limit', 10);
Session.setDefault('sorting', -1);
DistanceByMonth = new Mongo.Collection('distanceByMonth');

// Subscriptions
Tracker.autorun(function (computation) {
  Meteor.subscribe('workouts', {
    limit: Session.get('limit'),
    sorting: Session.get('sorting')
  });
  Meteor.subscribe('distanceByMonth');
});

Template.workoutList.helpers({
  sortLabel: function () {
    switch (Session.get('sorting')) {
    case -1:
      return 'Showing newest first';
    case 1:
      return 'Showing oldest first';
    default:
      return 'unknown sort order'
    }
  },
  workouts: function () {
    return WorkoutsCollection.find({}, {
      sort: {
        workoutAt: Session.get('sorting')
      }
    });
  }
});

Template.workoutList.events({
  'click button.show-more': function (evt, tpl) {
    var newLimit = Session.get('limit') + 10;

    Session.set('limit', newLimit);
  },
  'click button.sort-order': function (evt, tpl) {
    (Session.get('sorting') === -1) ? Session.set('sorting', 1): Session.set('sorting', -1);

  }
});
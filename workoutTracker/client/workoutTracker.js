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

monthLabels = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'Mai',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

Template.distanceByMonth.helpers({
  month: function () {
    return DistanceByMonth.find({}, {
      sort: {
        _id: 1
      }
    });
  },
  translateMonth: function () {
    return monthLabels[this._id];
  }
});

Template.addWorkout.events({
  'submit form': function (evt, tpl) {
    evt.preventDefault();

    var distance = parseInt(tpl.$('input[name="distance"]').val());

    Meteor.call('CreateWorkout', {
      distance: distance
    }, function (error, result) {
      if (error) return alert('Error: ' + error.error);
    });
  }
});
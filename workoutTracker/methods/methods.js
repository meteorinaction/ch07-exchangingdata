Meteor.methods({
  'CreateWorkout': function (data) {
    check(data, {
      distance: Number
    });

    var distance = data.distance;
    if (distance <= 0 || distance > 45) {
      throw new Meteor.Error('Invalid distance');
    }

    if (!this.userId) {
      throw new Meteor.Error('You have to login');
    }

    data.workoutAt = new Date();
    data.type = 'jogging';
    data.userId = this.userId;

    return WorkoutsCollection.insert(data);
  }
});
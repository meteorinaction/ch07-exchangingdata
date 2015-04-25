Meteor.publish('workouts', function () {
  return WorkoutsCollection.find({});
});
// // Lists -- {name: String}
// Topics = new Meteor.Collection("lists");

// // Publish complete set of lists to all clients.
// Meteor.publish('lists', function () {
//   return Lists.find();
// });


// Topics -- {title: String,
//           description: String,
//           interestedStudents: {String, Number}}
Topics = new Meteor.Collection("topics");
Pictures = new Meteor.Collection("pictures");
Animals = new Meteor.Collection("animals");

// // Publish all topics
// Meteor.publish('topics', function () {
//   return Topics.find();
// });

// Autopublish is on for now so we don't need to worry about publishing

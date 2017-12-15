const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reminders_db');
let Reminder = require("../models/reminder");
Reminder.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

let reminders = [
  {
    title: "Cat",
    message: "Figure out his halloween costume for next year"
  },
  {
    title: "Laundry",
    message: "Color-code socks"
  },
  {
    title: "Spanish",
    message: "Learn to count to five so I can sing 'Mambo Numero Cinco'"
  }
];

Reminder.create(reminders, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});
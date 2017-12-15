// requiring mongoose dependency
const mongoose = require('mongoose');

// defining schema for reminders
let ReminderSchema = new mongoose.Schema({
  title: String,
  message: String,
  createdAt: { type : Date, default: new Date() }
});
// define the model
let Reminder = mongoose.model("Reminder", ReminderSchema);
// export the model to any files that `require` this one
module.exports = Reminder;
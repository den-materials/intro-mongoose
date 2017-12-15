let Reminder = require("../models/reminder")

let remindersController = {
  index: function(req, res) {
    Reminder.find({}, function(err, docs) {
      res.render("reminders/index", {reminders: docs});
    });
  },
  new: function(req, res) {
    res.render("reminders/new")
  },
  create: function(req, res) {
    // strong params
    let title = req.body.title;
    let message = req.body.message;
    Reminder.create({title: title, message: message}, function(err, doc) {
      // if there there is an error: redirect to reminders#new; else: redirect to reminders#index
      err ? res.redirect("/reminders/new") : res.redirect("/reminders");
    })
  }
}

module.exports = remindersController;
<!--
Creator: Alex White
Market: SF
Adapted By: Zeb Girouard
Market: DEN
-->

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

<!--We should probably change 'reminders' (the project folder) to 'reminders_app' and 'body' (reminders property) should be 'message' so we don't have such overloaded terms -->

<!--10:30 5 minutes -->

<!-- Hook: (Show hands) How many of you know about SQL?  How many of you love SQL?  How many of you have had a SQL syntax problem that drove you crazy?  This is the reason that so many frameworks and modelers have been developed.  

(Show hands) Who feels Mongo is better than good ol' Javascript?

-->

<!--WDI5 1:38 -->

# Intro to Mongoose

## Learning Objectives

By the end of this lesson you should be able to...

* **Compare** and **contrast** Mongoose with Mongo
* **Create** Mongoose schemas & models
* **Integrate** Mongoose with Express
* **Build out** `index`, `new`, and `create` routes with Mongoose & Express

## Why

Mongoose is an ODM, an **Object Document Mapper**. It *maps* documents in a database to JavaScript Objects, making modifying the database possible with easy to use JavaScript helper methods.

>"Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose."

>—Creators of Mongoose.

<!--1:44 WDI5 -->
<!--10:35 10 minutes -->

## Terminology
- **Schema**: Similar to an object constructor, a Schema is a diagram or blueprint for what every object in the noSQL database will contain.  Here's an example of a simple Address Book noSQL database schema:  

```javascript
  let ContactSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String
    phoneNumber: Number,
    email: String,
    professionalContact: Boolean
  });
```

*With the above Schema, we can expect all of our Address Book entries would have a first name, last name, address, and email address in the form of Strings.  We can count on the phoneNumber to always be accepted, stored, and returned as a number.  Lastly, the boolean value of Professional Contact will always be a `true` or `false`*

- **Model**: A model is a Schema that has been 'activated' with real data and is performing actions such as reading, saving, updating, etc.

```javascript
  let Contact = mongoose.model('Contact', ContactSchema);
```

#### Schema vs. Model

>"In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document. It's a way to express expected properties and values as well as constraints and indexes. A model defines a programming interface for interacting with the database (read, insert, update, etc). So a schema answers "what will the data in this collection look like?" and a model provides functionality like "Are there any records matching this query?" or "Add a new document to the collection". ""

-[Peter Lyons Apr 8 '14 at 23:53](http://stackoverflow.com/a/22950402)

In other words, a `Schema` is like an empty portion plate:
![portion plate](images/portionPlate.jpg)

That your lunchlady (the `Model`) will be filling to create new `Instances` of your meal:
![portion plate](images/filledPlate.png)

<!-- Analogy on the board: schema -> skeleton, model -> body -->

<!--CFU: Catch-phrase with Schema, Model, Mongo, and Mongoose in pairs -->



<!-- Explain: in this lesson, I will be the only one typing, but I need help from all the devs to shout out next step, so need them to be following along. -->

<!--Doing this as a catch-up for WDI4 cuz we had a headstart-->
<!--WDI4 1:33 -->
<!--WDI5 1:54 -->
<!--10:45 15 minutes -->
## Example (I do)

From the console: 

```
mkdir mongoose_project
cd mongoose_project
npm init -y
npm install --save mongoose
```

We need to make sure MongoDB is running.  From the console, enter this command:

```
mongod
```
<!--WDI4 1:42 -->
<!--WDI5 1:58 -->

Create a new Javascript file by typing `touch index.js` into the terminal.

Let's require mongoose and connect to our database.

```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
```

### Modeling

Let's create a `Book` model. A `Book` has a few different characteristics: `title`, `author`, and `description`.

To create a `Book` model we have to use a Schema:

```javascript
let Schema = mongoose.Schema;
let BookSchema = new Schema({
    title: String,
    author: String,
    description: String
});
```
and finally create the model

```javascript
let Book = mongoose.model('Book', BookSchema);
```

<!--1:57 WDI4 -->
<!--WDI5 2:05 -->

Check the docs to see all the different [datatypes](http://mongoosejs.com/docs/schematypes.html) we can use in a Schema.

### Create: Building and Creating Documents

If you want to build a new `Book`, you can just do the following:

```javascript
let book = new Book({title: "Alice's Adventures In Wonderland"});
```

Then you can still edit it before saving.

```javascript
book.author = "Lewis Carroll";
```

Once you're done building you can save the book.

```javascript
book.save();
```

<!--WDI4 2:06 -->

>Note: you can pass a function that will be called (aka a callback) once the `book` is done being saved.

If you want to build & save in one step you can use `.create`. Also we'll pass it a callback to execute once it's done creating the book.

```javascript
Book.create({title: "The Giver"}, function (err, book) {
  console.log(book);
});
```

<!--WDI4 just showed .create -->
<!--WDI5 2:13 -->

### Read

We can find books by any field, including `author`:

```javascript
  Book.find({author: "Lewis Carroll"}, function (err, books) {
    console.log(books);
  });
```

We can find ALL by specifying any `fields` we're filtering for, aka an empty object:

```javascript
Book.find({}, function(err, books){
  console.log(books);
});
```

<!--WDI4 2:13 -->

Try out some of the other find methods.

```javascript
.findOne();
.findById();
```
Reference the [docs](http://mongoosejs.com/docs/guide.html) for more info on what you can do with Mongoose queries and models (use the left-hand side-bar).

<!--WDI5 2:21 -->

### Destroy
Removing a Document is as simple as Building and Creating.

Using the remove method:

```js
Book.remove({ title: "The Giver" }, function(err, book) {
  if (err) { return console.log(err) };
  console.log("removal of " + book.title + " successful.");
});
```

Other removal methods include:

```js
findByIdAndRemove();
findOneAndRemove();
```

<!--CFU: What command do I use to search for a document with Mongoose?  What command do I use to make and save a new document? -->

<!--WDI5 2:28  -->
<!--WDI4 2:30 -->

<!--11:00 15 minutes -->

## Integrating Mongoose into Express

<!--WDI5 2:38  -->

Well, that's nice. But let's see how mongoose plays with express by building a reminders app. called [reminders](https://github.com/ga-dc/reminders_mongo)

Lets create a brand new express application and grab up all the dependencies we'll need

```bash
$ mkdir reminders
$ cd reminders
$ npm init -y
$ npm install --save express ejs ejs-locals body-parser mongoose
$ touch index.js
```

The dependencies we'll be using for this app are:

  1. `express` - web Frameworks
  1. `ejs` - view engine
  1. `ejs-locals` - EJS tool that allows us to use layouts
  1. `body-parser` - allows us to get parameter values from forms
  1. `mongoose` - our Mongo ODM

Let's first start by defining our schema, models and creating some seed data.

Folders/files:

```bash
$ mkdir db
$ mkdir models
$ touch models/reminder.js
$ touch db/seed.js
```

<!--WDI5 2:45  -->
<!--WDI4 2:39 -->

We will define the structure of our database using schemas

In `models/reminder.js`:

```js
// requiring mongoose dependency
const mongoose = require('mongoose');

// defining schema for reminders
let ReminderSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: { type : Date, default: new Date() }
});
// define the model
let Reminder = mongoose.model("Reminder", ReminderSchema);
// export the model to any files that `require` this one
module.exports = Reminder;
```

Great! Now that we have an interface for our models, let's create a seed file so we have some data to work with in our application.

<!--WDI5 2:52  -->
<!--WDI4 2:48 -->

In `db/seed.js`:

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reminders');
let Reminder = require("../models/reminder");
Reminder.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
})

let reminders = [
  {
    title: "Cat",
    body: "Figure out his halloween costume for next year"
  },
  {
    title: "Laundry",
    body: "Color-code socks"
  },
  {
    title: "Spanish",
    body: "Learn to count to ten to impress the ladies"
  }
];

Reminder.create(reminders, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs)
    mongoose.connection.close();
  }
});
```

Feel free to personalize the reminders to suit your own interests and errands. 

Now run the seed file in order to add these default values to our Database, by typing ```node db/seed.js``` in the terminal.

<!--WDI5 3:06  -->
<!--WDI4 2:55 -->

<!-- 11:15 5 minutes REALLY?! 5 minutes for this?!-->
<!--WDI4 3:05 -->

## Server Setup

Now we've got all of our models and seed data set. Let's start building out the reminders application. Let's update our main application file to include the dependencies we'll need.

In `index.js`:

```js
// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');

// Configuration
mongoose.connect('mongodb://localhost/reminders');
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.engine('ejs', engine);  // sets EJS engine
app.set("view engine", "ejs");  // sets view engine to EJS
app.use(bodyParser.json());  // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));  // looks for assets like stylesheets in a `public` folder
var port = 3000;  // define a port to listen on

// Controllers
let remindersController = require("./controllers/remindersController");

// Routes
app.get("/reminders", remindersController.index);

// Start server
app.listen(port, function() {
  console.log("app is running on port:", port);
});
```

>Challenge: Build out your own server file.  Make sure it works by running it with ```node``` or ```nodemon```.

<!--WDI5 3:15 -->
<!--11:20 10 minutes -->

## Reminders Index

As we can see on the last line of the code above, we have just one route. It's using `remindersController.index ` as a callback, but it hasn't been defined yet. Let's define it now:

```bash
$ mkdir controllers
$ touch controllers/remindersController.js
```

And then add this into our new remindersController.js file:

```js
var Reminder = require("../models/reminder")

var remindersController = {
  index: function(req, res) {
    Reminder.find({}, function(err, docs) {
      res.render("reminders/index", {reminders: docs});
    });
  }
}

module.exports = remindersController;
```

<!--3:28 WDI5 -->

Now we're referncing an ejs view that doesn't exist yet. Lets create that now, as well as our layout view:

```bash
$ mkdir views
$ touch views/layout.ejs
$ mkdir views/reminders
$ touch views/reminders/index.ejs
```

In `views/layout.ejs`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
    <header>
      <h1><a href="/reminders">Reminder.ly</a></h1>
      <a href="/reminders/new">+ Reminder</a>
    </header>
    <hr>
    <!-- the below `triple-stash`, avoid escaping any html -->
   <%- body %>
  </body>
</html>
```

In `views/reminders/index.ejs`:

```html
<% layout('../layout') -%>
<ul>
  <% for(var i=0; i< reminders.length; i++) {%>
    <li class="reminder">
      <a class="reminder-title" href="<%= '/reminders/'+reminders[i]._id %>"><%= reminders[i].title %>:</a>
      <span class="reminder-body"><%= reminders[i].body %></span>
    </li>
  <% } %>
</ul>
```

<!--3:30 turning over to devs WDI4 -->

>Challenge: Create these template files in your own project.  What happens when you try to go to ```localhost:3000/reminders```?

<!--11:30 10 minutes -->

## New Reminder

We'll need to update our routes in `index.js` to add `#new` and `#create` actions.

```js
app.get("/reminders", remindersController.index);
app.get("/reminders/new", remindersController.new);
app.post("/reminders", remindersController.create);
```

Our views/reminders/new.ejs should look something like this:

```html
<% layout('../layout') -%>
<h2>Create a New Reminder</h2>
<form action="/reminders" method="post">
  <label for="reminder-title">Title:</label>
  <input id="reminder-title" type="text" name="title">
  <label for="reminder-body">Body:</label>
  <input id="reminder-body" type="text" name="body">
  <input type="submit">
</form>
```

Finally our updated `remindersController` will be:

```js
var Reminder = require("../models/reminder")

var remindersController = {
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
    var title = req.body.title;
    var body = req.body.body;
    Reminder.create({title: title, body: body}, function(err, doc) {
      // if there there is an error: redirect to reminders#new; else: redirect to reminders#index
      err ? res.redirect("/reminders/new") : res.redirect("/reminders");
    })
  }
}

module.exports = remindersController;
```
### You Did It!

![congrats](images/elfCongrats.gif)

* First, verify that a user can see reminders on ```localhost:3000/reminders```.  Also, check that a user can make a new reminder by going to ```localhost:3000/reminders/new```.


<!--CFU: Think-pair-share: What is the most important thing you learned to do today (Mongo or Mongoose)? -->

<!-- Closing

Mongoose is an extension of the logic that made Node and Express grow in popularity: if we can write it all in Javascript, we have no major miscommunication issues in the stack.  For tomorrow, think about a specific thing you'd like to do in pure Javascript to incorporate into your app.  Chances are, there's already a library for it.  If not, you'll have a really fun project idea. --> 

## Bonus!

#### Show a Single ToDo

* A user should be able to click on any reminder's title on the `reminders` page and be directed to the specific `reminder` page that displays information about that reminder.  Add that functionality to your reminders page.  Bonus: add more information to this page that only shows up on this page, but not on the index page with all reminders.

#### CRUDing in the Console

* Checkout the `solution-code` directory and examine the file `db/console.js`. It drops you into a REPL session with the database and all your models pre-loaded. You can run `node db/console.js` to see for yourself. CRUD some data in this REPL.
>Note: If for some reason it's not working, try restarting your `mongod` process.

#### Refactor
* How would you refactor your `index.js` so that all the configuration logic lived in a file `config/config.js`?
* How about refactoring the code so that your routes live in `config/routes.js`?

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.

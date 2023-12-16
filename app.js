const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const mainRouter = require('./routes');
const port = 3000;
const ejs = require("ejs");
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mentormedb', {useNewUrlParser: true, useUnifiedTopology: true });

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up static files directory
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Use main router
app.use('/', mainRouter);

// Start the server
app.listen(port, () => {
  console.log('Views directory:', path.join(__dirname, 'views'));
  console.log('mentor.ejs path:', path.join(__dirname, 'views', 'mentor.ejs'));

  console.log(`Server is listening at http://localhost:${port}`);
});

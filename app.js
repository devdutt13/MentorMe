// index.js
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const mainRouter = require('./routes');
const port = 3000;

const app = express();
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mentormedb', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

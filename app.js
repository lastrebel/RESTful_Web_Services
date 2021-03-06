const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// const db = mongoose.connect('mongodb://localhost/bookAPI-prod');

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is a real');
  const db = mongoose.connect('mongodb://localhost/bookAPI-prod');
}

const port = process.env.PORT || 3005;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/API', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodamon API.');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;

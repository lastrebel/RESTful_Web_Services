const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3005;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    console.log(book);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    //const response = { hello: 'This is my API from express' };
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      } return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, books) => {
      if (err) {
        return res.send(err);
      } return res.json(books);
    });
  });

app.use('/API', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodamon API.');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

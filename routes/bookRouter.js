// const { Router } = require('express');
const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

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
      Book.find(query, (err, book) => {
        if (err) {
          return res.send(err);
        } return res.json(book);
      });
    });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        } return res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;

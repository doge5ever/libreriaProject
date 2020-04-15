const booksSeed = require('../seed/booksSeed')

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  getBooks: (req, res) => {
    Book.create(bookSeed, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        res.json(book)
      }
    })
  }
}
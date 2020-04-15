const booksSeed = require('../seed/booksSeed')

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  seedDatabase: (req, res) => {
    Book.create(booksSeed, (err, book) => {
      if (err) {
        res.json(err);
      } else {
        res.json(book)
      }
    })
  }
}
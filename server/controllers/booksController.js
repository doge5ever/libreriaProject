const booksSeed = require('../seed/booksSeed')

const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  getBooks: (req, res) => {
    Book.find({}, (err, book) => {
      if (err) {
          console.log(err)
          res.json({status: "ERROR", message: "Get Books", data: err})
      } else {
          console.log(book)
          res.json({status: "OK", message: "Get Books", data: books})
      }
    })
  }
}
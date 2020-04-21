const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  getBooks: (req, res) => {
    console.log("Received the following query parameters: ", req.query)
    Book.find({
      product_id: {$in: req.query.product_id}
    },
      'title price product_id'
    )
    .then((output) => {
      res.json(output)
      console.log(`Sent data.`);
    })
    .catch((err) => {
      console.log(err)  
    })
  }
}
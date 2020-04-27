const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = {
  postOrder: (req, res) => {
    console.log('Received the order JSON: ', req.body)
    document = new Order(req.body);
    document.save((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Document is saved as following: ", doc)
      }

    })

  },

};
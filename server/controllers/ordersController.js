const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = {
  postOrder: (req, res) => {
    console.log('Received the order JSON: ', req)
    // document = new Order(JSON)
    // document.save((err, doc) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log("Document is saved as following: ", doc)
    // })

  },

};
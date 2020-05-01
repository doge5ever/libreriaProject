const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const User = mongoose.model('User');
const saltRounds = 10;

module.exports = {
  registerUser: (req, res) => {
    console.log("I will be registering the user.")
    bcrypt.hash(req.body.password, saltRounds)
      .then((output) => {
        document = new User({
          emailAddress: req.body.emailAddress,
          hash: output
        })
        document.save((err, doc) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Document is saved as following: ", doc)
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, 
  authenticateUser: (req, res) => {
    User
      .findOne({emailAddress: req.body.emailAddress})
      .then((document) => {
        bcrypt.compare(req.body.password, document.hash)
          .then((bool) => {
            console.log('Here is the result for the comparison test:', bool);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }
};
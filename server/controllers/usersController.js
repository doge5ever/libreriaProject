const mongoose = require('mongoose'),
  passport = require('passport')
  bcrypt = require('bcrypt');

const User = mongoose.model('User');
const saltRounds = 10;

module.exports = {
  registerUser: (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
      .then((output) => {
        document = new User({
          emailAddress: req.body.emailAddress,
          hash: output
        })
        document.save((err, doc) => {
          if (err) {
            res.json({
              status: false,
              message: err,
              data: 'ERROR'
            })
            console.log(err);
          } else {
            res.json({
              status: true,
              message: 'User registered.',
              data: 'OK'
            })
            console.log("Document is saved as following: ", doc)
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, 

  authenticateUser: (req, res) => {
    return passport.authenticate('local', {
      failureRedirect: '/api/login-failure',
      successRedirect: '/api/login-success'
    }), (err, req, res, next) => {
      if (err) {next(err)};
    }},
};
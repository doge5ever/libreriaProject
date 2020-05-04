const mongoose = require('mongoose'),
  passport = require('passport'),
  bcrypt = require('bcrypt');

const User = mongoose.model('User');
const saltRounds = 10;

module.exports = {
  registerUser: (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
      .then((output) => {
        document = new User(Object.assign({}, req.body, {hash: output}));
        document.save((err, doc) => {
          if (err) {
            res.json({
              status: false,
              err: err
            })
            console.log(err);
          } else {
            res.json({
              status: true,
              message: 'User registered.',
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
    passport.authenticate('local', {
      session: true, 
      successRedirect: 'api/login-success',
      failureRedirect: 'api/login-failure'
    }, (obj) => {
      res.status(200).json(obj);
    })(req, res);
  },
};
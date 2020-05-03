const mongoose = require('mongoose'),
  passport = require('passport');

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
    passport.authenticate('local', {
      session: true, 
      successRedirect: 'api/login-success',
      failureRedirect: 'api/login-failure'
    }, (err, user, info) => {
      res.status(200).json({ err: err, info: info });
    })(req, res);
  },
};
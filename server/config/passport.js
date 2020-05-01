const  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  bcrypt = require('bcrypt');

const MongoStore = require('connect-mongo')(session);
const User = mongoose.model('User');

var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app) {
  passport.use(new LocalStrategy({
  usernameField: 'emailAddress',
  passwordField: 'password'
},
(emailAddress, password, done) => {
  User
    .findOne({emailAddress: emailAddress})
    .then((user) => {
      if (!user) {return done(null, null, 'INVALID')}
      bcrypt.compare(password, user.hash)
        .then((isValid) => {
          if (isValid) {return done(null, user.emailAddress, 'VALID')}
          return done(null, user, 'INVALID');
        })
        .catch((err) => {
          console.log(err);
          return done(err, null, 'ERROR');
        })
    })
    .catch((err) => {
      console.log(err);
      return done(err, null, 'ERROR');
    })
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, res) => {
    if (err) {return cb(err);}
    cb(null, user);
  });
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());
}
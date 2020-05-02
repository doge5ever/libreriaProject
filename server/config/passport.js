const  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  bcrypt = require('bcrypt'),
  cookieParser = require('cookie-parser');

const MongoStore = require('connect-mongo')(session);
const User = mongoose.model('User');

var LocalStrategy = require('passport-local').Strategy;

sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = function (app) {
  app.use(cookieParser('secret'));
  
  passport.use(new LocalStrategy({
    usernameField: 'emailAddress'
  },
  function(emailAddress, password, done) {
    User.findOne({emailAddress: emailAddress})
      .then((user) => {
        if (!user) {return done(null, null, 'INVALID');}
        bcrypt.compare(password, user.hash)
          .then((isValid) => {
            if (isValid) {
              console.log('User is validated.')
              return done(null, user, 'VALID');
              }
            return done(null, user, 'INVALID');
          })
          .catch((err) => {
            console.log('ERROR: ', err);
            return done(err, null, 'INVALID');
          })
      })
      .catch((err) => {
        console.log('ERROR: ', err);
        return done(err, null, 'INVALID');
      })
    }
  ));

  passport.serializeUser((user, done) => {
    console.log(user._id);
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      console.log(user)
      if (err) {return done(user)}
      return done(null, user);
    });
  });

  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
    }
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
}
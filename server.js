const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  session = require('express-session'),
  cors = require('cors');

var LocalStrategy = require('passport-local').Strategy;

const MongoStore = require('connect-mongo')(session);
const app = express();

require('dotenv').config();

require('./server/config/mongoose')();

const User = mongoose.model('User');

// For DEVELOPMENT PURPOSE. Delete when being deployed.
app.use(cors());

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/bookstoreProject' ));

passport.use(new LocalStrategy({
  usernameField: 'emailAddress',
  passwordField: 'password'
},
(emailAddress, password, cb) => {
  User
    .findOne({emailAddress: emailAddress})
    .then((user) => {
      if (!user) {return cb(null, false)}
      bcrypt.compare(password, user.hash)
        .then((isValid) => {
          console.log('Here is the result for the comparison test: ', isValid);
          if (isValid) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        })
        .catch((err) => {
          cb(err);
          console.log(err);
        })
    })
    .catch((err) => {
      cb(err);
      console.log(err);
    })
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
  console.log('I am in the serializer')
});

passport.deserializeUser((id, cb) => {
  console.log('I am in the deserializer')
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

require('./server/config/routes')(app);

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
})
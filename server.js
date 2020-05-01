
const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  session = require('express-session'),
  cors = require('cors');

const MongoStore = require('connect-mongo')(session);
const app = express();

require('dotenv').config();

require('./server/config/mongoose')();

// For DEVELOPMENT PURPOSE. Delete when being deployed.
app.use(cors());

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/bookstoreProject' ));
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
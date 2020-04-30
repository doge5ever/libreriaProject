
const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors');

const app = express();

require('dotenv').config();

// For DEVELOPMENT PURPOSE. Delete when being deployed.
app.use(cors());

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/bookstoreProject' ));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: Session,
  cookie: {
    maxAge: 1000 * 60 * 60
  }

}));


require('./server/config/mongoose')();
require('./server/config/routes')(app);

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
})
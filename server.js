const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors');

const app = express();


// For DEVELOPMENT PURPOSE. Delete when being deployed.
app.use(cors());

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/bookstoreProject' ));
app.use(session({
  secret: process.env.asecret,
  resave: false
}));


require('./server/config/mongoose')();
require('./server/config/routes')(app);

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
})
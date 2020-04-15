const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist/bookstoreProject' ));

require('./server/config/mongoose')();
require('./server/config/routes')(app);

app.listen(8000, function() {
    console.log('listening on port 8000');
})
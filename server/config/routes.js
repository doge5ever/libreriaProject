const booksController = require('../controllers/booksController'),
  databaseSeedController = require('../controllers/databaseSeedController')

const path = require('path');

module.exports = function(app) {

    // BOOK ROUTES
  app.get('/api/books', (req, res) => {
    booksController.getBooks(req, res);
    })

  app.get('/api/seed-database', (req, res) => {
    databaseSeedController.seedDatabase(req, res);
    })  
    // revise?
    // app.all("*", (req, res, next) => {
    //     console.log(__dirname + "../../../public/dist/public/index.html")
    //     res.sendFile(path.resolve(__dirname + "../../../public/dist/public/index.html"))
    // });
};
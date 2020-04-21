const booksController = require('../controllers/booksController'),
  databaseSeedController = require('../controllers/databaseSeedController')
const path = require('path');

module.exports = function(app) {
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // BOOK ROUTES
  app.get('/api/single-book/:product_id', (req, res) => {
    booksController.getSingleBook(req, res);
  });
  
  app.get('/api/books', (req, res) => {
    booksController.getBooks(req, res);
  });
      
  app.get('/api/paginate-books', (req, res) => {
    booksController.paginateBooks(req, res);
  });
  
  app.get('/api/seed-database', (req, res) => {
    databaseSeedController.seedDatabase(req, res);
  });


    // revise?
    // app.all("*", (req, res, next) => {
    //     console.log(__dirname + "../../../public/dist/public/index.html")
    //     res.sendFile(path.resolve(__dirname + "../../../public/dist/public/index.html"))
    // });
};
const booksController = require('../controllers/booksController'),
  databaseSeedController = require('../controllers/databaseSeedController'),
  ordersController = require('../controllers/ordersController')

const path = require('path'),
  cors = require('cors');

module.exports = function(app) {
  // For DEVELOPMENT PURPOSE. Delete when being deployed.
  app.use(cors());

  // BOOK ROUTES
  app.get('/api/single-book/:product_id', (req, res) => {
    booksController.getSingleBook(req, res);
  });
  
  app.get('/api/books', (req, res) => {
    booksController.getBooks(req, res);
  });
  
  app.get('/api/tags', (req, res) => {
    booksController.getTags(req, res);
  });

  app.get('/api/paginate-books', (req, res) => {
    booksController.paginateBooks(req, res);
  });
  
  app.post('/api/order', (req, res) => {
    ordersController.postOrder(req, res);
  })

  app.get('/api/seed-database', (req, res) => {
    databaseSeedController.seedDatabase(req, res);
  });

  app.post('/login',
    passport.authenticate('local'), (req, res) => {
      res.redirect('/users/' + req.user.username);
  });

  // revise?
  // app.all("*", (req, res, next) => {
  //     console.log(__dirname + "../../../public/dist/public/index.html")
  //     res.sendFile(path.resolve(__dirname + "../../../public/dist/public/index.html"))
  // });
};
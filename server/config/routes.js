const booksController = require('../controllers/booksController'),
  databaseSeedController = require('../controllers/databaseSeedController'),
  ordersController = require('../controllers/ordersController'),
  usersController = require('../controllers/usersController'),
  path = require('path');

const passport = require('passport');

module.exports = function(app) {

  // BOOK ROUTES
  app.get('/api/single-book/:product_id', isLoggedIn, (req, res) => {
    booksController.getSingleBook(req, res);
    console.log(req.isAuthenticated())
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

  app.post('/api/register-user', (req, res) => {
    usersController.registerUser(req, res);
  });
  
  app.post('/api/login-user', (req, res) => {
    usersController.authenticateUser(req, res);
  });

  app.all("*", (req, res, next) => {
    console.log(__dirname + "../../../public/dist/bookstoreProject/index.html")
    res.sendFile(path.resolve(__dirname + "../../../public/dist/bookstoreProject/index.html"))
  }); 
};

const isLoggedIn = (req, res, next) => {
  console.log("This is the req.user: ", JSON.stringify(req.session))
  console.log("This is ze cookies: ", JSON.stringify(req.cookies))
  
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

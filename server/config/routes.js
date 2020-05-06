const booksController = require('../controllers/booksController'),
  databaseSeedController = require('../controllers/databaseSeedController'),
  ordersController = require('../controllers/ordersController'),
  usersController = require('../controllers/usersController'),
  path = require('path');

const passport = require('passport');

module.exports = function(app) {

  // BOOK ROUTES
  app.get('/api/single-book/:product_id', (req, res) => {
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

  app.get('/api/login-success', (req, res) => {
    console.log('Login success.')
  })

  app.get('/api/login-failure', (req, res) => {
    console.log('Login failed.')
  })

  // app.all("*", (req, res, next) => {
  //   console.log(__dirname + "../../../public/dist/libreriaProject/index.html")
  //   res.sendFile(path.resolve(__dirname + "../../../public/dist/libreriaProject/index.html"))
  // }); 
};

const isLoggedIn = (req, res, next) => {  
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "Not authenticated"})
}

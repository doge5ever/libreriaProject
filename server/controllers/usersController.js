const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  registerUser: (req, res) => {
    console.log("I will be registering the user.")
  }, 
  authenticateUser: (req, res) => {
    console.log("I will be aunthenticating the user.")
  }
};
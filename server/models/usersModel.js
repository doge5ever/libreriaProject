const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var userSchema = new mongoose.Schema({
      username: { type: String, required: [true, 'Username is required.']},
      password: { type: String, required: [true, 'Password is required.']},
    },
    {
      timestamps: true 
    });

    userSchema.plugin(mongoosePaginate);
    mongoose.model('Order', userSchema);
}
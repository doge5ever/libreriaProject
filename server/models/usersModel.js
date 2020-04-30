const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var userSchema = new mongoose.Schema({
      username: { type: String, required: [true, 'Username is required.']},
      hash: { type: String, required: [true, 'Hash is required.']},
      salt: { type: String, required: [true, 'Salt is required.']}
    },
    {
      timestamps: true 
    });

    userSchema.plugin(mongoosePaginate);
    mongoose.model('User', userSchema);
}
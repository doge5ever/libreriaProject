const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var userSchema = new mongoose.Schema({
      emailAddress: { type: String, required: [true, 'Email is required.']},
      hash: { type: String, required: [true, 'Hash is required.']},
    },
    {
      timestamps: true 
    });

    userSchema.plugin(mongoosePaginate);
    mongoose.model('User', userSchema);
}
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var userSchema = new mongoose.Schema({
      firstName: { type: String, required: [true, 'First Name is required.'] },
      lastName: { type: String, required: [true, 'Last Name is required.'] },
      emailAddress: { type: String, required: [true, 'Email is required.'], unique: true },
      hash: { type: String, required: [true, 'Hash is required.'] },
    },
    {
      timestamps: true 
    });

    userSchema.plugin(mongoosePaginate);
    mongoose.model('User', userSchema);
}
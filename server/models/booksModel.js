const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var bookSchema = new mongoose.Schema({
        title: { type: String, required: [true, 'Name cannot be blank'] },
        tag: { type: String },
        rating: { type: Number, min: [1, 'Rating must be between 1 - 5'], max: [5, 'Rating must be between 1 - 5'] },
        product_desc: { type: String, required: [true, 'Product Description cannot be blank'], minlength: [3, "Review must contain at least 3 characters"] },
        UPC: { type: String },
        price_USD: { type: Number, required: [true, 'Price cannot be blank'] },
        availability: { type: Number },
        product_id: { type: Number, unique: true, required: [true, 'Product ID cannot blank'] }
    }, 
    {
        timestamps: true 
    });
    bookSchema.plugin(mongoosePaginate);
    mongoose.model('Book', bookSchema);
}
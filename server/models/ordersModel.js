const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var orderSchema = new mongoose.Schema({
        contactDetails: {
            firstName: { type: String, required: [true, 'First Name is required'] },
            lastName: { type: String, required: [true, 'Last Name is required.'] },
            emailAddress: { type: String, required: [true, 'Email Address is required.'] },
            phoneNumber: { type: String },
        }

        // title: { type: String, required: [true, 'Name cannot be blank'] },
        // tag: { type: String },
        // rating: { type: Number, min: [1, 'Rating must be between 1 - 5'], max: [5, 'Rating must be between 1 - 5'] },
        // product_desc: { type: String, required: [true, 'Product Description cannot be blank'], minlength: [3, "Review must contain at least 3 characters"] },
        // UPC: { type: String },
        // price_USD: { type: Number, required: [true, 'Price cannot be blank'] },
        // availability: { type: Number },
        // product_id: { type: Number, unique: true, required: [true, 'Product ID cannot blank'] }
    }
    
        // this.checkoutForm = {
    //   contactDetails: {
    //     firstName: undefined,
    //     lastName: undefined,
    //     emailAddress: undefined,
    //     phoneNumber: undefined
    //   }, 
    //   shippingAddress: {
    //     streetAddress: undefined,
    //     city: undefined,
    //     state: undefined,
    //     zipCode: undefined,
    //     country: undefined
    //     },
    //   paymentMethod: {
    //     nameOnCard: undefined,
    //     creditCardNumber: undefined,
    //     expMonth: undefined,
    //     expYear: undefined,
    //     CVV: undefined,
    //     billingAddress: {
    //       isSameAddress: undefined,
    //       streetAddress: undefined,
    //       city: undefined,
    //       state: undefined,
    //       zipCode: undefined,
    //       country: undefined
    //     },  
    //   },
    // }
    , 
    {
        timestamps: true 
    });
    orderSchema.plugin(mongoosePaginate);
    mongoose.model('Order', orderSchema);
}
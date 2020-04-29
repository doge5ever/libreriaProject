const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

module.exports = function() {
    var orderSchema = new mongoose.Schema({
      contactDetails: {
        firstName: { type: String, required: [true, 'First Name is required.'] },
        lastName: { type: String, required: [true, 'Last Name is required.'] },
        emailAddress: { type: String, required: [true, 'Email Address is required.'] },
        phoneNumber: { type: String },
      },
      shippingAddress: {
        streetAddress: { type: String, required: [true, 'Street Address is required.'] },
        city: { type: String, required: [true, 'City is required.']},
        state: { type: String, required: [true, 'State is required.']},
        zipCode: { type: String, required: [true, 'Zip Code is required.']},
      },
      paymentMethod: {
        nameOnCard: { type: String, required: [true, 'Name on Card is required.'] },
        creditCardNumber: { type: Number, required: [true, 'Credit Card Number is required.'] },
        expMonth: { type: String, required: [true, 'Exp. Month is required.'] },
        expYear: { type: String, required: [true, 'Exp. Year is required.'] },
        CVV: { type: String, required: [true, 'CVV is required.'] },
        billingAddress: {
          streetAddress: { type: String, required: [ true, 'Street Address is required.'] },
          city: { type: String, required: [true, 'City is required.']},
          state: { type: String, required: [true, 'State is required.']},
          zipCode: { type: String, required: [true, 'Zip Code is required.']},
        }
      }
    },
    {
      timestamps: true 
    });

    orderSchema.plugin(mongoosePaginate);
    mongoose.model('Order', orderSchema);
}
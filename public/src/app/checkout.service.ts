import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkout: {
    contactDetails: {
      firstName: String,
      lastName: String,
      emailAddress: String,
      phoneNumber: Number
    }, 
  shippingAddress: {
    streetAddress: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String
    },
  paymentMethod: {
    nameOnCard: String,
    creditCardNumber: Number,
    ExpMonth: Number,
    ExpYear: Number,
    CVV: Number
    },
  billingAddress: {
    isSameAddress: Boolean,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String
    },
  }

  constructor() { }

  updateForm = (form) => {
    
  }
}

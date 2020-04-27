import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutForm: Object;

  constructor() {
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
    this.checkoutForm = {
      contactDetails: {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'johndoe@gmail.com',
        phoneNumber: '12341234'
      }, 
      shippingAddress: {
        streetAddress: '123 Fake St.',
        city: 'See-Tee',
        state: 'OR',
        zipCode: '12345',
        country: 'United States of America'
        },
      paymentMethod: {
        nameOnCard: 'John Doe',
        creditCardNumber: '1234123412341234',
        expMonth: '01',
        expYear: '20',
        CVV: '123',
        billingAddress: {
          isSameAddress: true,
          streetAddress: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          country: undefined
        },  
      },
    }
  }

  updateForm = (form: Object):void => {
    Object.keys(form).forEach((key) => {
      this.checkoutForm[key] = form[key];
    })
    console.log("Updated the checkout form: ", this.checkoutForm)
  }

  getForm = () => {
    return this.checkoutForm;
  }
}

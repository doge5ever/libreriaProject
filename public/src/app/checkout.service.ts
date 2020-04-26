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
        firstName: 'Dominic',
        lastName: 'Awa',
        emailAddress: 'domdomawa@gmail.com',
        phoneNumber: '4088763099'
      }, 
      shippingAddress: {
        streetAddress: '5454 Rudy Dr.',
        city: 'San Jose',
        state: 'CA',
        zipCode: '95124',
        country: 'United States of America'
        },
      paymentMethod: {
        nameOnCard: 'Dominic Awa',
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
    console.log("this is the form submitted", form)
    Object.keys(form).forEach((key) => {
      this.checkoutForm[key] = form[key];
      console.log(this.checkoutForm)
    })
    console.log("Updated the checkout form: ", this.checkoutForm)
  }

  getForm = () => {
    return this.checkoutForm;
  }
}

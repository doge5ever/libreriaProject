import { Injectable } from '@angular/core';

interface checkoutInterface {
  contactDetails: {
      firstName: string,
      lastName: string,
      emailAddress: string,
      phoneNumber?: number
    }, 
  shippingAddress: {
    streetAddress: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
    },
  paymentMethod: {
    nameOnCard: string,
    creditCardNumber: number,
    expMonth: number,
    expYear: number,
    CVV: number,
    billingAddress: {
      isSameAddress: boolean,
      streetAddress: string,
      city: string,
      state: string,
      zipCode: number,
      country: string
    },  
  },
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutForm: checkoutInterface;

  constructor() {
    this.checkoutForm = {
      contactDetails: {
        firstName: undefined,
        lastName: undefined,
        emailAddress: undefined,
        phoneNumber: undefined
      }, 
      shippingAddress: {
        streetAddress: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined,
        country: undefined
        },
      paymentMethod: {
        nameOnCard: undefined,
        creditCardNumber: undefined,
        expMonth: undefined,
        expYear: undefined,
        CVV: undefined,
        billingAddress: {
          isSameAddress: undefined,
          streetAddress: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
          country: undefined
        },  
      },

    }
  }

  updateForm = (form: checkoutInterface):void => {
    console.log("this is the form submitted", form)
    Object.keys(form).forEach((key) => {
      this.checkoutForm[key] = form[key];
      console.log(this.checkoutForm)
    })
    console.log("Updated the checkout form: ", this.checkoutForm)
  }

  getForm = ():checkoutInterface => {
    return this.checkoutForm;
  }
}

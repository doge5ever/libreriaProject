import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

interface CheckoutInterface {
  contactDetails: {
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string
  }, 
  shippingAddress: {
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
    },
  paymentMethod: {
    nameOnCard: string,
    creditCardNumber: string,
    expMonth: string,
    expYear: string,
    CVV: string,
    billingAddress: {
      isSameAddress: boolean,
      streetAddress: string,
      city: string,
      state: string,
      zipCode: string,
      country: string
    },  
  },
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutForm: CheckoutInterface;

  constructor(
    private http: HttpService
  ) {
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

  postForm = (): void => {
    this.http.postOrder(this.processCheckoutForm()).subscribe((res) => {
      console.log(res);
    });
    console.log('Sent the form to the server: ', this.checkoutForm)
  }

  processCheckoutForm = (): CheckoutInterface => {
    let form = Object.assign({}, this.checkoutForm);
    if (form.paymentMethod.billingAddress.isSameAddress) {
      form.paymentMethod.billingAddress.streetAddress = form.shippingAddress.streetAddress;
      form.paymentMethod.billingAddress.city = form.shippingAddress.city;
      form.paymentMethod.billingAddress.state = form.shippingAddress.state;
      form.paymentMethod.billingAddress.zipCode = form.shippingAddress.zipCode;
      form.paymentMethod.billingAddress.country = form.shippingAddress.country;
    return form;
    }
  }
}

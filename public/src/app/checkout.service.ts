import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

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
  formIsValid: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpService,
  ) {
      this.checkoutForm = {
        contactDetails: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: ''
        }, 
        shippingAddress: {
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
          },
        paymentMethod: {
          nameOnCard: '',
          creditCardNumber: '',
          expMonth: '',
          expYear: '',
          CVV: '',
          billingAddress: {
            isSameAddress: false,
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },  
        },
      }

      this.formIsValid = new BehaviorSubject(false);
    }

  postForm = (): void => {
    this.http.postOrder(this.processCheckoutForm()).subscribe((res) => {
      console.log(res);
    });
    console.log('Sent the form to the server: ', this.checkoutForm)
  }

  updateForm = (form) => {
    Object.keys(form).forEach((key) => {
     this.checkoutForm[key] = form[key];
    })

    this.formIsValid.next(true);
    return null;
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

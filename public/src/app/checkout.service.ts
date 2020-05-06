import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

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
  canCheckout: BehaviorSubject<boolean>;
  formIsValid: BehaviorSubject<boolean>;
  isGuest: boolean;
  guestSubscribe: boolean;

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private cart: CartService
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

      this.isGuest = false
      this.formIsValid = new BehaviorSubject(false);
      // MODIFY 1
      this.canCheckout = new BehaviorSubject(auth.isLoggedIn || this.isGuest);
    }

  updateForm = (form) => {
    Object.keys(form).forEach((key) => {
     this.checkoutForm[key] = form[key];
    })

    this.formIsValid.next(true);
    return null;
  }

  postForm = (): void => {
    this.sanitizeCheckoutForm();
    let orderForm = Object.assign({}, this.checkoutForm, {items: this.cart.itemsId.value});

    this.http.postOrder(orderForm).subscribe((res) => {
      console.log('Sent the form to the server: ', this.checkoutForm)
      console.log(res);
    });

  }

  sanitizeCheckoutForm = (): void => {
    if (this.checkoutForm.paymentMethod.billingAddress.isSameAddress) {
      this.checkoutForm.paymentMethod.billingAddress.streetAddress = this.checkoutForm.shippingAddress.streetAddress;
      this.checkoutForm.paymentMethod.billingAddress.city = this.checkoutForm.shippingAddress.city;
      this.checkoutForm.paymentMethod.billingAddress.state = this.checkoutForm.shippingAddress.state;
      this.checkoutForm.paymentMethod.billingAddress.zipCode = this.checkoutForm.shippingAddress.zipCode;
      this.checkoutForm.paymentMethod.billingAddress.country = this.checkoutForm.shippingAddress.country;
    }
    delete this.checkoutForm.paymentMethod.billingAddress.isSameAddress;

    this.checkoutForm.paymentMethod.creditCardNumber = this.checkoutForm.paymentMethod.creditCardNumber.replace(/\D/g, '')
  }
}

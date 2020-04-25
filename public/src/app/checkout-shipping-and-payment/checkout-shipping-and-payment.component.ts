import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = fb.group({
      contactDetails: fb.group({
        firstName: null,
        lastName: null,
        emailAddress: null,
        phoneNumber: null
      }), 
      shippingAddress: fb.group({
        streetAddress: null,
        city: null,
        state: null,
        zipCode: null,
        country: null
        }),
      paymentMethod: fb.group({
        nameOnCard: null,
        creditCardNumber: null,
        expMonth: null,
        expYear: null,
        CVV: null,
        billingAddress: fb.group({
          isSameAddress: null,
          streetAddress: null,
          city: null,
          state: null,
          zipCode: null,
          country: null
        }),  
      }),
    })
  };

  ngOnInit(): void {
  }

  submitForm = (form): void => {
    // this.checkoutService.updateForm(form.value);
    console.log(this.checkoutForm.value);
  }
}

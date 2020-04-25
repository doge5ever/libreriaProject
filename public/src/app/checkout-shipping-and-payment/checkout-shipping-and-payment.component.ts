import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  checkoutForm: Object;

  constructor(
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = {
      contactDetails: {
        firstName: ''
      },
      shippingAddress: {},
      paymentMethod: {
        billingAddress: {}
      }
    }
  };

  ngOnInit(): void {
  }

  submitForm = (form): void => {
    this.checkoutService.updateForm(form.value);
  }
}

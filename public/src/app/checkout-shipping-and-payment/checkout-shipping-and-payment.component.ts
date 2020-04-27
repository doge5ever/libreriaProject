import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  checkoutForm;
  checkoutFormControl;
  errorMessageObsObj;
  getFormControl;

  constructor(
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = this.checkoutService.checkoutForm;
    this.checkoutFormControl = this.checkoutService.checkoutFormControl;
    this.errorMessageObsObj = this.checkoutService.errorMessageObsObj;
    this.getFormControl = this.checkoutService.getFormControl;
  };
  
  ngOnInit(): void {
  }

  submitForm = (): void => {
    this.checkoutService.updateForm(this.checkoutFormControl.value)
    console.log(this.checkoutFormControl)
  }
}

import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutformComponent implements OnInit {
  logInDisabled: boolean;
  shippingAndPaymentDisabled: boolean;
  placeOrderDisabled: boolean;

  constructor(
    private checkoutService: CheckoutService,
  ) { 
    this.logInDisabled = true;
    this.shippingAndPaymentDisabled = false;

    checkoutService.formIsValid.subscribe((isValid) => {
      this.placeOrderDisabled = !isValid;
    })
  }
  
  ngOnInit(): void {
  }
}

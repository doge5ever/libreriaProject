import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { AuthService } from '../auth.service';

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
    private auth: AuthService
  ) { 
    this.logInDisabled = auth.isLoggedIn;
    this.shippingAndPaymentDisabled = false;

    checkoutService.formIsValid.subscribe((isValid) => {
      this.placeOrderDisabled = !isValid;
    })

    checkoutService.canCheckout.subscribe((bool) => {
      this.logInDisabled = bool;
      this.shippingAndPaymentDisabled = !bool;
    })
  }
  
  ngOnInit(): void {
  }
}

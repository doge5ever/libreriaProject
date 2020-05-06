import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout-nav',
  templateUrl: './checkout-nav.component.html',
  styleUrls: ['./checkout-nav.component.scss']
})
export class CheckoutNavComponent implements OnInit {
  logInDisabled: boolean;
  shippingAndPaymentDisabled: boolean;
  placeOrderDisabled: boolean;

  constructor(
    private checkoutService: CheckoutService,
    private auth: AuthService
  ) { 
  }
  
  ngOnInit(): void {
    this.logInDisabled = this.auth.isLoggedIn;
    this.shippingAndPaymentDisabled = false;

    this.checkoutService.formIsValid.subscribe((isValid) => {
      this.placeOrderDisabled = !isValid;
    })

    this.checkoutService.canCheckout.subscribe((bool) => {
      this.logInDisabled = bool;
      this.shippingAndPaymentDisabled = !bool;
    })
  }
}

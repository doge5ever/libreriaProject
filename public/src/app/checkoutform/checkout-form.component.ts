import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutformComponent implements OnInit {
  signInDisabled: boolean;
  shippingAndPaymentDisabled: boolean;
  placeOrderDisabled: boolean;

  constructor() { 
    this.signInDisabled = true;
    this.shippingAndPaymentDisabled = false;
    this.placeOrderDisabled = true;
  }

  
  ngOnInit(): void {
  }
}

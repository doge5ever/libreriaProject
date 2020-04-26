import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './checkout-place-order.component.html',
  styleUrls: ['./checkout-place-order.component.scss']
})
export class CheckoutPlaceOrderComponent implements OnInit {
  checkoutForm

  constructor(
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = checkoutService.checkoutForm
  }

  ngOnInit(): void {
  }

}

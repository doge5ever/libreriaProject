import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './checkout-place-order.component.html',
  styleUrls: ['./checkout-place-order.component.scss']
})
export class CheckoutPlaceOrderComponent implements OnInit {
  checkoutForm;
  disabledButton;
  
  constructor(
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = checkoutService.checkoutForm
    this.checkoutService.formIsValid.subscribe((isValid) => {
      this.disabledButton = !isValid;
    })
  }

  ngOnInit(): void {
  }

  submitForm = () => {
    this.checkoutService.postForm();
  }
}

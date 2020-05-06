import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './checkout-place-order.component.html',
  styleUrls: ['./checkout-place-order.component.scss']
})
export class CheckoutPlaceOrderComponent implements OnInit {
  disabledButton: boolean;
  
  constructor(
    public checkoutService: CheckoutService,
    public cartService: CartService,
    private router: Router
  ) {
    if (!checkoutService.formIsValid) {
      router.navigate(['/checkout', 'shipping-and-payment'])
    }

    checkoutService.formIsValid.subscribe((isValid) => {
      this.disabledButton = !isValid;
    })
  }

  ngOnInit(): void {
  }

  submitForm = () => {
    this.checkoutService.postForm();
  }
}

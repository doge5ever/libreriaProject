import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        emailAddress: [null, Validators.required],
        phoneNumber:null
      }), 
      shippingAddress: fb.group({
        streetAddress: [null, Validators.required],
        city:[null, Validators.required],
        state:[null, Validators.required],
        zipCode:[null, Validators.required],
        country:[null, Validators.required]
        }),
      paymentMethod: fb.group({
        nameOnCard:[null, Validators.required],
        creditCardNumber:[null, Validators.required],
        expMonth:[null, Validators.required],
        expYear:[null, Validators.required],
        CVV:[null, Validators.required],
        billingAddress: fb.group({
          isSameAddress:[null, Validators.required],
          streetAddress:[null, Validators.required],
          city:[null, Validators.required],
          state:[null, Validators.required],
          zipCode:[null, Validators.required],
          country:[null, Validators.required]
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

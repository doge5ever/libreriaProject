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
  maxLength: number = 100;
  namePattern: RegExp = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/;
  zipPattern: RegExp = /^(\d{5}(?:\-\d{4})?)$/;

  constructor(
    private checkoutService: CheckoutService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = fb.group({
      contactDetails: fb.group({
        firstName: [null, [
          Validators.required,
          Validators.min(3),
          Validators.max(this.maxLength),
          Validators.pattern(this.namePattern)
        ]],
        lastName: [null, [
          Validators.required,
          Validators.min(3),
          Validators.max(this.maxLength),
          Validators.pattern(this.namePattern)
        ]],
        emailAddress: [null, [
          Validators.required,
          Validators.email
        ]],
        phoneNumber:null
      }), 
      shippingAddress: fb.group({
        streetAddress: [null, [
          Validators.required,
          Validators.min(5),
          Validators.max(this.maxLength)
        ]],
        city:[null, [
          Validators.required,
          Validators.min(3),
          Validators.max(this.maxLength)
        ]],
        state:[null, Validators.required],
        zipCode:[null, [
          Validators.required,
          Validators.pattern(this.zipPattern)
        ]],
        country:[null, Validators.required]
        }),
      paymentMethod: fb.group({
        nameOnCard:[null, Validators.required],
        creditCardNumber:[null, [
          Validators.required,
          Validators.pattern(/\d{16}/)
        ]],
        expMonth:[null, Validators.required],
        expYear:[null, Validators.required],
        CVV:[null, [
          Validators.required,
          Validators.pattern(/\d{3,4}/)
        ]],
        billingAddress: fb.group({
          streetAddress: [null, [
            Validators.required,
            Validators.min(5),
            Validators.max(this.maxLength)
          ]],
          city:[null, [
            Validators.required,
            Validators.min(3),
            Validators.max(this.maxLength)
          ]],
          state:[null, Validators.required],
          zipCode:[null, [
            Validators.required,
            Validators.pattern(this.zipPattern)
          ]],
          country:[null, Validators.required]
        }),  
      }),
    })
  };

  ngOnInit(): void {
  }

  getFormControl = (str1: string, str2: string, str3?: string): FormGroup => {
    if (str3) {
      return this.checkoutForm.get(str1).get(str2).get(str3) as FormGroup;
    } else {
      return this.checkoutForm.get(str1).get(str2) as FormGroup;
    }
  }

  submitForm = (form): void => {
    console.log(this.getFormControl('contactDetails', 'firstName'));
    console.log(this.checkoutForm.value);
  }
}

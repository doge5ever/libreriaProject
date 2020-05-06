import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { errorMessageObservers } from '../errorMessageObservers';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  maxLength: number = 100;
  namePattern: RegExp = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
  zipPattern: RegExp = /^(\d{5}(?:\-\d{4})?)$/;
  phoneMask: Array<string | RegExp> = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  zipCodeMask: Array<string | RegExp> = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  creditCardNumberMask: Array<string | RegExp> = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/];
  CVVMask: Array<string | RegExp> = [/\d/, /\d/, /\d/, /\d/];


  formControlDirectory: Array<Array<string>> = [
    ['contactDetails', 'firstName'],
    ['contactDetails', 'lastName'],
    ['contactDetails', 'emailAddress'],
    ['contactDetails', 'phoneNumber'],
    ['shippingAddress', 'streetAddress'],
    ['shippingAddress', 'city'],
    ['shippingAddress', 'state'], 
    ['shippingAddress', 'zipCode'],
    ['paymentMethod', 'nameOnCard'],
    ['paymentMethod', 'creditCardNumber'],
    ['paymentMethod', 'expMonth'],
    ['paymentMethod', 'expYear'],
    ['paymentMethod', 'CVV'],
    ['paymentMethod', 'billingAddress', 'isSameAddress'],
    ['paymentMethod', 'billingAddress', 'streetAddress'],
    ['paymentMethod', 'billingAddress', 'city'],
    ['paymentMethod', 'billingAddress', 'state'],
    ['paymentMethod', 'billingAddress', 'zipCode'],
  ]
  
  checkoutFormControl: FormGroup;
  errorMessageObsObj: Object;


  constructor(
    private checkoutService: CheckoutService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public cartService: CartService
  ) {
    if (!checkoutService.canCheckout.value) {
      router.navigate(['/checkout', 'login'])
    }
  };
  
  ngOnInit(): void {
    this.initializeCheckoutFormControl();
    this.getErrorMessageObservers();
    this.disableBillingAddressWhenSame();
  }

  initializeCheckoutFormControl = () => {
    this.checkoutFormControl = this.fb.group({
      contactDetails: this.fb.group({
        firstName: [{
          value: this.checkoutService.checkoutForm.contactDetails.firstName,
          disabled: this.auth.isLoggedIn
        }, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern),
          ],
        }],
        lastName: [{
          value: this.checkoutService.checkoutForm.contactDetails.lastName,
          disabled: this.auth.isLoggedIn
        }, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern)
          ]
        }],
        emailAddress: [{
          value: this.checkoutService.checkoutForm.contactDetails.emailAddress,
          disabled: this.auth.isLoggedIn || this.checkoutService.isGuest
        }, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.email
          ]
        }],
        phoneNumber: this.checkoutService.checkoutForm.contactDetails.phoneNumber
      }), 
      shippingAddress: this.fb.group({
        streetAddress: [this.checkoutService.checkoutForm.shippingAddress.streetAddress, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(this.maxLength)
          ]
        }],
        city:[this.checkoutService.checkoutForm.shippingAddress.city, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength)
          ]
        }],
        state:[this.checkoutService.checkoutForm.shippingAddress.state, Validators.required],
        zipCode:[this.checkoutService.checkoutForm.shippingAddress.zipCode, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(this.zipPattern)
          ]
        }],
      }),
      paymentMethod: this.fb.group({
        nameOnCard:[this.checkoutService.checkoutForm.paymentMethod.nameOnCard, {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }],
        creditCardNumber:[this.checkoutService.checkoutForm.paymentMethod.creditCardNumber, {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ]
        }],
        expMonth:[this.checkoutService.checkoutForm.paymentMethod.expMonth, Validators.required],
        expYear:[this.checkoutService.checkoutForm.paymentMethod.expYear, Validators.required],
        CVV:[this.checkoutService.checkoutForm.paymentMethod.CVV, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3)
          ]
        }],
        billingAddress: this.fb.group({
          isSameAddress: this.checkoutService.checkoutForm.paymentMethod.billingAddress.isSameAddress,
          streetAddress: [{disabled: false, value: null}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(this.maxLength),
            ]
          }],
          city:[{disabled: false, value: this.checkoutService.checkoutForm.paymentMethod.billingAddress.city}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(this.maxLength),
            ]
          }],
          state:[{disabled: false, value: this.checkoutService.checkoutForm.paymentMethod.billingAddress.state}, [
            Validators.required,
            ]],
          zipCode:[{disabled: false, value: this.checkoutService.checkoutForm.paymentMethod.billingAddress.zipCode}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.pattern(this.zipPattern),
            ]
          }],
        }),  
      }),
    })
  }

  getErrorMessageObservers = () => {
    let obsObj = {};
    this.formControlDirectory.forEach((directoryArray) => {
      // @ts-ignore
      obsObj[directoryArray.join(" ")] = errorMessageObservers(this.getFormControl(...directoryArray))
    })
    this.errorMessageObsObj = obsObj;
  }

  disableBillingAddressWhenSame = () => {
    this.getFormControl('paymentMethod', 'billingAddress', 'isSameAddress').valueChanges
    .subscribe((checked) => {
      this.formControlDirectory
        .filter((array) => ((array[1] === 'billingAddress') && !(array[2] === 'isSameAddress')))
        .forEach((array) => {
          if (checked) {
            // @ts-ignore
            this.getFormControl(...array).disable();
          } else {
            // @ts-ignore
            this.getFormControl(...array).enable();
          }
        })
    })
  }

  getFormControl = (str1: string, str2: string, str3?: string): FormGroup => {
    if (str3) {
      return this.checkoutFormControl.get(str1).get(str2).get(str3) as FormGroup;
    } else {
      return this.checkoutFormControl.get(str1).get(str2) as FormGroup;
    }
  }

  onSubmit = () => {
    this.checkoutService.updateForm(this.checkoutFormControl.getRawValue());
    this.router.navigate(['/checkout','place-order'])
  }
}

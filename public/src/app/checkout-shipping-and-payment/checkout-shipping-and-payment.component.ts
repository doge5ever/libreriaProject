import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  // formIsValid: BehaviorSubject<boolean>;
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
  ) {
    this.initializeCheckoutFormControl();

    // this.getFormControl('paymentMethod', 'creditCardNumber').valueChanges.subscribe((value) => {
    //   console.log('emitted!')
    //   let numString = value?.replace(/[_ ]/g, '')
    //   if (numString.length > 0 && numString.length < 16) {
    //     this.creditCardNumberMask =[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, /\d/];
    //   } else {
    //     this.creditCardNumberMask =[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/];
    //   }
    // })

    let obsObj = {};
    this.formControlDirectory.forEach((directoryArray) => {
      // @ts-ignore
      obsObj[directoryArray.join(" ")] = this.errorMessageObs(this.getFormControl(...directoryArray))
    })
    this.errorMessageObsObj = obsObj;

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
  };
  
  ngOnInit(): void {
  }

  initializeCheckoutFormControl = () => {
    this.checkoutFormControl = this.fb.group({
      contactDetails: this.fb.group({
        firstName: [this.checkoutService.checkoutForm.contactDetails.firstName, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern),
          ],
        }],
        lastName: [this.checkoutService.checkoutForm.contactDetails.lastName, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern)
          ]
        }],
        emailAddress: [this.checkoutService.checkoutForm.contactDetails.emailAddress, {
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

  onSubmit = () => {
    this.checkoutService.updateForm(this.checkoutFormControl.value);
    this.router.navigate(['/checkout','place-order'])
  }

  getFormControl = (str1: string, str2: string, str3?: string): FormGroup => {
    if (str3) {
      return this.checkoutFormControl.get(str1).get(str2).get(str3) as FormGroup;
    } else {
      return this.checkoutFormControl.get(str1).get(str2) as FormGroup;
    }
  }

  errorPriority: Array<string> = [
    'required',
    'requiredTrue',
    'minlength',
    'maxlength',
    'min',
    'max',
    'pattern',
    'email'
  ];

  locateFieldName: Object = {
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    streetAddress: 'Street Address',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    nameOnCard: 'Name On Card',
    creditCardNumber: 'Credit Card Number',
    expMonth: 'Exp. Month',
    expYear: 'Exp. Year',
    CVV: 'CVV',
  }

  errorMessageObs = (formControl: FormGroup) => {
    let displayError: string;
    let fieldName = this.locateFieldName[this.getControlName(formControl)]
    
    return Observable.create((subscriber) => {
      formControl.valueChanges.subscribe((value) => {
        if (formControl.errors) {
          for (let i=0; i<this.errorPriority.length; i++) {
            let errorsOfForm = Object.keys(formControl.errors);
            if (errorsOfForm.includes(this.errorPriority[i])) {
              displayError = this.errorPriority[i];
              break;
            }
          }
        } else {
          displayError = 'noError';
        }
        switch (displayError) {
          case 'required':
            subscriber.next(`${fieldName} is required.`);
            break;
          case 'requiredTrue':
            subscriber.next(`${fieldName} is required.`);
            break;
          case 'pattern':
            subscriber.next(`${fieldName} provided is invalid.`);
            break;
          case 'email':
            subscriber.next(`Email address provided is invalid.`);
            break;
          case 'minlength':
            subscriber.next(`${fieldName} must have at least ${formControl.errors.minlength.requiredLength} characters.`);
            break;
          case 'maxlength':
            subscriber.next(`${fieldName} must have at most ${formControl.errors.maxlength.requiredLength} characters.`);
            break;
          case 'min':
            subscriber.next(`${fieldName} must be at least n.`);
            break;
          case 'max':
            subscriber.next( `${fieldName} must be at most n.`);
            break;
          default:
            subscriber.next('');
            break;
          }  
      })
    })
  }
  
  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}

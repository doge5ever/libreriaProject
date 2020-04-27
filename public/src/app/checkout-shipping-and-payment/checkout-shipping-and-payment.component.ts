import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'checkout-app-shipping-and-payment',
  templateUrl: './checkout-shipping-and-payment.component.html',
  styleUrls: ['./checkout-shipping-and-payment.component.scss']
})
export class CheckoutShippingAndPaymentComponent implements OnInit {
  checkoutForm: FormGroup;
  maxLength: number = 100;
  namePattern: RegExp = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;
  zipPattern: RegExp = /^(\d{5}(?:\-\d{4})?)$/;

  formControlDirectory: Array<Array<string>> = [
    ['contactDetails', 'firstName'],
    ['contactDetails', 'lastName'],
    ['contactDetails', 'emailAddress'],
    ['contactDetails', 'phoneNumber'],
    ['shippingAddress', 'streetAddress'],
    ['shippingAddress', 'city'],
    ['shippingAddress', 'state'],
    ['shippingAddress', 'zipCode'],
    ['shippingAddress', 'country'],
    ['paymentMethod', 'nameOnCard'],
    ['paymentMethod', 'creditCardNumber'],
    ['paymentMethod', 'expMonth'],
    ['paymentMethod', 'expYear'],
    ['paymentMethod', 'billingAddress', 'sameAddressCheckbox'],
    ['paymentMethod', 'billingAddress', 'streetAddress'],
    ['paymentMethod', 'billingAddress', 'city'],
    ['paymentMethod', 'billingAddress', 'state'],
    ['paymentMethod', 'billingAddress', 'zipCode'],
    ['paymentMethod', 'billingAddress', 'country'],
  ]
  errorMessageObsObj: Object;

  constructor(
    private checkoutService: CheckoutService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = fb.group({
      contactDetails: fb.group({
        firstName: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern),
          ],
        }],
        lastName: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern)
          ]
        }],
        emailAddress: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.email
          ]
        }],
        phoneNumber:null
      }), 
      shippingAddress: fb.group({
        streetAddress: [null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(this.maxLength)
          ]
        }],
        city:[null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength)
          ]
        }],
        state:[null, Validators.required],
        zipCode:[null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(this.zipPattern)
          ]
        }],
        country:[null, Validators.required]
        }),
      paymentMethod: fb.group({
        nameOnCard:[null, {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }],
        creditCardNumber:[null, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(/^\d{16}$/)
          ]
        }],
        expMonth:[null, Validators.required],
        expYear:[null, Validators.required],
        CVV:[null, [
          Validators.required,
          Validators.pattern(/^\d{3,4}$/)
        ]],
        billingAddress: fb.group({
          sameAddressCheckbox: false,
          streetAddress: [{disabled: false, value: null}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(this.maxLength),
            ]
          }],
          city:[{disabled: false, value: null}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(this.maxLength),
            ]
          }],
          state:[{disabled: false, value: null}, [
            Validators.required,
            ]],
          zipCode:[{disabled: false, value: null}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.pattern(this.zipPattern),
            ]
          }],
          country:[{disabled: false, value: null}, [
            Validators.required,
          ]]
        }),  
      }),
    })

    this.getFormControl('paymentMethod', 'billingAddress', 'sameAddressCheckbox').valueChanges
      .subscribe(checked => {
        if (checked) {
          this.formControlDirectory
            .filter((array) => ((array[1] === 'billingAddress') && !(array[2] === 'sameAddressCheckbox')))
            .forEach((array) => {
              // @ts-ignore
              this.getFormControl(...array).disable;
            })
        }
        else {
          this.formControlDirectory
            .filter((array) => ((array[1] === 'billingAddress') && !(array[2] === 'sameAddressCheckbox')))
            .forEach((array) => {
              // @ts-ignore
              this.getFormControl(...array).enable;
          })
        }
    });

    let obsObj = {};
    this.formControlDirectory.forEach((directoryArray) => {
      // @ts-ignore
      obsObj[directoryArray.join(" ")] = this.errorMessageObs(this.getFormControl(...directoryArray))
    })
    this.errorMessageObsObj = obsObj;
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
    country: 'Country',
    nameOnCard: 'Name On Card',
    creditCardNumber: 'Credit Card Number',
    expMonth: 'Exp. Month',
    expYear: 'Exp. Year',
  }

  errorMessageObs = (formControl: FormGroup) => {
    let displayError: string;
    let fieldName = this.locateFieldName[this.getControlName(formControl)]
    
    return Observable.create((subscriber) => {
      formControl.valueChanges.subscribe(() => {
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

  submitForm = (): void => {
    this.checkoutService.updateForm(this.checkoutForm.value)
    console.log(this.getFormControl('paymentMethod', 'billingAddress', 'sameAddressCheckbox'))
  }
  
  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}

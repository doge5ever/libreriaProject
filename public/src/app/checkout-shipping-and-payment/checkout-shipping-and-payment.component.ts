import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
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
  error;


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
          this.getFormControl('paymentMethod', 'billingAddress', 'streetAddress').disable()
          this.getFormControl('paymentMethod', 'billingAddress', 'city').disable()
          this.getFormControl('paymentMethod', 'billingAddress', 'state').disable()
          this.getFormControl('paymentMethod', 'billingAddress', 'zipCode').disable()
          this.getFormControl('paymentMethod', 'billingAddress', 'country').disable()
        }
        else {
          this.getFormControl('paymentMethod', 'billingAddress', 'streetAddress').enable()
          this.getFormControl('paymentMethod', 'billingAddress', 'city').enable()
          this.getFormControl('paymentMethod', 'billingAddress', 'state').enable()
          this.getFormControl('paymentMethod', 'billingAddress', 'zipCode').enable()
          this.getFormControl('paymentMethod', 'billingAddress', 'country').enable()
        }
    });
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

  errorMessage = (formControl: FormGroup, fieldName: string) => {
    let displayError: string;
    let errorPriority: Array<string> = [
      'required',
      'requiredTrue',
      'minlength',
      'maxlength',
      'min',
      'max',
      'pattern',
      'email'
    ];
    return Observable.create((subscriber) => {
      formControl.valueChanges.subscribe(() => {
        console.log("emitted a value!")
        if (formControl.errors) {
          for (let i=0; i<errorPriority.length; i++) {
            let errorsOfForm = Object.keys(formControl.errors);
            if (errorsOfForm.includes(errorPriority[i])) {
              displayError = errorPriority[i];
              break;
            }
          }
        } else {
          displayError = 'noError';
        }
        switch (displayError) {
          case 'required':
            console.log("Must display an error.")
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

  isEmpty = (obj: Object): boolean => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object)
  }

  submitForm = (): void => {
    this.checkoutService.updateForm(this.checkoutForm.value)

  }
}

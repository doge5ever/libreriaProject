import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';

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

  // showError = (strArray: Array<string>, errorType:string): boolean => { 
  //   if (strArray.length === 2) {
  //     var formControl = this.getFormControl(strArray[0], strArray[1])
  //   } else if (strArray.length === 3) {
  //     var formControl = this.getFormControl(strArray[0], strArray[1], strArray[2])
  //   } else {
  //     let formControl = null
  //     throw('Array must have length of either 2 or 3.')
  //   }
  //   if (formControl.errors && formControl.errors[errorType]) {
  //     return (formControl.errors[errorType] && (formControl.dirty && formControl.touched))
  //   }
  //   return false;
  // }
  isEmpty = (obj: Object): boolean => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object)
  }

  submitForm = (): void => {
    this.checkoutService.updateForm(this.checkoutForm.value)
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

interface CheckoutInterface {
  contactDetails: {
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string
  }, 
  shippingAddress: {
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
    },
  paymentMethod: {
    nameOnCard: string,
    creditCardNumber: string,
    expMonth: string,
    expYear: string,
    CVV: string,
    billingAddress: {
      isSameAddress: boolean,
      streetAddress: string,
      city: string,
      state: string,
      zipCode: string,
      country: string
    },  
  },
  isValid: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutForm: CheckoutInterface;
  checkoutFormControl: FormGroup;
  errorMessageObsObj: Object;

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
    ['paymentMethod', 'CVV'],
    ['paymentMethod', 'billingAddress', 'isSameAddress'],
    ['paymentMethod', 'billingAddress', 'streetAddress'],
    ['paymentMethod', 'billingAddress', 'city'],
    ['paymentMethod', 'billingAddress', 'state'],
    ['paymentMethod', 'billingAddress', 'zipCode'],
    ['paymentMethod', 'billingAddress', 'country'],
  ]
  
  constructor(
    private http: HttpService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = {
      contactDetails: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: ''
      }, 
      shippingAddress: {
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
        },
      paymentMethod: {
        nameOnCard: '',
        creditCardNumber: '',
        expMonth: '',
        expYear: '',
        CVV: '',
        billingAddress: {
          isSameAddress: false,
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },  
      },
      isValid: false
    }

    this.checkoutFormControl = fb.group({
      contactDetails: fb.group({
        firstName: [this.checkoutForm.contactDetails.firstName, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern),
          ],
        }],
        lastName: [this.checkoutForm.contactDetails.lastName, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength),
            Validators.pattern(this.namePattern)
          ]
        }],
        emailAddress: [this.checkoutForm.contactDetails.emailAddress, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.email
          ]
        }],
        phoneNumber: this.checkoutForm.contactDetails.phoneNumber
      }), 
      shippingAddress: fb.group({
        streetAddress: [this.checkoutForm.shippingAddress.streetAddress, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(this.maxLength)
          ]
        }],
        city:[this.checkoutForm.shippingAddress.city, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(this.maxLength)
          ]
        }],
        state:[this.checkoutForm.shippingAddress.state, Validators.required],
        zipCode:[this.checkoutForm.shippingAddress.zipCode, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(this.zipPattern)
          ]
        }],
        country:[this.checkoutForm.shippingAddress.country, Validators.required]
        }),
      paymentMethod: fb.group({
        nameOnCard:[this.checkoutForm.paymentMethod.nameOnCard, {
          updateOn: 'blur',
          validators: [
            Validators.required
          ]
        }],
        creditCardNumber:[this.checkoutForm.paymentMethod.creditCardNumber, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(/^\d{16}$/)
          ]
        }],
        expMonth:[this.checkoutForm.paymentMethod.expMonth, Validators.required],
        expYear:[this.checkoutForm.paymentMethod.expYear, Validators.required],
        CVV:[this.checkoutForm.paymentMethod.CVV, {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.pattern(/^\d{3,4}$/)
          ]
        }],
        billingAddress: fb.group({
          isSameAddress: this.checkoutForm.paymentMethod.billingAddress.isSameAddress,
          streetAddress: [{disabled: false, value: null}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(this.maxLength),
            ]
          }],
          city:[{disabled: false, value: this.checkoutForm.paymentMethod.billingAddress.city}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(this.maxLength),
            ]
          }],
          state:[{disabled: false, value: this.checkoutForm.paymentMethod.billingAddress.state}, [
            Validators.required,
            ]],
          zipCode:[{disabled: false, value: this.checkoutForm.paymentMethod.billingAddress.zipCode}, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.pattern(this.zipPattern),
            ]
          }],
          country:[{disabled: false, value: this.checkoutForm.paymentMethod.billingAddress.country}, [
            Validators.required,
          ]]
        }),  
      }),
    })

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
  }

  updateForm = (form: Object):void => {
    Object.keys(form).forEach((key) => {
      this.checkoutForm[key] = form[key];
    })
    this.checkoutForm.isValid = this.checkoutFormControl.valid
    console.log("Updated the checkout form: ", this.checkoutForm)
  }

  getForm = () => {
    return this.checkoutForm;
  }

  postForm = (): void => {
    this.http.postOrder(this.processCheckoutForm()).subscribe((res) => {
      console.log(res);
    });
    console.log('Sent the form to the server: ', this.checkoutForm)
  }

  processCheckoutForm = (): CheckoutInterface => {
    let form = Object.assign({}, this.checkoutForm);
    if (form.paymentMethod.billingAddress.isSameAddress) {
      form.paymentMethod.billingAddress.streetAddress = form.shippingAddress.streetAddress;
      form.paymentMethod.billingAddress.city = form.shippingAddress.city;
      form.paymentMethod.billingAddress.state = form.shippingAddress.state;
      form.paymentMethod.billingAddress.zipCode = form.shippingAddress.zipCode;
      form.paymentMethod.billingAddress.country = form.shippingAddress.country;
    return form;
    }
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
    country: 'Country',
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

  submitForm = (): void => {
    this.updateForm(this.checkoutFormControl.value)
  }
  
  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

}

import { AbstractControl, FormGroup } from "@angular/forms";
import { Observable } from 'rxjs';

export { errorMessageObservers };

const errorPriority: Array<string> = [
  'required',
  'requiredTrue',
  'minlength',
  'maxlength',
  'min',
  'max',
  'pattern',
  'email'
];

const locateFieldName: Object = {
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
};

const errorMessageObservers = (formControl: FormGroup) => {
  let displayError: string;
  let fieldName = locateFieldName[getControlName(formControl)]
  
  return Observable.create((subscriber) => {
    formControl.valueChanges.subscribe((value) => {
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
};

const getControlName = (c: AbstractControl): string | null => {
  const formGroup = c.parent.controls;
  return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
};
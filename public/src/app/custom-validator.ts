import { Validators } from '@angular/forms';

export class CustomValidators {
  static isHidden(value: boolean) {
    if (value === true) {
      return Validators.nullValidator;
    } else if (value === false) {
      return Validators.required;
    } else {
      return Validators.nullValidator;
    }
  }
}
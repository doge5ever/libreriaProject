import { Validators } from '@angular/forms';

export class CustomValidators {
  static delay(value: number) {
    setTimeout(() => {
      return Validators.nullValidator;
    }, value);
  }
}
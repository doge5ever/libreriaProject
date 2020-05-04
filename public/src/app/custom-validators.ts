import { FormGroup } from '@angular/forms';

export class CustomValidators {
  static matchValues = (str1: string, str2: string) => {
    return (g: FormGroup) => { 
      return g.get(str1).value === g.get(str2).value ? null : {isSame: {valid: false}};
    }
  }
}
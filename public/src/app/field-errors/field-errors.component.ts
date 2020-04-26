import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss']
})
export class FieldErrorsComponent implements OnInit {
  @Input() fieldName: string;
  @Input() formControl: FormGroup;

  displayError: string;
  errorMessage: string;

  constructor() { }
  ngOnInit(): void {
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

    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.errors) {
        for (let i=0; i<errorPriority.length; i++) {
          let errorsOfForm = Object.keys(this.formControl.errors);
          if (errorsOfForm.includes(errorPriority[i])) {
            this.displayError = errorPriority[i];
            break;
          }
        }
      } else {
        this.displayError = 'noError';
      }
      switch (this.displayError) {
        case 'required':
          this.errorMessage = `${this.fieldName} is required.`
          break;
        case 'requiredTrue':
          this.errorMessage = `${this.fieldName} is required.`
          break;
        case 'pattern':
          this.errorMessage = `${this.fieldName} provided is invalid.`
          break;
        case 'email':
          this.errorMessage = `Email address provided is invalid.`
          break;
        case 'minlength':
          this.errorMessage = `${this.fieldName} must have at least ${this.formControl.errors.minlength.requiredLength} characters.`
          break;  
        case 'maxlength':
          this.errorMessage = `${this.fieldName} must have at most ${this.formControl.errors.maxlength.requiredLength} characters.`
          break;  
        case 'min':
          this.errorMessage = `${this.fieldName} must be at least n.`
          break;  
        case 'max':
          this.errorMessage = `${this.fieldName} must be at most n.`
          break;
        default:
          this.errorMessage = ''
          break;
        }  
    })
  }

}


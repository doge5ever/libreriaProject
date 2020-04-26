import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.css']
})
export class FieldErrorsComponent implements OnInit {
  @Input() fieldName: string;
  @Input() formControl: FormGroup;
  @Input() output: string;

  displayError: string;
  errorMessage: string;

  constructor() { }
  ngOnInit(): void {
    let errorPriority: Array<string> = [
      'required',
      'requiredTrue',
      'pattern',
      'email',
      'minLength',
      'maxLength',
      'min',
      'max'
    ];

    for (let i=0; i<errorPriority.length; i++) {
      let errorsOfForm = Object.keys(this.formControl.errors);
      if (errorsOfForm.includes(errorPriority[i])) {
        this.displayError = errorPriority[i];
        break;
      }
    }

    switch (this.errorMessage) {
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
      case 'minLength':
        this.errorMessage = `${this.fieldName} must have at least n characters.`
        break;  
      case 'maxLength':
        this.errorMessage = `${this.fieldName} must have at most n characters.`
        break;  
      case 'min':
        this.errorMessage = `${this.fieldName} must be at least n.`
        break;  
      case 'max':
        this.errorMessage = `${this.fieldName} must be at most n.`
        break;  
      }


      
  }

}


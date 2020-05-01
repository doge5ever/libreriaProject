import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormControl: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit = () => {
    console.log("Submitted the form:", this.registerFormControl)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormControl: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.loginFormControl = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit = () => {
    console.log("Submitted the form:", this.loginFormControl)
  }
}

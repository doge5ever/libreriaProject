import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-login',
  templateUrl: './checkout-login.component.html',
  styleUrls: ['./checkout-login.component.scss']
})
export class CheckoutLogInComponent implements OnInit {
  loginFormControl: FormGroup;
  guestFormControl: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginFormControl = new FormGroup({
      emailAddress: new FormControl(''),
      password: new FormControl('')
    });

    this.guestFormControl = new FormGroup({
      emailAddress: new FormControl('', Validators.email),
      confirmEmailAddress: new FormControl('')
    });
  }

  loginOnSubmit = () => {

  };

  guestOnSubmit = () => {

  };
}

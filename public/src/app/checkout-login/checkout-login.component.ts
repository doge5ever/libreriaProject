import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-checkout-login',
  templateUrl: './checkout-login.component.html',
  styleUrls: ['./checkout-login.component.scss']
})
export class CheckoutLogInComponent implements OnInit {
  loginFormControl: FormGroup;
  guestFormControl: FormGroup;
  loginErrorHidden: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpService
  ) {
    console.log("Is the user logged in? ", this.auth.isLoggedIn);
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/checkout', 'shipping-and-payment']);
    }
  }

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
    this.http.authenticateUser(this.loginFormControl.value).subscribe((res: {err: string, valid: boolean}) => {
      console.log("Sent form to server.", this.loginFormControl)
      console.log(res);
      this.auth.updateUserInfo(res);
      if (res.valid) {
        this.loginErrorHidden = true;
        this.router.navigate(['/checkout', 'shipping-and-payment']);
      } else {
        this.loginErrorHidden = false;
      }
    });
  };

  guestOnSubmit = () => {

  };

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { CheckoutService } from '../checkout.service';
import { CustomValidators } from '../custom-validators';

interface resInterface {
  user: {
    firstName: string,
    lastName: string,
    emailAddress: string
  },
  valid: boolean,
  err: Object,
}

@Component({
  selector: 'app-checkout-login',
  templateUrl: './checkout-login.component.html',
  styleUrls: ['./checkout-login.component.scss']
})
export class CheckoutLogInComponent implements OnInit {
  loginFormControl: FormGroup;
  guestFormControl: FormGroup;
  errorMsgHidden: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpService,
    private checkoutService: CheckoutService
  ) {
    if (this.checkoutService.canCheckout.value) {
      this.router.navigate(['/checkout', 'shipping-and-payment']);
    }
    this.errorMsgHidden = true;
  }

  ngOnInit(): void {
    this.loginFormControl = new FormGroup({
      emailAddress: new FormControl(''),
      password: new FormControl('')
    });

    this.guestFormControl = new FormGroup({
      emailAddress: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.email, Validators.required]
      }),
      confirmEmailAddress: new FormControl(''),
      subscribe: new FormControl(false)
    }, {
      validators: CustomValidators.matchValues('emailAddress', 'confirmEmailAddress')
    }
    );
  }

  loginOnSubmit = () => {
    this.http.authenticateUser(this.loginFormControl.value).subscribe((res: resInterface) => {
      console.log("Sent form to server.", this.loginFormControl)
      console.log(res);
      if (res.valid) {
        this.auth.updateUserInfo(res);
        this.checkoutService.checkoutForm.contactDetails.firstName = res.user.firstName;
        this.checkoutService.checkoutForm.contactDetails.lastName = res.user.lastName;
        this.checkoutService.checkoutForm.contactDetails.emailAddress = res.user.emailAddress;
        this.errorMsgHidden = true;
        // MODIFY 1
        this.checkoutService.canCheckout.next(true);
        this.router.navigate(['/checkout', 'shipping-and-payment']);
      } else {
        this.errorMsgHidden = false;
      }
    });
  };

  guestOnSubmit = () => {
    this.checkoutService.isGuest = true;
    this.checkoutService.checkoutForm.contactDetails.emailAddress = this.guestFormControl.value.emailAddress;
    this.checkoutService.guestSubscribe = this.guestFormControl.value.subscribe;
    // MODIFY 1
    this.checkoutService.canCheckout.next(true);
    this.router.navigate(['/checkout', 'shipping-and-payment']);
  };

}

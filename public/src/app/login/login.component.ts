import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormControl: FormGroup;
  errorMsgHidden: boolean;

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) {
    this.errorMsgHidden = true;
  }

  ngOnInit(): void {
    this.loginFormControl = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit = () => {
    this.http.authenticateUser(this.loginFormControl.value).subscribe((res: {err: string, valid: boolean}) => {
      console.log("Sent form to server.", this.loginFormControl)
      console.log(res);
      if (res.valid) {
        this.auth.updateUserInfo(res);
        this.errorMsgHidden = true;
        this.router.navigate(['/']);
      } else {
        this.errorMsgHidden = false;
      }
    });
  };
}

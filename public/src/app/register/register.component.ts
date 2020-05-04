import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormControl: FormGroup;
  registeredErrorHidden: boolean;

  namePattern: RegExp = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*$/;

  constructor(
    private http: HttpService
  ) {
    this.registeredErrorHidden = true
  }

  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.namePattern)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.namePattern)
      ]),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validators: CustomValidators.matchValues('password', 'confirmPassword')
    })
  }

  onSubmit = () => {
    this.http.registerUser(this.registerFormControl.value).subscribe((res: {err: {code: number}}) => {
      console.log('Form submitted to the server: ', this.registerFormControl.value)
      console.log(res);
      if (res.err) {this.registeredErrorHidden = false;}
    });
    console.log("Sent form to server.", this.registerFormControl)
  }
}

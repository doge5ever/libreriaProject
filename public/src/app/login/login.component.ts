import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormControl: FormGroup;
  constructor(
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.loginFormControl = new FormGroup({
      emailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit = () => {
    this.http.authenticateUser(this.loginFormControl.value).subscribe((res) => {
      console.log(res);
    });
    console.log("Sent form to server.", this.loginFormControl)
  }
}

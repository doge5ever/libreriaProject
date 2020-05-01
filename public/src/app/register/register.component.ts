import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormControl: FormGroup;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit = () => {
    this.http.registerUser(this.registerFormControl.value).subscribe((res) => {
      console.log(res);
    });
    console.log("Sent form to server.", this.registerFormControl)
  }
}

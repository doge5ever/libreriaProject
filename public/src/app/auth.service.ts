import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  emailAddress: string;

  constructor(
    private http: HttpService
  ) { 
    this.isLoggedIn = false;
    this.firstName = '';
    this.lastName = '';
    this.emailAddress = '';
  }
  
  updateUserInfo = (res) => {
    console.log(res);
    this.isLoggedIn = true;
    this.firstName = res.user.firstName;
    this.lastName = res.user.lastName;
    this.emailAddress = res.user.emailAddress;
  }  
}
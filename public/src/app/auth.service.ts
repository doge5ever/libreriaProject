import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;
  firstName: string;

  constructor(
    private http: HttpService
  ) { 
    this.isAuthenticated = false;
    this.firstName = '';
  }
  
  updateAuthentication = (res) => {
    if (res.valid) {
      this.isAuthenticated = true;
      this.firstName = res.firstName;
      console.log(res)
      console.log('Value for isAuthenticated: ', this.isAuthenticated);
      console.log('FirstName: ', this.firstName);
    }
  }  
}
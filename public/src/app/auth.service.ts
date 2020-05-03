import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;

  constructor(
    private http: HttpService
  ) { 
    this.isAuthenticated = false;
  }
  
  updateAuthentication = (res) => {
    if (res.valid) {
      this.isAuthenticated = true;
      console.log('Value for isAuthenticated: ', this.isAuthenticated);
    }
  }  
}
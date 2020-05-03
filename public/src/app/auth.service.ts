import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

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

  getUserInfo = (): boolean => {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {return true;}
    return false;
  }
  
  setUserInfo = (user): void => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }


}

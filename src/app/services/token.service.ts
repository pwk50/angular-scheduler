import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token_observer = new BehaviorSubject<boolean>(this.getToken() !== null);

  constructor() { }

  saveToken(token) {
    localStorage.setItem('access_token', token);
    this.token_observer.next(this.getToken() !== null);
  }

  getObserver() {
    return this.token_observer.asObservable();
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
    this.token_observer.next(this.getToken() !== null);
  }

  getDecodedToken() {
    let token = this.getToken();
    let decoded_token = new JwtHelperService().decodeToken(token);
    return decoded_token;
  }

}

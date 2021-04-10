import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  login(user): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/login`, user, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/register`, user, httpOptions);
  }

  getAppointments(userid): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.URL}/users/${userid}/appointments?_expand=user&_expand=room`);
  }

  getUsers(QUERY = '') {
    return this.http.get<User[]>(`${this.URL}/users${QUERY}`);
  }

  getPendingUsers() {
    return this.getUsers('?isApproved=false');
  }

  updateUser(user) {
    return this.http.patch<any>(`${this.URL}/users/${user.id}`, user, httpOptions);
  }

}

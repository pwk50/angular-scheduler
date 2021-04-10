import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appointment } from "../models/Appointment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentURL = 'http://localhost:3000/appointments';
  expandChild = '?_expand=user&_expand=room';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentURL}${this.expandChild}`);
  }

  get(id): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.appointmentURL}/${id}${this.expandChild}`);
  }

  add(Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.appointmentURL}`, Appointment, httpOptions);
  }

  remove(id): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.appointmentURL}/${id}`);
  }

  update(Appointment, id): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.appointmentURL}/${id}`, Appointment, httpOptions);
  }

}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Room } from "../models/Room";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  RoomURL = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.RoomURL}`);
  }

  get(id): Observable<Room> {
    return this.http.get<Room>(`${this.RoomURL}/${id}`);
  }

  add(Room): Observable<Room> {
    return this.http.post<Room>(`${this.RoomURL}`, Room, httpOptions);
  }

  remove(id): Observable<Room> {
    return this.http.delete<Room>(`${this.RoomURL}/${id}`);
  }

  update(Room, id): Observable<Room> {
    return this.http.patch<Room>(`${this.RoomURL}/${id}`, Room, httpOptions);
  }
}
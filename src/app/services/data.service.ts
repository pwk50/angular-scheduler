import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource: BehaviorSubject<Object> = new BehaviorSubject<Object>([]);

  get(): Observable<Object> {
    return this.dataSource.asObservable();
  }

  addData(data) {
    this.dataSource.next(data);
  }
}

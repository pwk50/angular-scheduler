import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Appointment } from '../../models/Appointment';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {
  list: Appointment[];

  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.ds.get().subscribe(data => {
      try {
        let correct_data = data as [];

        this.list = correct_data;
      } catch (err) {
        console.log(err);
      }
    });
  }


}

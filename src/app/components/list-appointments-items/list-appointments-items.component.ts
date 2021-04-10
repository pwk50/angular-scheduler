import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-appointments-items',
  templateUrl: './list-appointments-items.component.html',
  styleUrls: ['./list-appointments-items.component.css']
})
export class ListAppointmentsItemsComponent implements OnInit {
  @Input() appointment;

  constructor() { }

  ngOnInit(): void {
  }

}

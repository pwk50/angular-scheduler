import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DataService } from 'src/app/services/data.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { breadCrumbSeperator } from '../../shared/icons';

@Component({
  selector: 'app-list-appointment-container',
  templateUrl: './list-appointment-container.component.html',
  styleUrls: ['./list-appointment-container.component.css']
})
export class ListAppointmentContainerComponent implements OnInit {
  icon = breadCrumbSeperator;

  constructor(
    private bs: BreadcrumbService,
    private ds: DataService,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private ts: TokenService
  ) { }

  ngOnInit(): void {
    this.bs.set('@All', 'All');

    this.fetchList('All');
  }

  fetchList(filter) {
    if (filter === 'All') {
      this.appointmentService.getAll().subscribe(res => this.ds.addData(res));

    } else {

      let loggedUser = this.ts.getDecodedToken();

      this.userService.getAppointments(loggedUser.id).subscribe(res => {
        let data = Array.isArray(res) ? res : [res];
        this.ds.addData(data);
      });
    }
  }

  onChangeFilter(value) {
    this.fetchList(value);
  }

}

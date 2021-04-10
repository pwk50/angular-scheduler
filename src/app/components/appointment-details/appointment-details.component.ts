import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/Appointment';
import { person } from '../../shared/icons';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit, OnDestroy {
  icon_participant = person;

  appointment: Appointment;
  subscription: Subscription;

  loggedUserId;

  // delete response
  success: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedUserId = this.tokenService.getDecodedToken().id;

    let appointment_id: string = this.activatedRoute.snapshot.params['id'];

    this.subscription = this.appointmentService.get(appointment_id).subscribe(
      res => this.appointment = res,
      err => this.router.navigate(['/dashboard/list'])
    );

    this.breadcrumbService.set('@Details', `Details : id ${appointment_id}`);
  }

  handleDelete(id) {
    this.appointmentService.remove(id).subscribe(x => {
      this.success = true;
      this.appointment = null;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

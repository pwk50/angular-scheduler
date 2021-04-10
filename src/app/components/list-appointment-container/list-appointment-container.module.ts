import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAppointmentContainerRoutingModule } from './list-appointment-container-routing.module';
import { ListAppointmentContainerComponent } from './list-appointment-container.component';

import { BreadcrumbModule } from "xng-breadcrumb";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ListAppointmentContainerComponent
  ],
  imports: [
    CommonModule,
    ListAppointmentContainerRoutingModule,
    BreadcrumbModule,
    FontAwesomeModule,
  ]
})
export class ListAppointmentContainerModule { }

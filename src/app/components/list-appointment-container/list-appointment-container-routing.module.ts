import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { ListAppointmentsComponent } from '../list-appointments/list-appointments.component';
import { ListAppointmentContainerComponent } from './list-appointment-container.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  {
    path: "list",
    component: ListAppointmentContainerComponent,
    data: { breadcrumb: { alias: 'All' } },
    children: [
      {
        path: "",
        component: ListAppointmentsComponent,
      },
      {
        path: "details/:id",
        component: AppointmentDetailsComponent,
        data: { breadcrumb: { alias: 'Details' } },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAppointmentContainerRoutingModule { }

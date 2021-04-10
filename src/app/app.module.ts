import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModule } from "xng-breadcrumb";

import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ListAppointmentsComponent } from './components/list-appointments/list-appointments.component';
import { ListAppointmentsItemsComponent } from './components/list-appointments-items/list-appointments-items.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { AppointmentFormComponent } from './components/forms/appointment-form/appointment-form.component';

import { BreadcrumbService } from 'xng-breadcrumb';

import { GroupPipe } from './pipes/group/group.pipe';
import { SortByDatePipe } from './pipes/sortByDate/sort-by-date.pipe';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { SigninComponent } from './components/forms/signin/signin.component';
import { SignupComponent } from './components/forms/signup/signup.component';

import { AuthGuard } from './auth.guard';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { RoomFormComponent } from './components/forms/room-form/room-form.component';
import { AdminGuard } from './admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    ListAppointmentsComponent,
    ListAppointmentsItemsComponent,
    AppointmentDetailsComponent,
    GroupPipe,
    SortByDatePipe,
    AppointmentFormComponent,
    SigninComponent,
    SignupComponent,
    UserTableComponent,
    RoomTableComponent,
    RoomFormComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    BreadcrumbModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  providers: [
    BreadcrumbService,
    GroupPipe,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

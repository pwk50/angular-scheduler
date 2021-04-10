import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { AppointmentFormComponent } from './components/forms/appointment-form/appointment-form.component';
import { RoomFormComponent } from './components/forms/room-form/room-form.component';
import { SigninComponent } from './components/forms/signin/signin.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redirect to `dashboard`
  {
    path: 'dashboard',
    loadChildren: () => import('./components/list-appointment-container/list-appointment-container.module').then(m => m.ListAppointmentContainerModule),
    data: { breadcrumb: { skip: true } },
    canActivate: [AuthGuard]
  },
  { path: 'appointment/create', component: AppointmentFormComponent, canActivate: [AuthGuard] },
  { path: 'appointment/update/:id', component: AppointmentFormComponent, canActivate: [AuthGuard] },
  { path: 'home/signin', component: SigninComponent },
  { path: 'home/signup', component: SignupComponent },
  { path: 'admin/users', component: UserTableComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/rooms', component: RoomTableComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/rooms/create', component: RoomFormComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'not-found-404', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

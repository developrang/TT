import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeService } from './employees/employees.service';
import { EmployeeFilterPipe } from './employees/employee.filter.pipe';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeesComponent } from './employees/employees.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeItemComponent } from './employees/employee-list/employee-item/employee-item.component';
import { EmployeeStartComponent } from './employees/employee-start/employee-start.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { HomeComponent } from './home/home.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { AttendanceItemComponent } from './attendance/attendance-list/attendance-item/attendance-item.component';
import { AttendanceDetailComponent } from './attendance/attendance-detail/attendance-detail.component';
import { AttendanceEditComponent } from './attendance/attendance-edit/attendance-edit.component';
import { AttendanceStartComponent } from './attendance/attendance-start/attendance-start.component';
import { AttendanceService } from './attendance/attendance.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AttendanceFilterPipe } from './attendance/attendance.filter.pipe';

const appRoutes: Routes = [
{path:'', component:HomeComponent},
{path:'home', component:HomeComponent},
{path:'attendance', component:AttendanceComponent, children: [
  { path: '', component: AttendanceStartComponent },
  { path: 'new', component: AttendanceEditComponent, canActivate: [AuthGuard]},
  { path: ':id', component: AttendanceDetailComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: AttendanceEditComponent, canActivate: [AuthGuard] },
]},
{path:'employees', component:EmployeesComponent, children: [
  { path: '', component: EmployeeStartComponent },
  { path: 'new', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: ':id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: EmployeeEditComponent, canActivate: [AuthGuard] },
]},
{ path: 'signin', component: SigninComponent },
{ path: 'signup', component: SignupComponent },
{ path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFilterPipe,
    HeaderComponent,
    EmployeesComponent,
    AttendanceComponent,
    EmployeeListComponent,
    EmployeeItemComponent,
    EmployeeStartComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    HomeComponent,
    AttendanceListComponent,
    AttendanceItemComponent,
    AttendanceDetailComponent,
    AttendanceEditComponent,
    AttendanceStartComponent,
    SigninComponent,
    SignupComponent,
    AttendanceFilterPipe
       
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, AttendanceService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

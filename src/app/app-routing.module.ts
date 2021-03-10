import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {ForgotPasswordComponent} from './components/authentication/forgot-password/forgot-password.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {HomeComponent} from './components/home/home/home.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot/username', component: ForgotPasswordComponent},
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

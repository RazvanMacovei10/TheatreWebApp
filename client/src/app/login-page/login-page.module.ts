import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterTheatreComponent } from './register-theatre/register-theatre.component';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RegisterTheatreComponent,
    LoginNavbarComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule
  ]
})
export class LoginPageModule { }

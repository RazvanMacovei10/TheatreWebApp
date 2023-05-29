import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterTheatreComponent } from './register-theatre/register-theatre.component';
import { LoginNavbarComponent } from './login-navbar/login-navbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RegisterTheatreComponent,
    LoginNavbarComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class LoginPageModule { }

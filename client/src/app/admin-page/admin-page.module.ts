import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { HomeComponent } from './home/home.component';
import { TheatreRegisterFormsComponent } from './theatre-register-forms/theatre-register-forms.component';


@NgModule({
  declarations: [
    HomeComponent,
    TheatreRegisterFormsComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }

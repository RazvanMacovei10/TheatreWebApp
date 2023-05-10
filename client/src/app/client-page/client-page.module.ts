import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientEventsComponent } from './client-events/client-events.component';
import { ClientNavbarComponent } from './client-navbar/client-navbar.component';
import { HomeComponent } from './home/home.component';
import { ClientTheatresComponent } from './client-theatres/client-theatres.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientEventsComponent,
    ClientNavbarComponent,
    HomeComponent,
    ClientTheatresComponent
  ],
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientPageModule { }

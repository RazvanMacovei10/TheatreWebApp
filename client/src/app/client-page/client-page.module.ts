import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientEventsComponent } from './client-events/client-events.component';
import { ClientNavbarComponent } from './client-navbar/client-navbar.component';
import { HomeComponent } from './home/home.component';
import { ClientTheatresComponent } from './client-theatres/client-theatres.component';

@NgModule({
  declarations: [
    ClientEventsComponent,
    ClientNavbarComponent,
    HomeComponent,
    ClientTheatresComponent
  ],
  imports: [
    CommonModule,
    ClientPageRoutingModule
  ]
})
export class ClientPageModule { }

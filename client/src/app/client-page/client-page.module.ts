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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientEventComponent } from './client-event/client-event.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component'
import {MatInputModule} from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    ClientEventsComponent,
    ClientNavbarComponent,
    HomeComponent,
    ClientTheatresComponent,
    ClientEventComponent,
    ConfirmationDialogComponent,
    ClientReservationsComponent
  ],
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule

  ]
})
export class ClientPageModule { }

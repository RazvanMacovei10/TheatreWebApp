import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheatrePageRoutingModule } from './theatre-page-routing.module';
import { AddPlayComponent } from './add-play/add-play.component';
import { PlaysComponent } from './plays/plays.component';
import { TheatreNavbarComponent } from './theatre-navbar/theatre-navbar.component';
import { HomeComponent } from './home/home.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditPlayComponent } from './add-edit-play/add-edit-play.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservationsComponent } from './reservations/reservations.component';
import { TheatreAccountPageComponent } from './theatre-account-page/theatre-account-page.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    HomeComponent,
    AddPlayComponent,
    PlaysComponent,
    TheatreNavbarComponent,    
    AddEventComponent,
    ScheduleComponent,
    AddEditPlayComponent,
    ReservationsComponent,
    TheatreAccountPageComponent
  ],
  imports: [
    CommonModule,
    TheatrePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule
  ],
})
export class TheatrePageModule { }

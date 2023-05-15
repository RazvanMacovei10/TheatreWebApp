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
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'


@NgModule({
  declarations: [
    HomeComponent,
    AddPlayComponent,
    PlaysComponent,
    TheatreNavbarComponent,    
    AddEventComponent,
    ScheduleComponent,
    AddEditEventComponent
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
  ],
})
export class TheatrePageModule { }

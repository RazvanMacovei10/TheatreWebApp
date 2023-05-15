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


@NgModule({
  declarations: [
    HomeComponent,
    AddPlayComponent,
    PlaysComponent,
    TheatreNavbarComponent,    
    AddEventComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    TheatrePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TheatrePageModule { }

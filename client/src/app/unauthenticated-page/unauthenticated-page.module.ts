import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthenticatedPageRoutingModule } from './unauthenticated-page-routing.module';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    UnauthenticatedPageRoutingModule
  ]
})
export class UnauthenticatedPageModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { PlaysComponent } from './plays/plays.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddPlayComponent } from './add-play/add-play.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent },
  { path: 'play', component: PlaysComponent },
  { path: 'schedule/add', component: AddEventComponent },
  { path: 'play/add', component: AddPlayComponent },
  {path:'reservations',component:ReservationsComponent},
  { path: '', redirectTo: '/theatre/play', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatrePageRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientTheatresComponent } from './client-theatres/client-theatres.component';
import { ClientEventsComponent } from './client-events/client-events.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { ClientAccountDetailsComponent } from './client-account-details/client-account-details.component';

const routes: Routes = [{path:"events",component:ClientEventsComponent},
{path:"theatres",component:ClientTheatresComponent},
{path:"",component:ClientEventsComponent},
{path:"account",component:ClientAccountDetailsComponent},
{path:"reservations",component:ClientReservationsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule { }

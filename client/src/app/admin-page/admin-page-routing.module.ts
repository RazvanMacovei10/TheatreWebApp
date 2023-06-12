import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';

const routes: Routes = [{path:'', component:HomeComponent},
{path:"users",component:AdminUsersPageComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './_models/role';
import { AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-page/admin-page.module').then((m) => m.AdminPageModule),
      canActivate: [AuthGuard],
      data:{roles:[Role.Admin]}
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./client-page/client-page.module').then((m) => m.ClientPageModule),
  //     canActivate: [AuthGuard],
  //     data:{roles:[Role.User]}
  // },
   {
    path: 'theatre',
    loadChildren: () =>
      import('./theatre-page/theatre-page.module').then((m) => m.TheatrePageModule),
      canActivate: [AuthGuard],
      data:{roles:[Role.Theatre]}
  },
  { path: '**', 
  redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

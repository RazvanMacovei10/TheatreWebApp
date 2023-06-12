import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { HomeComponent } from './home/home.component';
import { TheatreRegisterFormsComponent } from './theatre-register-forms/theatre-register-forms.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    HomeComponent,
    TheatreRegisterFormsComponent,
    AdminUsersPageComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule
  ]
})
export class AdminPageModule { }

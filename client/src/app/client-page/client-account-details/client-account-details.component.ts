import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, timer } from 'rxjs';
import { UserDetails } from 'src/app/_models/user-datails';
import { AccountService } from 'src/app/_services/account.service';
import { ClientService } from 'src/app/_services/client.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-client-account-details',
  templateUrl: './client-account-details.component.html',
  styleUrls: ['./client-account-details.component.scss']
})
export class ClientAccountDetailsComponent implements OnInit {

  constructor(private accountService:AccountService,
    private clientService:ClientService,
    private dialog:MatDialog) { }
    
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  username:string|undefined="";
  userDetails: UserDetails = {
    username:"",
    email:"",
    numberOfReservations:0
    
    
  };
  ngOnInit(): void {
    this.username=this.accountService.userValue?.username;
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.clientService.getUserByUsername(this.username).subscribe((data) => {
      console.log(data);
  this.userDetails = data;
  // Perform any operations that depend on the data here
});
    

    const inputElement = document.getElementById('username') as HTMLInputElement;
    inputElement.value=this.userDetails.username;
    console.log(this.userDetails);
    timer(100).subscribe(() => {
      const userElement = document.getElementById('username') as HTMLInputElement;
      const emailElement = document.getElementById('email') as HTMLInputElement;
      const numberOfReservations = document.getElementById('reservations') as HTMLInputElement;
      userElement.value=this.userDetails.username;
      emailElement.value=this.userDetails.email;
      numberOfReservations.value=this.userDetails.numberOfReservations.toString();
    });
    

    }
    getUser(){
     
      console.log(this.userDetails);
      
    
    }
    openChangePasswordDialog(){
      const dialogRef=this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe({
      next:()=>{
      }
    })
    }
}

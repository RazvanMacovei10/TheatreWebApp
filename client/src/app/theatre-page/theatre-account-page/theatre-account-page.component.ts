import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, timer } from 'rxjs';
import { UserDetails } from 'src/app/_models/user-datails';
import { ClientService } from 'src/app/_services/client.service';
import { AccountService } from 'src/app/_services/account.service';
import { ChangePasswordComponent } from 'src/app/client-page/change-password/change-password.component';
import { TheatreDetails } from 'src/app/_models/theatre-details';
import { TheatreService } from 'src/app/_services/theatre.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-theatre-account-page',
  templateUrl: './theatre-account-page.component.html',
  styleUrls: ['./theatre-account-page.component.scss']
})
export class TheatreAccountPageComponent implements OnInit {

  constructor(private accountService:AccountService,
    private dialog:MatDialog,
    private theatreService:TheatreService,
    private sanitizer:DomSanitizer) { }
    
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  username:string|undefined="";
  userDetails: TheatreDetails = {
    username:"",
    email:"",
    numberOfEvents:0,
    numberOfEventsScheduled:0,
    name:"",
    image:""
    
  };
  ngOnInit(): void {
    this.username=this.accountService.userValue?.username;
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.theatreService.getTheatreByUsername(this.username).subscribe((data) => {
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
      const numberOfEvents = document.getElementById('events') as HTMLInputElement;
      const numberOfEventsScheduled = document.getElementById('eventsScheduled') as HTMLInputElement;
      const name = document.getElementById('name') as HTMLInputElement;
      const image = document.getElementById('image') as HTMLImageElement;
      userElement.value=this.userDetails.username;
      emailElement.value=this.userDetails.email;
      numberOfEvents.value=this.userDetails.numberOfEvents.toString();
      numberOfEventsScheduled.value=this.userDetails.numberOfEventsScheduled.toString();
      name.value=this.userDetails.name.toString();
      image.setAttribute('src','data:image/png;base64,'+this.userDetails.image);
      console.log(this.getImageUrl(this.userDetails));
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

    getImageUrl(row: TheatreDetails):SafeUrl {

    const imageDataBytes = new Uint8Array(atob(row.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
  }

}

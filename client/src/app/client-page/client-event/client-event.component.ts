import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { EventModel } from 'src/app/_models/event';
import { Play } from 'src/app/_models/play';
import { AccountService } from 'src/app/_services/account.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-event',
  templateUrl: './client-event.component.html',
  styleUrls: ['./client-event.component.scss']
})
export class ClientEventComponent implements OnInit {

  currentEvent:EventModel={
    id: 1,
    datetime: new Date(),
    availableSeats: 100,
    price: 10,
    theatreName: 'ABC Theatre',
    play: {}as Play
  };
  faCalendar=faCalendarDay;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private accountService: AccountService,private sanitizer:DomSanitizer,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.currentEvent=this.data;
  }

  getDate(dateString: Date): string {
    const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[date.getMonth()];
  return `${day} ${monthName}`;
  }
  
  getTime(dateString: Date): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'});
  }
  getImageUrl(row: Play): SafeUrl {

    const imageDataBytes = new Uint8Array(atob(row.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';
import { EventModel } from 'src/app/_models/event';
import { Theatre } from 'src/app/_models/theatre';
import { AccountService } from 'src/app/_services/account.service';
import { ClientService } from 'src/app/_services/client.service';
import { ClientEventComponent } from '../client-event/client-event.component';
import { Play } from 'src/app/_models/play';

@Component({
  selector: 'app-client-theatres',
  templateUrl: './client-theatres.component.html',
  styleUrls: ['./client-theatres.component.scss']
})
export class ClientTheatresComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  theatreClicked: boolean = false;
  currentEvents:EventModel[]=[]
  theatres: Theatre[] = [];
  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  filterParams:any;
  theatreName:string=""
  faCalendar=faCalendarDay;
  currentEvent:EventModel={
    id: 1,
    datetime: new Date(),
    availableSeats: 100,
    price: 10,
    theatreName: 'ABC Theatre',
    play: {}as Play
  };
  eventClicked=false;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.getEvents();
  }
  logout() {
    this.accountService.logout();
  }

  getEvents() {
    this.clientService.getTheatres().subscribe((data) => {
      this.theatres = data;
    });
  }

  getImageUrl(row: string): SafeUrl {
    const imageDataBytes = new Uint8Array(
      atob(row)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));

    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + base64ImageData
    );
  }

  onCardClick(item: Theatre) {
    this.theatreName=item.name;
    this.theatreClicked = true;
    this.currentEvents = item.events;
  }

  onButtonClick() {
    this.theatreClicked = false;
    this.currentEvents=[];
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getEvents();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEvents();
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
  onCardEventClick(item: EventModel) {
    this.eventClicked = true;
    this.currentEvent=item;
    const dialogConfig: MatDialogConfig = {
      data: item 
    };
    const dialogRef=this.dialog.open(ClientEventComponent,dialogConfig);
  }
}

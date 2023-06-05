import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FilterParams } from 'src/app/_models/filter-params';
import { Play } from 'src/app/_models/play';
import { AccountService } from 'src/app/_services/account.service';
import { ClientService } from 'src/app/_services/client.service';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { EventModel } from 'src/app/_models/event';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ClientEventComponent } from '../client-event/client-event.component';
import { PlayType } from 'src/app/_models/play-type';
import { LabelType, Options } from 'ng5-slider';

@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss']
})
export class ClientEventsComponent implements OnInit {

  @ViewChild('topOfPage') topOfPage!:ElementRef;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(
    private accountService: AccountService, 
    private router: Router,
    private clientService:ClientService,
    private sanitizer:DomSanitizer,
    private fb:FormBuilder,
    private dialog:MatDialog) { }
  events:any;
  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  filterParams:any;
  currentEvent:EventModel={
    id: 1,
    location:'',
    city:'',
    datetime: new Date(),
    availableTickets: 100,
    price: 10,
    theatreName: 'ABC Theatre',
    play: {}as Play
  };
  eventClicked=false;
  filterForm !: FormGroup;
  faCalendar=faCalendarDay;
  currentDate = new Date();

  minValue:number=0;
  maxValue:number=9999;
  minDateTime = this.formatDateTime(this.currentDate);

  city:string="";

  cities$:Observable<string[]>|null=null;
  categories$:Observable<PlayType[]>|null=null;
  

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.getEvents();
    this.cities$=this.clientService.getEventCities();
    this.categories$=this.clientService.getCategories();
    this.filterForm = this.fb.group({
      city: [''],
      category:[''],
      name:[''],
      date:[''],
      priceFrom:0,
      priceTo:9999
    });
  }
  logout() {
    this.accountService.logout();
  }

  getEvents(){    
    this.clientService.getEvents().subscribe((data)=>{this.events=data});

  }

  
  getFilteredEvents(){

    this.page=1;

    
      console.log(this.minValue);
      
        this.clientService.getFilteredEvents(this.minValue,
        this.maxValue,
        this.filterForm.get('city')?.value,
        this.filterForm.get('name')?.value,
        this.filterForm.get('category')?.value.name,
        this.filterForm.get('date')?.value)
      .subscribe((data)=>{this.events=data});
      
    

  }
  
  getImageUrl(row: Play): SafeUrl {

    const imageDataBytes = new Uint8Array(atob(row.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getEvents();
    this.topOfPage.nativeElement.scrollIntoView();
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

  onCardClick(item: EventModel) {
    this.eventClicked = true;
    this.currentEvent=item;
    this.topOfPage.nativeElement.scrollIntoView();
    const dialogConfig: MatDialogConfig = {
      data: item 
    };
    const dialogRef=this.dialog.open(ClientEventComponent,dialogConfig);
  }
  formatDateTime(date: Date): string {
    return (
      date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    );
  }
  options: Options = {
    floor: 0,
    ceil: 1500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> ' + value;
        case LabelType.High:
          return '<b>Max price:</b> ' + value;
        default:
          return 'Rs. ' + value;
      }
    }
  };

}

import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss']
})
export class ClientEventsComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private accountService: AccountService, private router: Router,private clientService:ClientService,private sanitizer:DomSanitizer,private fb:FormBuilder) { }
  events:any;
  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  filterParams:any;
  filterForm !: FormGroup;
  faCalendar=faCalendarDay;

  city:string="";

  cities$:Observable<string[]>|null=null;
  

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.getEvents();
    this.cities$=this.clientService.getCities();
    this.filterForm = this.fb.group({
      city: [''],
      name:[''],
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

    if(this.filterForm.get('city')?.value=="" && this.filterForm.get('name')?.value=="")
    {
      this.clientService.getFilteredEventsByPrice(this.filterForm.get('priceFrom')?.value,this.filterForm.get('priceTo')?.value)
    .subscribe((data)=>{this.events=data});
    }
    else
    if(this.filterForm.get('city')?.value=="" && this.filterForm.get('name')?.value!="")
    {
    this.clientService.getFilteredEventsByName(this.filterForm.get('priceFrom')?.value,this.filterForm.get('priceTo')?.value,this.filterForm.get('name')?.value)
    .subscribe((data)=>{this.events=data});
    }
    else
    if(this.filterForm.get('name')?.value=="" && this.filterForm.get('city')?.value!="")
    {
    this.clientService.getFilteredEventsByCity(this.filterForm.get('priceFrom')?.value,this.filterForm.get('priceTo')?.value,this.filterForm.get('city')?.value)
    .subscribe((data)=>{this.events=data});
    }
    else
    {
    this.clientService.getFilteredEvents(this.filterForm.get('priceFrom')?.value,this.filterForm.get('priceTo')?.value,this.filterForm.get('city')?.value,this.filterForm.get('name')?.value)
    .subscribe((data)=>{this.events=data});
    }

  }
  
  getImageUrl(row: Play): SafeUrl {

    const imageDataBytes = new Uint8Array(atob(row.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
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
}

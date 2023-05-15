import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EventModel } from 'src/app/_models/event';
import { AccountService } from 'src/app/_services/account.service';
import { TheatreService } from 'src/app/_services/theatre.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @ViewChild('topOfPage') topOfPage!:ElementRef;
  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  events: EventModel[] = [];
  constructor(
    private accountService: AccountService,
    private router: Router,
    private theatreService: TheatreService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.loadEvents();
  }

  loadEvents(){
    this.theatreService.getEventsByCurrentUser().subscribe((data) => {
      this.events = data.sort(
        (a, b) =>
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
      );
    });
  }

  logout() {
    this.accountService.logout();
  }

  deleteEvent(id: number) {
    console.log(id);
    this.theatreService.deleteEvent(id.toString()).subscribe(()=>this.loadEvents())
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadEvents();
    this.topOfPage.nativeElement.scrollIntoView();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadEvents();
  }
}
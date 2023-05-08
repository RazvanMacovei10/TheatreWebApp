import { Component, OnInit } from '@angular/core';
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
}
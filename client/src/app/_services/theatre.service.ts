import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Play } from '../_models/play';
import { Observable } from 'rxjs';
import { EventSent } from '../_models/event-sent';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  baseUrl = 'https://localhost:7270/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService
  ) {}
  addPlay(model: any) {
    let name="";
    if (this.accountService.userValue != null) {
      name = this.accountService.userValue.username;
    }
    return this.http.post<Play>(this.baseUrl + 'Play/'+name, model);
  }
  getPlays(): Observable<Play[]> {
    return this.http.get<Play[]>(this.baseUrl + 'Play');
  }
  deletePlay(id:number): Observable<Play[]> {
    return this.http.delete<Play[]>(this.baseUrl + 'Play/'+id);
  }

  addEvent(model: EventSent) {
    if (this.accountService.userValue != null) {
      model.theatreName = this.accountService.userValue.username;
    }
    console.log(model);
    return this.http.post<EventSent>(this.baseUrl + 'Event', model);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event');
  }

  getEventsByCurrentUser(): Observable<Event[]> {
    if (this.accountService.userValue != null)
      return this.http.get<Event[]>(
        this.baseUrl + 'Event/' + this.accountService.userValue.username
      );
    return this.http.get<Event[]>(this.baseUrl + 'Event');
  }

  getPlaysByCurrentUser(): Observable<Play[]> {
    if (this.accountService.userValue != null)
      return this.http.get<Play[]>(
        this.baseUrl + 'Play/' + this.accountService.userValue.username
      );
    return this.http.get<Play[]>(this.baseUrl + 'Play');
  }

  deleteEvent(id: string) {
    return this.http.delete(this.baseUrl + 'Event/' + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Play } from '../_models/play';
import { Observable, map } from 'rxjs';
import { EventSent } from '../_models/event-sent';
import { PlayType } from '../_models/play-type';
import { EventModel } from '../_models/event';
import { Reservation } from '../_models/reservation';
import { TheatreDetails } from '../_models/theatre-details';


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
  updatePlay(model:any){
    let name="";
    if (this.accountService.userValue != null) {
      name = this.accountService.userValue.username;
    }
    return this.http.post<Play>(this.baseUrl + 'Play/edit/'+name, model);
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
  updateEvent(model: EventSent) {
    if (this.accountService.userValue != null) {
      model.theatreName = this.accountService.userValue.username;
    }
    return this.http.post<EventSent>(this.baseUrl + 'Event/edit/', model);
  }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.baseUrl + 'Event');
  }

  getEventsByCurrentUser(): Observable<EventModel[]> {
    if (this.accountService.userValue != null)
      return this.http.get<EventModel[]>(
        this.baseUrl + 'Event/' + this.accountService.userValue.username
      );
    return this.http.get<EventModel[]>(this.baseUrl + 'Event');
  }

  getPlaysByCurrentUser(): Observable<Play[]> {
    if (this.accountService.userValue != null)
      return this.http.get<Play[]>(
        this.baseUrl + 'Play/' + this.accountService.userValue.username
      );
    return this.http.get<Play[]>(this.baseUrl + 'Play');
  }
  getFilteredPlaysByCurrentUser(playName:string): Observable<Play[]> {
    if (this.accountService.userValue != null)
      return this.http.get<Play[]>(
        this.baseUrl + 'Play/' + this.accountService.userValue.username + '/filteredPlays/'+playName
      );
    return this.http.get<Play[]>(this.baseUrl + 'Play');
  }

  getPlayTypes():Observable<PlayType[]>{
    return this.http.get<PlayType[]>(this.baseUrl + 'Playtype');
  }

  deleteEvent(id: string) {
    return this.http.delete(this.baseUrl + 'Event/' + id);
  }
  getAllReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.baseUrl + 'Reservation');
  }
  getAllReservationsByCurrentUser(): Observable<Reservation[]>{
    if (this.accountService.userValue != null)
      return this.http.get<Reservation[]>(
        this.baseUrl + 'Reservation/organizerReservations/' + this.accountService.userValue.username
      );
    return this.http.get<Reservation[]>(this.baseUrl + 'Reservation');
  }
  getTheatreByUsername(username:string|undefined): Observable<TheatreDetails> {
    return this.http.get<TheatreDetails>(this.baseUrl + 'Users/Theatre/'+username);
  }
  getNumberOfAvailableEventsFromAllEvents(events:any[]):number{
    const currentDate = new Date();
    let count = 0;
    for (const event of events) {
      const eventDatetime = new Date(event.datetime);
  
      if (eventDatetime > currentDate && event.active==true) {
        count++;
      }
    }
  
    return count;
  }
  sendEmailForAnnouncingUserThatReservationIsDeleted(row:any) {
    const title = 'Reservation might be canceled';
    const content = 'You are receiving this email because your reservation to "'
    +row.eventName+'" at date'
    +this.formatDateTime(row.eventDateTime)+
    ' might be canceled. For more info contact suport.'
    const email=row.user.email;
  
    const payload = { email, title, content };
    console.log(payload);
  
    this.http.post(this.baseUrl + 'Account/sendEmail/', payload).subscribe(
      () => {
        console.log('Email sent successfully');
      },
      (error) => {
        console.error('Failed to send email', error);
      }
    );
  }
  formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const year = dateTime.getFullYear().toString();
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return `${month}-${day}-${year} ${hours}:${minutes}`;
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Theatre } from '../_models/theatre';
import { AccountService } from './account.service';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'https://localhost:7270/api/';
  constructor(private http:HttpClient,private router:Router,private accountService:AccountService) { }
  
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event');
  }
  getFilteredEvents(priceFrom:number,priceTo:number,city:string,name:string): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event/FilteredEvents/'+priceFrom+'/'+priceTo+'/'+city+'/'+name);
  }
  getFilteredEventsByName(priceFrom:number,priceTo:number,name:string): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event/FilteredEventsByName/'+priceFrom+'/'+priceTo+'/'+name);
  }
  getFilteredEventsByCity(priceFrom:number,priceTo:number,city:string): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event/FilteredEventsByCity/'+priceFrom+'/'+priceTo+'/'+city);
  }
  getFilteredEventsByPrice(priceFrom:number,priceTo:number): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event/FilteredEventsByPrice/'+priceFrom+'/'+priceTo);
  }

  getTheatres(): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.baseUrl + 'Theathre')
  }
  getCities():Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + 'Address');
  }
  addReservation(model: any) {
    let name="";
    console.log(model);
    if (this.accountService.userValue != null) {
      name = this.accountService.userValue.username;
    }
    console.log(name);
    return this.http.post<Reservation>(this.baseUrl + 'Reservation/'+name+'/'+model.event.id,model);
  }
}

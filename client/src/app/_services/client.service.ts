import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Theatre } from '../_models/theatre';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'https://localhost:7270/api/';
  constructor(private http:HttpClient,private router:Router) { }
  
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event');
  }
  getFilteredEvents(city:string,name:string): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl + 'Event/FilteredEvents/'+city+'/'+name);
  }

  getTheatres(): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.baseUrl + 'Theathre')
  }
  getCities():Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + 'Address');
  }
}

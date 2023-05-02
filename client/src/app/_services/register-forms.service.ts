import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../_models/register-form';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormsService {
  baseUrl = 'https://localhost:7270/api/';
  constructor(private http: HttpClient) {}

  getRegisterForms(): Observable<RegisterForm[]> {
    return this.http.get<RegisterForm[]>(this.baseUrl + 'RegisterForm');
  }

  createUser(id: string): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'RegisterForm/' + id, null);
  }

  deleteForm(id: string) {
    return this.http.delete(this.baseUrl + 'RegisterForm/' + id);
  }
}

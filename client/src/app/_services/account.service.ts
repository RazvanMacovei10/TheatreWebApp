import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { RegisterForm } from '../_models/register-form';
import { UserDetails } from '../_models/user-datails';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:7270/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

  public get userValue(){
    return this.currentUserSource.value;
  }

  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response:User) => {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }


  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['/auth']);
  }
  registerTheatre(model:any){
    return this.http.post<RegisterForm>(this.baseUrl+'Account/register-theatre',model);
  }
  changePassword(model:any){
    if (this.userValue != null)
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-password/'+this.userValue.username,model);
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-password/',model);
  }
  changePicture(model:any){
    console.log(model);
    if (this.userValue != null)
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-picture/'+this.userValue.username,model);
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-picture/',model);
  }
  changeName(model:any){
    if (this.userValue != null)
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-name/'+this.userValue.username,model);
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-name/',model);
  }

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.baseUrl + 'Users');
  }
  changeStatus(model:any){
    console.log(model);
    return this.http.post<RegisterForm>(this.baseUrl+'Account/change-status/'+model.userName,null);
  }
  sendEmailForAnnouncingUserAccountHasBeenActivated(email:any) {
    const title = 'Your account was successfully acitvated';
    const content = 'You are receiving this email because your account has been successfully created. You can login now. '

  
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
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  model: any = {};
  loginError:string="";
  constructor(private accountService: AccountService, private router: Router) {
    let role = this.accountService.userValue?.role;
    console.log(role);
    if (accountService.userValue)
      switch (role) {
        case 'ROLE_ADMIN':
          this.router.navigateByUrl('/admin');
          break;
        case 'ROLE_USER':
          this.router.navigateByUrl('/home');
          break;
        case 'ROLE_THEATRE':
          this.router.navigateByUrl('/theatre');
          break;
        default:
          this.router.navigateByUrl('/');
          break;
      }
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        console.log(this.accountService.userValue);
        let role = this.accountService.userValue?.role;
        switch (role) {
          case 'ROLE_ADMIN':
            this.router.navigateByUrl('/admin');
            break;
          case 'ROLE_USER':
            this.router.navigateByUrl('/home');
            break;
          case 'ROLE_THEATRE':
            this.router.navigateByUrl('/theatre');
            break;
          default:
            this.router.navigateByUrl('/');
            break;
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.loginError=error.error;
        } else {
          this.loginError = 'An error occurred. Please try again later.'; 
        }
      },
    });
  }
  logout() {
    this.accountService.logout();
  }
}

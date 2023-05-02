import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterForm } from 'src/app/_models/register-form';
import { AccountService } from 'src/app/_services/account.service';
import { RegisterFormsService } from 'src/app/_services/register-forms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  registerForms: RegisterForm[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private registerFormSerive: RegisterFormsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.registerFormSerive.getRegisterForms().subscribe((x) => {
      this.registerForms = x;
      console.log(x);
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/auth']);
  }

  reloadList(){
    this.registerFormSerive.getRegisterForms().subscribe((x) => {
      this.registerForms = x;
      console.log(x);
    });
  }

}

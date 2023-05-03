import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-theatre-navbar',
  templateUrl: './theatre-navbar.component.html',
  styleUrls: ['./theatre-navbar.component.scss']
})
export class TheatreNavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
  }
  logout() {
    this.accountService.logout();
  }

}
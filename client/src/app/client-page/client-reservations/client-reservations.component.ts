import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { ReservationDisplayed } from 'src/app/_models/reservation-displayed';
import { AccountService } from 'src/app/_services/account.service';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.scss']
})
export class ClientReservationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]=['id','datetime','numberOfTickets','eventName','eventDate'];
  dataSource!:MatTableDataSource<any>;
  reservations: ReservationDisplayed[] = [];
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private accountService:AccountService,
    private clientService:ClientService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.loadReservations();
  }

  loadReservations(){
    this.clientService.getReservationsByCurrentUser().subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1; 
      }

    });
  }
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}

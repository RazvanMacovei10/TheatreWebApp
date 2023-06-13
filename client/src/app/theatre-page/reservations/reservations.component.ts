import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { ReservationDisplayed } from 'src/app/_models/reservation-displayed';
import { AccountService } from 'src/app/_services/account.service';
import { ClientService } from 'src/app/_services/client.service';
import { CoreService } from 'src/app/_services/core.service';
import { TheatreService } from 'src/app/_services/theatre.service';
import { ConfirmationDialogComponent } from 'src/app/client-page/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]=['userEmail','eventName','numberOfTickets','eventDate','datetime','action'];
  dataSource!:MatTableDataSource<any>;
  reservations: ReservationDisplayed[] = [];
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private accountService:AccountService,
    private clientService:ClientService,
    private dialog:MatDialog,
    private coreService:CoreService,
    private theatreService:TheatreService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.loadReservations();
  }

  loadReservations(){
    this.theatreService.getAllReservationsByCurrentUser().subscribe((data) => {
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
  isEventDateFuture(eventDateTime: string): boolean {
    const currentDateTime = new Date(); // Get the current date and time
    const compareDateTime = new Date(eventDateTime); // Convert the event datetime string to a Date object
  
    return compareDateTime > currentDateTime;
  }

  openConfirmation(row:any){

    const dialogRef=this.dialog.open(ConfirmationDialogComponent,{
      disableClose:false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this reservation? ";
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.clientService.deleteReservation(row.id.toString()).subscribe(()=>this.loadReservations())
        this.theatreService.sendEmailForAnnouncingUserThatReservationIsDeleted(row);
    this.coreService.openSnackBar("Event deleted",'done');
      }
    })

  }

}

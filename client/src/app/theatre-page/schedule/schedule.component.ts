import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EventModel } from 'src/app/_models/event';
import { AccountService } from 'src/app/_services/account.service';
import { TheatreService } from 'src/app/_services/theatre.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/_services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { ConfirmationDialogComponent } from 'src/app/client-page/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {


  displayedColumns:string[]=['name','availableSeats','city','location','datetime','price','action'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild('topOfPage') topOfPage!:ElementRef;

  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  events: EventModel[] = [];
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private theatreService: TheatreService,
    private coreService:CoreService,
    private dialog:MatDialog,
  ) 
  {  
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.loadEvents();
  }

  loadEvents(){
    this.theatreService.getEventsByCurrentUser().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1; 
      }

    });
  }

  logout() {
    this.accountService.logout();
  }



  onTableDataChange(event: any) {
    this.page = event;
    this.loadEvents();
    this.topOfPage.nativeElement.scrollIntoView();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadEvents();
  }

  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditEventForm(){
    const dialogRef=this.dialog.open(AddEventComponent);
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.loadEvents();
      }
    })

  }
  openEditEventForm(data:any){
    const dialogRef=this.dialog.open(AddEventComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.loadEvents();
      }
    })
    
  }
  isDateActive(row: any): boolean {
    const currentDate = new Date();
    const rowDate = new Date(row.datetime);
  
    return rowDate > currentDate;
  }

  openConfirmation(id:any){

    const dialogRef=this.dialog.open(ConfirmationDialogComponent,{
      disableClose:false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this scheduled event? ";
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.theatreService.deleteEvent(id).subscribe(() => {
          this.loadEvents();
    this.coreService.openSnackBar("Event scheduled deleted",'done');
        },
        (error)=>{
          if(error.status===400){
            this.coreService.openSnackBar(error.error, 'error');
          }
        });
      }
    })

  }

  deleteEvent(id: number) {
    this.theatreService.deleteEvent(id.toString()).subscribe(()=>this.loadEvents())
    this.coreService.openSnackBar("Event deleted",'done');
  }


  

}
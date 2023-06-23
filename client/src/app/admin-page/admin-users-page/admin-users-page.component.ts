import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { CoreService } from 'src/app/_services/core.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns:string[]=['username','email','active','action'];
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  dataSource!:MatTableDataSource<any>;
  page:number=1;
  count:number=0;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  constructor(private accountService:AccountService,
    private router: Router,
    private coreService:CoreService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    console.log(this.accountService.getUsers());
    this.accountService.getUsersForAdminPage().subscribe((data) => 
      console.log(data));
      this.loadUsers();
  }
  logout() {
    this.accountService.logout();
    this.router.navigate(['/auth']);
  }
  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  
  loadUsers(){
    this.accountService.getUsersForAdminPage().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1; 
      }

    });
  }
  setAsActiveInactive(model:any){
    this.accountService.changeStatus(model).subscribe({
      next:()=>{
        this.coreService.openSnackBar("User status changed successfully",'done');
        this.loadUsers();
      },
      error: (error) => {       
      },
    })

  }
  onTableDataChange(event: any) {
    this.page = event;
    this.loadUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}

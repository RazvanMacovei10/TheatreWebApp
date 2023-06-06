import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Play } from 'src/app/_models/play';
import { AccountService } from 'src/app/_services/account.service';
import { TheatreService } from 'src/app/_services/theatre.service';
import { AddEditPlayComponent } from '../add-edit-play/add-edit-play.component';
import { ChangePictureComponent } from '../change-picture/change-picture.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  @ViewChild('topOfPage') topOfPage!:ElementRef;
  plays: Play[] = [];
  page:number=1;
  count:number=0;
  filterForm !: FormGroup;
  tableSize:number=9;
  tableSizes:any=[3,6,9,12];
  constructor(
    private sanitizer: DomSanitizer,
    private theatreService: TheatreService,
    private accountService:AccountService,
    private dialog:MatDialog,
    private fb:FormBuilder

  ) {}

  ngOnInit(): void {
    this.getPlays();
    this.filterForm = this.fb.group({
      name:['']

    });
  }

  getPlays() {
    
    this.theatreService.getPlaysByCurrentUser().subscribe((data) => {
      this.plays = data;
    });
  }

  getImageUrl(row: Play): SafeUrl {
    const imageDataBytes = new Uint8Array(
      atob(row.image)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));

    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + base64ImageData
    );
  }

  deletePlay(id: number) {
    this.theatreService.deletePlay(id).subscribe(() => {
      this.getPlays();
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPlays();
    this.topOfPage.nativeElement.scrollIntoView();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPlays();
  }
  openAddEditPlayForm(){
    const dialogRef=this.dialog.open(AddEditPlayComponent);
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.getPlays();
      }
    })

  }
  openEditForm(data:any){
    console.log(data);
    const dialogRef=this.dialog.open(AddEditPlayComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.getPlays();
      }
    })
    
    
  }
  openChangePictureDialog(data:any) {
    let config=new MatDialogConfig;
    const dialogRef = this.dialog.open(ChangePictureComponent,config)
    dialogRef.componentInstance.type="event";
    dialogRef.componentInstance.data=data;
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getPlays();
      },
    });
  }
  getFilteredPlays(){
    this.page=1;

    
    console.log(this.filterForm.get('name')?.value)

    if(this.filterForm.get('name')?.value==""){
      this.getPlays();
    }
    else
    {

      this.theatreService.getFilteredPlaysByCurrentUser(
        this.filterForm.get('name')?.value)
      .subscribe((data)=>{this.plays=data});
    }
      

  }

}

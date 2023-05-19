import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { EventModel } from 'src/app/_models/event';
import { Play } from 'src/app/_models/play';
import { AccountService } from 'src/app/_services/account.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Reservation } from 'src/app/_models/reservation';
import { User } from 'src/app/_models/user';
import { ClientService } from 'src/app/_services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/_services/core.service';

@Component({
  selector: 'app-client-event',
  templateUrl: './client-event.component.html',
  styleUrls: ['./client-event.component.scss']
})
export class ClientEventComponent implements OnInit {

  currentEvent:EventModel={
    id: 1,
    datetime: new Date(),
    availableSeats: 100,
    price: 10,
    theatreName: 'ABC Theatre',
    play: {}as Play
  };
  model: Reservation = {
    id:0,
    numberOfTickets:0,
    user:{}as User,
    event:{}as EventModel,
    
    
  };

  buyForm !: FormGroup;
  faCalendar=faCalendarDay;
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private accountService: AccountService,
    private dialog:MatDialog,    private sanitizer:DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef:MatDialogRef<ClientEventComponent>,
  private clientService:ClientService,
  private fb:FormBuilder,
  private router:Router,
  private coreService:CoreService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.currentUser$.pipe(
      map((user) => !!user)
    );
    this.currentEvent=this.data;

    this.buyForm = this.fb.group({
      quantity: ['']
    });
    this.incrementQuantity();
    this.buyForm.get('quantity')?.disable();
  }

  getDate(dateString: Date): string {
    const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[date.getMonth()];
  return `${day} ${monthName}`;
  }
  
  getTime(dateString: Date): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'});
  }
  getImageUrl(row: Play): SafeUrl {

    const imageDataBytes = new Uint8Array(atob(row.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
  }
  onReservationClick(event:EventModel){
    console.log(event);
    console.log(this.buyForm);
    this.model.event=event;
    this.model.numberOfTickets=this.buyForm.controls['quantity'].getRawValue();
    this.clientService.addReservation(this.model).subscribe({
      next: () => {
      },
      error: (error) => console.log(error),
    });
  }
  decrementQuantity() {
    const quantityControl = this.buyForm.get('quantity');
    if (quantityControl) {
      let currentValue = quantityControl.value;
      if (currentValue > 1) {
        currentValue--;
        quantityControl.setValue(currentValue);
      }
    }
  }
  
  incrementQuantity() {
    const quantityControl = this.buyForm.get('quantity');
    if (quantityControl) {
      let currentValue = quantityControl.value;
      if (currentValue < 10 && currentValue<this.currentEvent.availableSeats) {
        currentValue++;
        quantityControl.setValue(currentValue);
      }
    }
  }

    openConfirmation(event:EventModel){

      const dialogRef=this.dialog.open(ConfirmationDialogComponent,{
        disableClose:false
      });
      dialogRef.componentInstance.confirmMessage = "Are you sure you want to reserve "+this.buyForm.controls['quantity'].getRawValue()+" tickets?";
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.model.event=event;
    this.model.numberOfTickets=this.buyForm.controls['quantity'].getRawValue();
    this.clientService.addReservation(this.model).subscribe({
      next: () => {
        
          this.router.navigateByUrl("");
          this.dialogRef.close();
          this.coreService.openSnackBar("Reservation made successfully",'done');
        
      },
      error: (error) => console.log(error),
    });
        }
      })
  
    }
  }
  


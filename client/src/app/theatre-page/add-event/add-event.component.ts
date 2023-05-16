import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EventSent } from 'src/app/_models/event-sent';
import { Play } from 'src/app/_models/play';
import { TheatreService } from 'src/app/_services/theatre.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/_services/core.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  datetimeForm!: FormGroup;
  event: EventSent = {
    id: 0,
    theatreName: '',
    playId: 0,
    datetime: new Date(),
    price:0
  };
  currentDate = new Date();
  tomorrow = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() + 1
  );
  minDateTime = this.formatDateTime(this.tomorrow);
  plays: Play[] = [];

  constructor(
    private theatreService: TheatreService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<AddEventComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
    this.getPlays();

    this.datetimeForm = this.formBuilder.group({
      datetime: ['', Validators.required],
      play: ['', Validators.required],
      price:['',Validators.required]
    });
    this.datetimeForm.patchValue(this.data);
  }

  getPlays() {
    this.theatreService.getPlaysByCurrentUser().subscribe((data) => {
      this.plays = data;
    });
  }

  onSubmit() {
    if(this.data){

    this.event.price=this.datetimeForm.controls['price'].getRawValue();
    this.event.datetime=this.datetimeForm.controls['datetime'].getRawValue();
    if(parseInt(this.datetimeForm.controls['play'].getRawValue()))
    {
      this.event.playId=parseInt(this.datetimeForm.controls['play'].getRawValue());
    }
    else{
      this.event.playId=this.data.play.id;
    }
    
    this.event.id=this.data.id;
    this.theatreService.updateEvent(this.event).subscribe({
      next: () => {
        this.cancel();
        this.coreService.openSnackBar("Event modified",'done');
      },
      error: (error) => console.log(error),
    })
  }
  else
  {
    this.event.price=this.datetimeForm.controls['price'].getRawValue();
    this.event.datetime=this.datetimeForm.controls['datetime'].getRawValue();
    this.event.playId=parseInt(this.datetimeForm.controls['play'].getRawValue());
    this.theatreService.addEvent(this.event).subscribe({
      next: () => {
        this.cancel();
        this.coreService.openSnackBar("Event added successfully",'done');
      },
      error: (error) => console.log(error),
    })
  }


}

  formatDateTime(date: Date): string {
    return (
      date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }) + 'T00:00'
    );
  }

  onTimeChange(event: any) {
    const datetimeValue = event.target.value;
    const hour = parseInt(datetimeValue.split('T')[1], 10);
    let evenTimeString = '';
    let evenHour = hour;

    if (hour % 2 !== 0) {
      evenHour = hour + 1;
    }
    evenTimeString = (evenHour < 10 ? '0' : '') + evenHour;
    const updatedDatetime = datetimeValue.slice(0, 11) + evenTimeString + ':00';
    this.datetimeForm.controls['datetime'].setValue(updatedDatetime);
  }

  cancel() {
    this.dialogRef.close();
  }
}

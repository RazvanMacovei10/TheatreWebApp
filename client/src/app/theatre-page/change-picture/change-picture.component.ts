import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Play } from 'src/app/_models/play';
import { PlayType } from 'src/app/_models/play-type';
import { AccountService } from 'src/app/_services/account.service';
import { CoreService } from 'src/app/_services/core.service';
import { TheatreService } from 'src/app/_services/theatre.service';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent implements OnInit {

  pictureChangeForm !: FormGroup;
  constructor(private fb:FormBuilder,
    private accountService:AccountService,
    public dialogRef: MatDialogRef<ChangePictureComponent>,
    private coreService:CoreService,
    private theatreService:TheatreService) { }
  model:any={};
  changePasswordError:string="";
    type:string="";
    data:any;
    playtype:PlayType={
      id:0,
      name:''
    }
  ngOnInit(): void {

  }
  changePicture(){
    if(this.dialogRef.componentInstance.type=="account"){
      this.accountService.changePicture(this.model).subscribe({
        next:()=>{
          this.cancel();
          this.coreService.openSnackBar("Image changed successfully",'done');
        },
        error: (error) => {
          if (error.status === 400) {
            this.changePasswordError=error.error;
          } else {
          }
        },
      })
    }
    else{
      if(this.dialogRef.componentInstance.type=='event')
      {

      const play: Play = {
        id:this.dialogRef.componentInstance.data.id,
        name:this.dialogRef.componentInstance.data.name,
        description:this.dialogRef.componentInstance.data.description,
        image:this.model.image,
        type:this.dialogRef.componentInstance.data.type,
      };

      this.theatreService.updatePlay(play).subscribe({
        next: () => {
          this.cancel();
          this.coreService.openSnackBar("Image updated successfully",'done');
        },
        error: (error) => console.log(error),
      });

      }
    }
    

  }
  cancel(){
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToByteArray(file).subscribe((byteArray) => {
      this.model.image =window.btoa(String.fromCharCode(...byteArray));
    });
    console.log(this.model);
  }
  public fileToByteArray(file: File): Observable<Uint8Array> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const array = new Uint8Array(reader.result as ArrayBuffer);
        observer.next(array);
        observer.complete();
      };
      reader.readAsArrayBuffer(file);
    });
  }


}

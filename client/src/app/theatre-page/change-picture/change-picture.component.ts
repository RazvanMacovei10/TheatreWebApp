import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { CoreService } from 'src/app/_services/core.service';

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
    private coreService:CoreService) { }
  model:any={};
  changePasswordError:string="";

  ngOnInit(): void {

  }
  changePicture(){
    console.log(this.model);

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

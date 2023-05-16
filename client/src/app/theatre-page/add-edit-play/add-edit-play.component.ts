import { Component, Inject, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Play } from 'src/app/_models/play';
import { PlayType } from 'src/app/_models/play-type';
import { CoreService } from 'src/app/_services/core.service';
import { TheatreService } from 'src/app/_services/theatre.service';

@Component({
  selector: 'app-add-edit-play',
  templateUrl: './add-edit-play.component.html',
  styleUrls: ['./add-edit-play.component.scss']
})
export class AddEditPlayComponent implements OnInit {
  @ViewChild('imageInput') imageInput!:ElementRef;

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  registerForm !: FormGroup;
  constructor(
    private sanitizer: DomSanitizer,
    private theatreService: TheatreService, 
    private router: Router, 
    private fb:FormBuilder,
    private dialogRef:MatDialogRef<AddEditPlayComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }
  playtype:PlayType={
    id:0,
    name:''
  }
  submitted=false;
  imageURL:string='';
  get f() { return this.registerForm.controls; }
  playTypes$:Observable<PlayType[]>|null=null;
    model: Play = {
    id:0,
    name:'',
    description:'',
    image:'',
    type:this.playtype,
  };
  selectedPlayTypeId:number=0;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      image: ['',Validators.required],
    });
    this.playTypes$=this.theatreService.getPlayTypes();
    this.registerForm.patchValue(this.data);
  }

  addPlay() {
    if(this.data){
      this.model.name=this.registerForm.controls['name'].getRawValue();
      this.model.description=this.registerForm.controls['description'].getRawValue();
      this.model.type=this.registerForm.controls['type'].getRawValue();
      this.model.image=this.data.image;
      this.model.id=this.data.id;
      //console.log(this.type);
     // this.model.type=this.registerForm.controls['type'].getRawValue();
      //this.model.type=this.playtype;
      this.theatreService.updatePlay(this.model).subscribe({
        next: () => {
          this.cancel();
          this.coreService.openSnackBar("Play modified successfully",'done');
        },
        error: (error) => console.log(error),
      });
    }
    else{
      this.model.name=this.registerForm.controls['name'].getRawValue();
      this.model.description=this.registerForm.controls['description'].getRawValue();
      this.model.type=this.registerForm.controls['type'].getRawValue();
      //console.log(this.type);
     // this.model.type=this.registerForm.controls['type'].getRawValue();
      //this.model.type=this.playtype;
      this.theatreService.addPlay(this.model).subscribe({
        next: () => {
          this.cancel();
          this.coreService.openSnackBar("Play added successfully",'done');
        },
        error: (error) => console.log(error),
      });
    }
    
  }
  cancel() {
    this.dialogRef.close();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToByteArray(file).subscribe((byteArray) => {
      this.model.image =window.btoa(String.fromCharCode(...byteArray));
    });
    console.log(this.model);
    this.registerForm.controls["image"].setValidators([Validators.required]);
            this.registerForm.get('image')?.updateValueAndValidity();
            const reader = new FileReader();
            reader.onload = () => {
              this.imageURL = reader.result as string;
            }
            reader.readAsDataURL(file);
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

}

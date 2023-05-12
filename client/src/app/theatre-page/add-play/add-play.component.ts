import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Play } from 'src/app/_models/play';
import { PlayType } from 'src/app/_models/play-type';
import { TheatreService } from 'src/app/_services/theatre.service';

@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.scss']
})
export class AddPlayComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  registerForm !: FormGroup;
  constructor(private theatreService: TheatreService, private router: Router, private fb:FormBuilder) { }
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
  }

  addPlay() {
    this.model.name=this.registerForm.controls['name'].getRawValue();
    this.model.description=this.registerForm.controls['description'].getRawValue();
    this.model.type=this.registerForm.controls['type'].getRawValue();
    //console.log(this.type);
   // this.model.type=this.registerForm.controls['type'].getRawValue();
    //this.model.type=this.playtype;
    this.theatreService.addPlay(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }
  cancel() {
    this.router.navigateByUrl("");
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

}

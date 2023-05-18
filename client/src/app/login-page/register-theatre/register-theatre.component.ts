import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterForm } from 'src/app/_models/register-form';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register-theatre',
  templateUrl: './register-theatre.component.html',
  styleUrls: ['./register-theatre.component.scss'],
})
export class RegisterTheatreComponent implements OnInit {
  model: RegisterForm = {
    id:-1,
    address: { city: '', street: '', number: '', id: 0 },
    username: '',
    totalSeats: '',
    password: '',
    email: '',
    image: '',
  };
  registerError:string="";

  constructor(private accountService: AccountService, private router:Router) {}

  ngOnInit(): void {}

  register() {
    this.model.address.number=this.model.address.number.toString();
    this.accountService.registerTheatre(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => {
        if (error.status === 400) {
          this.registerError=error.error;
        } else {
        }
      },
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

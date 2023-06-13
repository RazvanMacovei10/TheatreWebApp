import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { RegisterForm } from '../../_models/register-form';
import { RegisterFormsService } from 'src/app/_services/register-forms.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-theatre-register-forms',
  templateUrl: './theatre-register-forms.component.html',
  styleUrls: ['./theatre-register-forms.component.scss'],
})
export class TheatreRegisterFormsComponent implements OnInit {
  @Input() registerForm: RegisterForm = {
    id: -1,
    username: 'defaultUsername',
    address: {
      id: -1,
      city: 'defaultCity',
      street: 'defaultStreet',
      number: 'defaultNumber',
    },
    email: '',
    password: '',
    image: '',
    name:'',
  };
  @Output() reloadList: EventEmitter<any> = new EventEmitter();
  constructor(
    private sanitizer: DomSanitizer,
    private registerFormService: RegisterFormsService,
    private accountService:AccountService
  ) {

  }

  ngOnInit(): void {

  }

  approveTheatre() {
    this.registerFormService
      .createUser(this.registerForm.id.toString())
      .subscribe(() => this.reloadList.emit(null));
      this.accountService.sendEmailForAnnouncingUserAccountHasBeenActivated(this.registerForm.email);
  }
  deleteTheatre() {
    this.registerFormService
      .deleteForm(this.registerForm.id.toString())
      .subscribe(() => this.reloadList.emit());
  }

  getImageUrl(): SafeUrl {

    const imageDataBytes = new Uint8Array(atob(this.registerForm.image).split('').map(char => char.charCodeAt(0)));
    

    const base64ImageData = btoa(String.fromCharCode(...imageDataBytes));
    

    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64ImageData);
  }
}

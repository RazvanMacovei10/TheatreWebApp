import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model:any={};

  constructor(private accountService:AccountService, private router:Router) { }
  registerError:string="";
  ngOnInit(): void {
  }

  register(){
    this.model.role=Role.User;
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next:()=>{
        this.cancel();
        this.accountService.sendEmailForAnnouncingUserAccountHasBeenActivated(this.model.email);
      },
      error: (error) => {
        if (error.status === 400) {
          this.registerError=error.error;
        } else {
        }
      },
    })
  }
  cancel(){
    this.router.navigateByUrl("");
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/_services/account.service';
import { CoreService } from 'src/app/_services/core.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordChangeForm !: FormGroup;
  constructor(private fb:FormBuilder,
    private accountService:AccountService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private coreService:CoreService) { }
  model:any={};
  changePasswordError:string="";

  ngOnInit(): void {

  }
  changePassword(){
    console.log(this.model);

    this.accountService.changePassword(this.model).subscribe({
      next:()=>{
        this.cancel();
        this.coreService.openSnackBar("Password changed successfully",'done');
      },
      error: (error) => {
        if (error.status === 400) {
          this.changePasswordError=error.error;
        } else {
        }
      },
    })
    // this.accountService.register(this.model).subscribe({
    //   next:()=>{
    //     this.cancel();
    //   },
    //   error: (error) => {
    //     if (error.status === 400) {
    //       this.registerError=error.error;
    //     } else {
    //     }
    //   },
    // })
  }
  cancel(){
    this.dialogRef.close();
  }

}

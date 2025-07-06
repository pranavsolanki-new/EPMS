import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ROLE_TYPE } from 'src/app/app.constant';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  roles = ROLE_TYPE
  selectedValue: string = '';
  signupForm !: FormGroup
  constructor(private fb: FormBuilder,private commonService: CommonService, private notificationService:NotificationService,  private authservice: AuthService, private snackbar: MatSnackBar,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      id:''
    })

  }

  onSubmit(formvalue: any) {
    const id = Math.floor(10 + Math.random() * 1000);
     this.signupForm.patchValue({ id: String(id),email:formvalue.email.toLowerCase()});
    this.authservice.signUp(this.signupForm.value).subscribe({next:(res) => {
      if (res) {
        this.notificationService.addNotification({message:'New User SignedUp',type:'info',timestamp:new Date()});
        this.snackbar.open('Account Created Successfully', 'Close',
          {
            duration: 3000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          })
          setTimeout(() => {
             this.router.navigate(['/auth/login'])  
          }, 2000);
      }
    },
    error:(err)=>{
      let data = {
      message: err.message,
      button: 'dismis',
      duration: 3000,
      classType:'error-snackbar'
    }
     this.commonService.getSnackBar(data);
    }
    })
  }


}

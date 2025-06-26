import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ROLE_TYPE } from 'src/app/app.constant';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
 // roles =  ROLE_TYPE
  selectedValue: string ='';
  constructor(private fb: FormBuilder,private authservice: AuthService,
    private snackbar:MatSnackBar,private router: Router){}

ngOnInit() {
  this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,]],
   // role:['',[Validators.required]]
  })
}

onLogin(formData:NgForm){
console.log(formData)
this.authservice.getLogin(formData).subscribe({
  next:(res:any)=>{
    console.log(res)
    if(res?.length!=0){
      const loggedinUser = res[0]
      const fetchtoken = btoa(`${loggedinUser.email} -${new Date().getTime()}`)
     localStorage.setItem('token',fetchtoken)
     localStorage.setItem('CurrentEmployee',JSON.stringify(loggedinUser))
     if(loggedinUser.role === 'Admin'){
      this.router.navigate(['/users'])
     }
     else if(loggedinUser.role === 'Project Manager'){
      this.router.navigate(['/projects'])
     }
     else{
      this.router.navigate(['/dashboard'])
     }
          
    }
  },
  error:(err)=>{
      this.snackbar.open(err.message,'Dismiss',{
        duration:2000,
        panelClass:['error-snackbar']
      })
  }
})

}

}

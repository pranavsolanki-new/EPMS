import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  selectedValue: string = '';
  constructor(private fb: FormBuilder, private authservice: AuthService,
    private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
    })
  }

  onLogin(formData: NgForm) {
    let data = {
      message: 'Either email or Password is wrong try again',
      button: 'dismis',
      duration: 3000,
      classType: 'error-snackbar'
    }
    this.authservice.getLogin(formData).subscribe({
      next: (res: any) => {
        if (res?.length != 0) {
          const loggedinUser = res[0]
          const fetchtoken = btoa(`${loggedinUser.email} -${new Date().getTime()}`)
          localStorage.setItem('token', fetchtoken)
          localStorage.setItem('CurrentEmployee', JSON.stringify(loggedinUser))
          if (loggedinUser.role === 'Admin') {
            this.router.navigate(['/users'])
          }
          else if (loggedinUser.role === 'Project Manager') {
            this.router.navigate(['/projects'])
          }
          else {
            this.router.navigate(['/dashboard'])
          }
        }
        else {
          this.commonService.getSnackBar(data);
        }
      },
      error: (err) => {
        data.message = err.message;
        this.commonService.getSnackBar(data);
      }
    })

  }

}

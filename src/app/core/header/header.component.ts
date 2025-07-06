import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  loginLogoutButton!:string
  user:any
  constructor(private authService:AuthService,private router:Router,private commonservice:CommonService){
  }

  ngOnInit(){
   this.user = this.authService.getLoggedInUser()
   if(this.user){
     this.loginLogoutButton = 'Logout'
   }
   else{
    this.loginLogoutButton = 'Login'
   }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('CurrentEmployee');
    this.router.navigate(['/auth/login']);
    let data={
      message:'You have successfully loggedout',
      button:'dismis',
      duration:4000
   }
   this.commonservice.getSnackBar(data)
  }
  
}

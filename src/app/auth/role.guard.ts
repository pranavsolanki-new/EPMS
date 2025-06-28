import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../core/common.service';
export const RoleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
   const router = inject(Router);
   const commonservice = inject(CommonService)
   const desiredRoles:string[] =route.data['roles']
   const userData = localStorage.getItem('CurrentEmployee');
   let navigation;
   let data={
      message:'You need to login to access this page',
      button:'Close',
      duration:2000
   }
   if(!userData){
     commonservice.getSnackBar(data)
    router.navigate(['/auth/login'])
    return false;
   }
   const user = JSON.parse(userData)
   const userRole = user.role
  navigation =  userRole=='Project Manager' ? '/projects':'/dashboard'

   if(desiredRoles.includes(userRole)){
    return true
   }
   else{
      data.message ='Not Authorized to access this page'
       commonservice.getSnackBar(data);
    router.navigate([navigation])
    return false;
   }
};

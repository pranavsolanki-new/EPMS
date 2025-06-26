import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
export const RoleGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
   const router = inject(Router);
   const snackbar = inject(MatSnackBar)
   const desiredRoles:string[] =route.data['roles']
   const userData = localStorage.getItem('CurrentEmployee');
   let navigation;
   if(!userData){
     snackbar.open('You need to login to access this page','Close',{duration:2000})
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
   snackbar.open('Not Authorized to access this page','Close',{duration:2000})
    router.navigate([navigation])
    return false;
   }
};

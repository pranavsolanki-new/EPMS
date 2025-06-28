import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackbar:MatSnackBar) { }

  getSnackBar(data:any){
    this.snackbar.open(data.message, data?.button? data.button:'Close',
          {
            duration: data?.duration ? data?.duration: 0,
            horizontalPosition:data?.horizontalPosition ? data.horizontalPosition : 'center',
            verticalPosition:data?.verticalPosition ? data.horizontalPosition : 'top'
          })
  }
}

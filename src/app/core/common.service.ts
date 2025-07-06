import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private toastSubject = new Subject<{ type: string, message: string }>();
  toastState$ = this.toastSubject.asObservable();
  constructor(private snackbar:MatSnackBar) { }

  getSnackBar(data:any){
    this.snackbar.open(data.message, data?.button? data.button:'Close',
          {
            duration: data?.duration ? data?.duration: 0,
            horizontalPosition:data?.horizontalPosition ? data.horizontalPosition : 'center',
            verticalPosition:data?.verticalPosition ? data.horizontalPosition : 'top',
            panelClass:data.classType   // 3 class- success,error,info
          })
  }

  showToast(type: string, message: string) {
    this.toastSubject.next({ type, message });
  }
}

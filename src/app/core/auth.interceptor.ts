import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
``
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private snackbar :MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    let  modifiedrqst:any ;
    if(token){
       modifiedrqst = request.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
     })
    }
    return next.handle(modifiedrqst).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log(error)
        this.snackbar.open(error.message,'Close',{duration:2000})
        return throwError(()=>error)
      })
    )
  }
}

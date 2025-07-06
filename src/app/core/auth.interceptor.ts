import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
``
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private router: Router, private commonService: CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    let modifiedrqst: any;
     let data = {
      message: '',
      button: 'Close',
      duration: 2000
    }

    if (token) {
      modifiedrqst = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
   
    return next.handle(modifiedrqst).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          data.message = `Error:${error.error.message}`
          this.commonService.getSnackBar(data);
        }
        else {
          switch (error.status) {
            case 401:
              data.message = 'Unauthorized! Please login.'
              this.commonService.getSnackBar(data);
              this.router.navigate(['/login']);
              break;
            case 404:
              data.message = 'Resource not found.'
              this.commonService.getSnackBar(data);
              break;
            case 500:
              data.message = 'Server error. Try again later.'
              this.commonService.getSnackBar(data);
              break;
            default:
              data.message = `Error ${error.status}: ${error.message}`
              this.commonService.getSnackBar(data);
          }
        }
        return throwError(() => error)
      })
    )
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardStats(){
   return  this.http.get('http://localhost:3000/dashboardStats')
  }

  getProjectStatus() {
    return of({
      labels:['In Progress','Completed','On Hold'],
      data:[10,23,15],
    })
  }
}

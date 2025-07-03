import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardStats(){
   return  this.http.get('http://localhost:3000/dashboardStats')
  }

  getProjectStatus() {
     return  this.http.get('http://localhost:3000/projects/').pipe(
      map((res:any)=>{
       const inProgress = res.filter((x:any)=>x.status=="In Progress")?.length
       const todo = res.filter((x:any)=>x.status=="Pending")?.length
       const done = res.filter((x:any)=>x.status=="Completed")?.length
       return {
      labels:['In Progress','Completed','Pending'],
      data:[inProgress,done,todo],
       }
      }) 
      )
  }
}

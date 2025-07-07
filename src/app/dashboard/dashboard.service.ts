import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, forkJoin, map, of } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  getActiveUsers(){
      return this.http.get('http://localhost:3000/users')
  }

  getProjectList(){
    return this.http.get('http://localhost:3000/projects')
  }

   getOverdueTask(){
    return this.http.get(`http://localhost:3000/tasks`)
  }
  
getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return forkJoin({
    activeUserCount: this.getActiveUsers().pipe(
      map((x: any) => x.length)
    ),
    projectCount: this.getProjectList().pipe(  
      map((x: any) => x.length)
    ),
    overdueTaskCount: this.getOverdueTask().pipe(
      map((tasks: any) => {
        const overdueTasks = tasks.filter((task:any) => {
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate < today && task.status !== 'Done';
        });
        return overdueTasks.length;
      })
    )
  });
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

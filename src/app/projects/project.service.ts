import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
   url='http://localhost:3000/projects'
  constructor(private http:HttpClient) {

   }
 
  getProjectListData(){
    return this.http.get(this.url)
  }

  AddProjects(data:any){
   return this.http.post(this.url,data)
  }

  EditProjects(data:any){
return this.http.put(this.url,data)
  }

  DeleteProjects(){
return this.http.delete(this.url)
  }
}

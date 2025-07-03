import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
   
  constructor(private http:HttpClient) {

   }
 
  getProjectListData(id?:string){
   let  url='http://localhost:3000/projects/'
    if(id){
      url=url+id;
      return this.http.get(url)
    }
    else{
      return this.http.get(url)
    }
    
  }

  addProjects(data:any){
     let  url='http://localhost:3000/projects/'
   return this.http.post(url,data)
  }

  editProjects(data:any){
    let url = 'http://localhost:3000/projects/'+data.id
return this.http.put(url,data)
  }

  deleteProjects(id:string){
     let url = 'http://localhost:3000/projects/'+id;
     return this.http.delete(url)
  }
}

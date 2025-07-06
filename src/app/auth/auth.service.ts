import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getLogin(data:any) {
    let url = `http://localhost:3000/users?email=${data.email}&password=${data.password}`
    return this.http.get(url);
  }

  getUsers(){
     let url = 'http://localhost:3000/users';
     return this.http.get(url);
  }
  
  signUp(data: any) {
    let url = 'http://localhost:3000/users'
    return this.http.post(url, data);
  }

  getLoggedInUser(){
    const userData = localStorage.getItem('CurrentEmployee');
    let user
    if(userData) {
      user = JSON.parse(userData)
    }
    return user
  }

}

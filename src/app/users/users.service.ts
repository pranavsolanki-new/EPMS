import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(userId?: string) {
    if (userId) return this.http.get<[]>(`${this.baseUrl}/${userId}`);
    else return this.http.get<[]>(`${this.baseUrl}/`);
  }

  addUser(user: any) {
    return this.http.post<any>(this.baseUrl, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  resetPassword(user: any) {
    return this.http.patch(`${this.baseUrl}/${user.id}`, user)
  }
}

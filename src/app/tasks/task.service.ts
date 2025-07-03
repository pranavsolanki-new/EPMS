import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(projectId: number) {
    return this.http.get<[]>(`${this.baseUrl}?projectId=${projectId}`);
  }

  addTask(task: any) {
    return this.http.post<any>(this.baseUrl, task);
  }

  updateTask(task: any) {
    return this.http.put(`${this.baseUrl}/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
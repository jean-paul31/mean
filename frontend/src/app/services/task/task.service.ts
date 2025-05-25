import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(title: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title });
  }

  createTask(task: { title: string; assignedTo: string | null }): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(id: string, completed: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { completed });
  }

  assignTask(taskId: string, userId: string | null): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, { assignedTo: userId });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

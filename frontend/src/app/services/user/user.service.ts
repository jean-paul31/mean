// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {console.log("✅ UserService instancié !");}

  getUsers(): Observable<User[]> {
    console.log("🔄 Récupération des utilisateurs...");
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user);
  }

  getUsersWithTasks(): Observable<any> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      switchMap(users =>
        this.http.get<Task[]>('http://localhost:3000/tasks').pipe(
          map(tasks => {
            console.log("📌 Utilisateurs récupérés :", users);
            console.log("📌 Tâches récupérées :", tasks);
  
            return users.map(user => {
              const userTasks = tasks.filter(task => task.assignedTo?._id === user._id);
              console.log(`📌 Tâches pour ${user.name} (${user._id}):`, userTasks);
  
              return {
                ...user,
                tasks: userTasks
              };
            });
          })
        )
      )
    );
  }
  
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}

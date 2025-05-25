import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  private apiUrl = 'http://localhost:3000/users'; // Remplacez par l'URL de votre API
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mdp });
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user)); // facultatif mais utile pour persistance
  }

  getUser() {
    if (this.currentUser) return this.currentUser;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
  
  // isAuthenticated(): boolean {
  //   // Vérification simple, vous pouvez améliorer cela selon votre logique (token, session, etc.)
  //   return !!localStorage.getItem('authToken');
  // }
}
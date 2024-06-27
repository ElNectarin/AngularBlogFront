import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
  }

  setToken(token: string, username: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('username', username);
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}

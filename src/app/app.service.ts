import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, User } from './mainblogpage/mainblogpage.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:3000/users/');
  }

  getAllPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/posts/');
  }
}

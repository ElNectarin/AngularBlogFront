import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(title: string, text: string): Observable<any> {
    return this.http.post('http://localhost:3000/posts/create', {
      title,
      text,
    });
  }

  createComment(
    authorComment: string,
    postId: number
  ): Observable<any> {
    return this.http.post('http://localhost:3000/comments', {
      authorComment,
      postId,
    });
  }

  getPost(postId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/posts/${postId}`,)
  }
}

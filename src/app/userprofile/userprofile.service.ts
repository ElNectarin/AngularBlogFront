import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserprofileService {
  constructor(private http: HttpClient) {}

  getProfileInfo(userName: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:3000/users/${userName}`);
  }
}

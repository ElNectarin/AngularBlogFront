import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  editPerson(
    id: number,
    name: string,
    status: string,
    username: string,
    email: string,
    education: string,
    birthday: string,
    location: string,
    skills: string,
    work: string
  ): Observable<any> {
    return this.http.patch<any>(`http://127.0.0.1:3000/users/${id}`, {
      name,
      status,
      username,
      email,
      education,
      birthday,
      location,
      skills,
      work,
    });
  }
}

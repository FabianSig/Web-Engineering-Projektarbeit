import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from './userdata';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<Userdata>{
    return this.http.get<Userdata>(`${this.apiUrl}/users/${username}`);
  }
}

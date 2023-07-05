import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Userdata } from './userdata';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Repository } from './shared/repository';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<Userdata> {
    return this.http.get<Userdata>(`${this.apiUrl}/users/${username}`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) console.error("client error lol");
    else if (error.status === 404 || error.status === 403) {
      console.error("user not found");
      const _nouserdata = new BehaviorSubject<Userdata>({
        login: "user not found",
        avatar_url: "/assets/img/NoUser.png",
        followers: 0,
        following: 0,
        name: "",
        created_at: "",
        public_repos: 0
      })
      return _nouserdata.asObservable();
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getRepositories(username: string): Observable<Array<Repository>> {
    return this.http.get<Array<Repository>>(`${this.apiUrl}/users/${username}/repos`).pipe(catchError(this.handleRepoError));
  }

  handleRepoError(error: HttpErrorResponse) {
    if (error.status === 0) console.error("client error lol");
    else {
      return new BehaviorSubject<Array<Repository>>([
        {
          stargazers_count: 0
        }
      ])
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getContributions(username: string): Observable<string> {
    return this.http.get(`https://github.com/users/${username}/contributions`, { responseType: 'text' }).pipe(catchError(this.handleContribError));
  }

  handleContribError(error: HttpErrorResponse) {
    if (error.status === 0) console.error("client error lol");
    else {
      return new BehaviorSubject<string>('').asObservable();
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}

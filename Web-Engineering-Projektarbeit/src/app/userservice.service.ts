import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Userdata } from './userdata';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Repository } from './shared/repository';
import { Contributions } from './shared/contributions';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<Userdata> {
    return this.http.get<Userdata>(`${this.apiUrl}/users/${username}`).pipe(catchError(this.handleError));
  }

  /*getContributions(username: string): Observable<any> {
    return this.http.get(`https://github.com/users/${username}/contributions`);
  }*/

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) console.error("client error lol");
    else if (error.status === 404) { 
      console.error("user not found"); 
      return throwError(() => new Error('User not found'));
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getRepositories(username: string): Observable<Array<Repository>> {
    return this.http.get<Array<Repository>>(`${this.apiUrl}/users/${username}/repos`).pipe(catchError(this.handleError));
  }

  getContributions(username: string): Observable<Array<Contributions>> {
    return this.http.get<Array<Contributions>>(`https://skyline.github.com/${username}/2023.json`).pipe(catchError(this.handleError));
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from './userdata';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }

  getUser(username: string): Observable<Userdata>{
  }
}

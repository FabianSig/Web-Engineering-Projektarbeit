import { Component, Input } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  @Input() 
  username? :string;

  userdata? :Userdata;
  userdata$: Observable<Userdata>;

  constructor(private userservice: UserserviceService) {
    this.userdata$ = userservice.getUser(this.username?)
  }


  //profilbild
  //beigetreten
  //Commit anzahl
  // öffentliche Repos
  // follower
  // folgt
  // achievments
  // letzter commit
  

}
function getUser(username: string | undefined): Userdata {
  throw new Error('Function not implemented.');
}


import { Component, Input, OnInit } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userdata?: Userdata;


  //profilbild
  //beigetreten
  //Commit anzahl
  // öffentliche Repos
  // follower
  // folgt
  // achievments
  // letzter commit
  
  constructor(){
    
  }
  ngOnInit(): void {
    console.log(this.userdata);
  }

}

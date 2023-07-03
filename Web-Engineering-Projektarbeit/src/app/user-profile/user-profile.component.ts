import { Component, Input, OnInit } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs';
import { Repository } from '../shared/repository';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userdata?: Userdata;
  @Input() repositories? : Array<Repository>;
  stargazers_count: number = 0;


  //profilbild
  //beigetreten
  //Commit anzahl
  // öffentliche Repos
  // follower
  // folgt
  // achievments
  // letzter commit
  
  constructor(private userservice: UserserviceService){
    
  }
  ngOnInit(): void {
    console.log(this.userdata);
    this.stargazers_count = this.countStargazers(this.repositories!);
  }

  countStargazers(repos: Array<Repository>): number{
    console.log(repos);
    let count = 0;
    repos.forEach(repo => {
      count += repo.stargazers_count;
    });
    return count;
  }

}

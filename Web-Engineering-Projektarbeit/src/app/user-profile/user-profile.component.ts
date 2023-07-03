import { Component, Input, OnInit } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs';
import { Repository } from '../shared/repository';
import { Contributions } from '../shared/contributions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userdata?: Userdata;
  @Input() repositories? : Array<Repository>;
  @Input() contributions? : Array<Contributions>;
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
    this.stargazers_count = this.countStargazers(this.repositories!);
  }

  countStargazers(repos: Array<Repository>): number{
    let count = 0;
    repos.forEach(repo => {
      count += repo.stargazers_count;
    });
    return count;
  }

}

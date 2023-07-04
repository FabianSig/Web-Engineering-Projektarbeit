import { Component, Input, OnInit, Output } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Observable } from 'rxjs';
import { Repository } from '../shared/repository';
import { Contribhistory } from '../shared/contribhistory';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userdata?: Userdata;
  @Input() otherUserdata?: Userdata;
  @Input() repositories?: Array<Repository>;
  @Input() otherRepositories?: Array<Repository>;
  @Input() contributions?: Contribhistory;
  @Input() otherContributions?: Contribhistory;
  stargazers_count: number = 0;
  otherStargazers_count: number = 0;
  


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
    console.log(this.contributions);
    this.stargazers_count = this.countStargazers(this.repositories!);
    }

  countStargazers(repos: Array<Repository>): number{
    let count = 0;
    repos.forEach(repo => {
      count += repo.stargazers_count;
    });
    return count;
  }

  countContributions(contribhistory: Contribhistory): number{
    let count = 0;
    contribhistory.contributions.forEach(element => {
      element.days.forEach(day => {
        count += day.count;
      });
    })
    return count;
  }

}

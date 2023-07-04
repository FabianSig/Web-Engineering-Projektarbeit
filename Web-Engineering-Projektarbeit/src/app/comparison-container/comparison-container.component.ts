import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Repository } from '../shared/repository';
import { Contribhistory } from '../shared/contribhistory';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent {



  usernameOne?: string;
  usernameTwo?: string;
  
  userdataOne?: Userdata;
  userdataTwo?: Userdata;

  userreposOne?: Array<Repository>;
  userreposTwo?: Array<Repository>;

  stargazerOneCount: number = 0;
  stargazerTwoCount: number = 0;

  userContributionsOne?: Contribhistory;
  userContributionsTwo?: Contribhistory;

  userContributionsOneCount: number = 0;
  userContributionsTwoCount: number = 0;


  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {
    this.route.params.subscribe(params => {
      this.usernameOne = params["nameone"];
      this.usernameTwo = params["nametwo"];
    });

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getUser(nameone))
    ).subscribe(userdata => this.userdataOne = userdata);

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getRepositories(nameone))
    ).subscribe(repos => this.userreposOne = repos);

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getContributions(nameone))
    ).subscribe(contributions => this.userContributionsOne = contributions);

    this.route.paramMap.pipe(
      map(params => params.get('nametwo')!),
      switchMap(nametwo => this.userservice.getUser(nametwo))
    ).subscribe(userdata => this.userdataTwo = userdata);

   this.route.paramMap.pipe(
      map(params => params.get('nametwo')!),
      switchMap(nametwo => this.userservice.getRepositories(nametwo))
    ).subscribe(repos => this.userreposTwo = repos);

    this.route.paramMap.pipe(
      map(params => params.get('nametwo')!),
      switchMap(nametwo => this.userservice.getContributions(nametwo))
    ).subscribe(contributions => this.userContributionsTwo = contributions);

    this.stargazerOneCount = this.countStargazers(this.userreposOne!);
    this.stargazerTwoCount = this.countStargazers(this.userreposTwo!);

    this.userContributionsOneCount = this.countContributions(this.userContributionsOne!);
    this.userContributionsTwoCount = this.countContributions(this.userContributionsTwo!);

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

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

  userContributionsOne?: Contribhistory;

  userContributionsTwo?: Contribhistory;


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

  }





}

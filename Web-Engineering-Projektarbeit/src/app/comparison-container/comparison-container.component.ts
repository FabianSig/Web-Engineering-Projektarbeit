import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Repository } from '../shared/repository';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent {


  usernameOne?: string;
  usernameTwo?: string;

  userdataOne?: Userdata;
  userdataOne$: Observable<Userdata>;
  userdataTwo?: Userdata;
  userdataTwo$: Observable<Userdata>;

  userreposOne?: Array<Repository>;
  userreposOne$: Observable<Array<Repository>>;
  userreposTwo?: Array<Repository>;
  userreposTwo$: Observable<Array<Repository>>;


  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {
    this.route.params.subscribe(params => {
      this.usernameOne = params["nameone"];
      this.usernameTwo = params["nametwo"];
    });

    this.userdataOne$ = this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getUser(nameone))
    )

    this.userreposOne$ = this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getRepositories(nameone))
    )

    this.userdataTwo$ = this.route.paramMap.pipe(
      map(params => params.get('nametwo')!),
      switchMap(nametwo => this.userservice.getUser(nametwo))
    )

    this.userreposTwo$ = this.route.paramMap.pipe(
      map(params => params.get('nametwo')!),
      switchMap(nametwo => this.userservice.getRepositories(nametwo))
    )

  }





}

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
export class ComparisonContainerComponent implements OnInit {



  usernameOne?: string;
  usernameTwo?: string;

  userdataOne?: Userdata;
  userdataTwo?: Userdata;

  userScoreOne: number = 0;
  userScoreTwo: number = 0;


  stargazerOneCount: number = 0;
  stargazerTwoCount: number = 0;

  userContributionsOneCount: number = 0;
  userContributionsTwoCount: number = 0;

  userOneWinBoolArr: boolean[] = [false, false, false, false, false];
  userTwoWinBoolArr: boolean[] = [false, false, false, false, false];

  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {
    this.userScoreOne = 0;
    this.userScoreTwo = 0;
  }

  ngOnInit(): void {

    this.userTwoWinBoolArr = [false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false];

    this.userScoreOne = 0;
    this.userScoreTwo = 0;

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getUser(nameone))
    ).subscribe(userdata => {



      this.userdataOne = userdata
      this.route.paramMap.pipe(
        map(params => params.get('nametwo')!),
        switchMap(nametwo => this.userservice.getUser(nametwo))
      ).subscribe(userdata => {

        this.userdataTwo = userdata
        this.userOneWinBoolArr[1] = this.userdataOne!.followers! > this.userdataTwo.followers;
        this.userTwoWinBoolArr[1] = this.userdataOne!.followers! < this.userdataTwo.followers;

        this.userOneWinBoolArr[3] = this.userdataOne!.public_repos! > this.userdataTwo.public_repos;
        this.userTwoWinBoolArr[3] = this.userdataOne!.public_repos! < this.userdataTwo.public_repos;

        console.log("erstellt " + Date.parse(this.userdataOne!.created_at))
        console.log("erstellt " + Date.parse(this.userdataTwo!.created_at))

        this.userOneWinBoolArr[4] = Date.parse(this.userdataOne!.created_at) < Date.parse(this.userdataTwo!.created_at);
        this.userTwoWinBoolArr[4] = Date.parse(this.userdataOne!.created_at) > Date.parse(this.userdataTwo!.created_at);


        console.log(this.userOneWinBoolArr[4])
        console.log(this.userTwoWinBoolArr[4])
        this.route.paramMap.pipe(
          map(params => params.get('nameone')!),
          switchMap(nameone => this.userservice.getRepositories(nameone))
        ).subscribe(repos => {

          this.stargazerOneCount = this.countStargazers(repos)
          this.route.paramMap.pipe(
            map(params => params.get('nametwo')!),
            switchMap(nametwo => this.userservice.getRepositories(nametwo))
          ).subscribe(repos => {

            this.stargazerTwoCount = this.countStargazers(repos)
            this.userOneWinBoolArr[2] = this.stargazerOneCount > this.stargazerTwoCount;
            this.userTwoWinBoolArr[2] = this.stargazerOneCount < this.stargazerTwoCount;

            this.route.paramMap.pipe(
              map(params => params.get('nameone')!),
              switchMap(nameone => this.userservice.getContributions(nameone))
            ).subscribe(contributions => {

              this.userContributionsOneCount = this.countContributions(contributions)
              this.route.paramMap.pipe(
                map(params => params.get('nametwo')!),
                switchMap(nametwo => this.userservice.getContributions(nametwo))
              ).subscribe(contributions => {

                this.userContributionsTwoCount = this.countContributions(contributions);
                this.userOneWinBoolArr[0] = this.userContributionsOneCount > this.userContributionsTwoCount;
                this.userTwoWinBoolArr[0] = this.userContributionsOneCount < this.userContributionsTwoCount;

                console.log("hi")

                this.userOneWinBoolArr.forEach(element => { element ? this.userScoreOne++ : this.userScoreTwo++; });

              });

            });
          });
        });


      });
    });
  }

  countStargazers(repos: Array<Repository>): number {
    let count = 0;
    repos.forEach(repo => {
      count += repo.stargazers_count;
    });
    return count;
  }

  countContributions(contribhistory: Contribhistory): number {
    let count = 0;
    contribhistory.contributions.forEach(element => {
      element.days.forEach(day => {
        count += day.count;
      });
    })
    return count;
  }

  getUserDataOne() {

  }




}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Repository } from '../shared/repository';
import { Contribhistory } from '../shared/contribhistory';
import confetti from 'canvas-confetti';
import { Subscription } from 'apollo-angular';


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



  stargazerOneCount: number = 0;
  stargazerTwoCount: number = 0;

  userContributionsOneCount: number = 0;
  userContributionsTwoCount: number = 0;

  userOneWinBoolArr: boolean[];
  userTwoWinBoolArr: boolean[];

  count: number = 0;

  destroy?: any;


  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {

    this.userTwoWinBoolArr = [false, false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false, false];
  }

  ngOnInit(): void {

    try {
      this.route.params.subscribe(params => {
        this.usernameOne = params["nameone"];
        this.usernameTwo = params["nametwo"];
      });

      this.userTwoWinBoolArr = [false, false, false, false, false, false];
      this.userOneWinBoolArr = [false, false, false, false, false, false];

     this.destroy = this.route.paramMap.pipe(
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

          this.userOneWinBoolArr[4] = Date.parse(this.userdataOne!.created_at) < Date.parse(this.userdataTwo!.created_at);
          this.userTwoWinBoolArr[4] = Date.parse(this.userdataOne!.created_at) > Date.parse(this.userdataTwo!.created_at);

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

                  this.count = 0;
                  this.userOneWinBoolArr.forEach(element => { if (element) this.count++; });

                  this.userOneWinBoolArr[5] = this.count > 2
                  this.userTwoWinBoolArr[5] = this.count <= 2;

                  this.canon(0.65, 0.6)
                  
                });

              });
            });
          });


        });
      });
    }

    

    catch (e: any) {

      console.log("Das ist die Nachricht: " + e.name)
      console.log("Das ist die Nachricht: " + e.message)
    }

  }

  ngOnDestroy(): void {
    if(this.destroy){
      this.destroy.unsubscribe();
    }
  }

  countStargazers(repos: Array<Repository>): number {
    let count = 0;
    repos.forEach(repo => {
      count += repo.stargazers_count;
    });
    return count;
  }

  countContributions(contribPage: string): number {
    let position = contribPage.indexOf('<h2 class="f4 text-normal mb-2">')
    if (position === -1) return 0;
    let cutString = contribPage.substring(position + 39, position + 44).replaceAll(' ', '').replaceAll(',', '')
    return parseInt(cutString);
  }


  public canon(x_coord: number, y_coord: number): void {
    confetti({
      particleCount: 100,
      spread: 50,
      origin: { x: x_coord, y: y_coord }
    });
}




}

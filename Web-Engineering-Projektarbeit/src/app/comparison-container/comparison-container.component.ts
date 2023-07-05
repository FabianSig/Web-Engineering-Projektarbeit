import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, lastValueFrom } from 'rxjs';
import { Userdata } from '../shared/userdata';
import { UserserviceService } from '../shared/userservice.service';
import { Repository } from '../shared/repository';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent implements OnInit {

  userdataOne?: Userdata;
  userdataTwo?: Userdata;



  stargazerOneCount: number = 0;
  stargazerTwoCount: number = 0;

  userContributionsOneCount: number = 0;
  userContributionsTwoCount: number = 0;

  userOneWinBoolArr: boolean[];
  userTwoWinBoolArr: boolean[];

  count: number = 0;

  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {

    this.userTwoWinBoolArr = [false, false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false, false];
  }

  ngOnInit(): void {
    this.userTwoWinBoolArr = [false, false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false, false];

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!),
      switchMap(nameone => this.userservice.getUser(nameone))
    ).subscribe(async userdata => {

      let usernameOne = userdata.login;
      this.userdataOne = userdata
      let usernameTwo = this.route.snapshot.paramMap.get('nametwo')!;
      this.userdataTwo = await lastValueFrom(this.userservice.getUser(usernameTwo));

      this.userOneWinBoolArr[1] = this.userdataOne!.followers! > this.userdataTwo.followers;
      this.userOneWinBoolArr[3] = this.userdataOne!.public_repos! > this.userdataTwo.public_repos;
      this.userOneWinBoolArr[4] = Date.parse(this.userdataOne!.created_at) < Date.parse(this.userdataTwo!.created_at);
      
      let reposOne = lastValueFrom(this.userservice.getRepositories(usernameOne));
      let reposTwo = lastValueFrom(this.userservice.getRepositories(usernameTwo));

      let contribPageOne = lastValueFrom(this.userservice.getContributions(usernameOne));
      let contribPageTwo = lastValueFrom(this.userservice.getContributions(usernameTwo));

      
      this.stargazerOneCount = this.countStargazers(await reposOne)
      this.stargazerTwoCount = this.countStargazers(await reposTwo)
      this.userOneWinBoolArr[2] = this.stargazerOneCount > this.stargazerTwoCount;

      this.userContributionsOneCount = this.countContributions(await contribPageOne)
      this.userContributionsTwoCount = this.countContributions(await contribPageTwo);
      this.userOneWinBoolArr[0] = this.userContributionsOneCount > this.userContributionsTwoCount;

      this.count = 0;
      this.userOneWinBoolArr.forEach((element, index) => { 
        this.userTwoWinBoolArr[index] = !element;
        if (element) this.count++; 
      });

      this.userOneWinBoolArr[5] = this.count > 2
      this.userTwoWinBoolArr[5] = this.count <= 2;
    });




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


}
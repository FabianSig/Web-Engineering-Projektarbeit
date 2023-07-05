import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, lastValueFrom } from 'rxjs';
import { Userdata } from '../shared/userdata';
import { UserserviceService } from '../shared/userservice.service';
import { Repository } from '../shared/repository';
import { ProfileData } from '../shared/profile-data';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent implements OnInit {

  userOneProfileData?: ProfileData;
  userTwoProfileData?: ProfileData;
  userOneWinBoolArr: boolean[];
  userTwoWinBoolArr: boolean[];


  constructor(private route: ActivatedRoute, private userservice: UserserviceService) {
    this.userTwoWinBoolArr = [false, false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false, false];
  }

  ngOnInit(): void {
    this.userTwoWinBoolArr = [false, false, false, false, false, false];
    this.userOneWinBoolArr = [false, false, false, false, false, false];

    this.route.paramMap.pipe(
      map(params => params.get('nameone')!), // ! because component only get's called when that route parameter exists
      switchMap(nameone => this.userservice.getUser(nameone))
    ).subscribe(async userdataOne => {

      let usernameOne = userdataOne.login;
      let usernameTwo = this.route.snapshot.paramMap.get('nametwo')!;
      let _userdataTwo = lastValueFrom(this.userservice.getUser(usernameTwo));

      
      let reposOne = lastValueFrom(this.userservice.getRepositories(usernameOne));
      let reposTwo = lastValueFrom(this.userservice.getRepositories(usernameTwo));

      let contribPageOne = lastValueFrom(this.userservice.getContributions(usernameOne));
      let contribPageTwo = lastValueFrom(this.userservice.getContributions(usernameTwo));


      this.userOneProfileData = {
        username: userdataOne.login,
        realname: userdataOne.name,
        avatar_url: userdataOne.avatar_url,
        cakeday: userdataOne.created_at,
        contributions: this.countContributions(await contribPageOne),
        followers: userdataOne.followers,
        stargazers: this.countStargazers(await reposOne),
        public_repos: userdataOne.public_repos
      }
      
      let userdataTwo = await _userdataTwo;
      
      this.userOneWinBoolArr[1] = userdataOne!.followers! > userdataTwo.followers;
      this.userOneWinBoolArr[3] = userdataOne!.public_repos! > userdataTwo.public_repos;
      this.userOneWinBoolArr[4] = Date.parse(userdataOne!.created_at) < Date.parse(userdataTwo!.created_at);
      
      this.userTwoProfileData = {
        username: userdataTwo.login,
        realname: userdataTwo.name,
        avatar_url: userdataTwo.avatar_url,
        cakeday: userdataTwo.created_at,
        contributions: this.countContributions(await contribPageTwo),
        followers: userdataTwo.followers,
        stargazers: this.countStargazers(await reposTwo),
        public_repos: userdataTwo.public_repos
      }

      this.userOneWinBoolArr[0] = this.userOneProfileData.contributions > this.userTwoProfileData.contributions;
      this.userOneWinBoolArr[2] = this.userOneProfileData.stargazers > this.userTwoProfileData.stargazers;

      this.countResults();      
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

  countResults(){
    let count = 0;
    this.userOneWinBoolArr.forEach((element, index) => { 
      this.userTwoWinBoolArr[index] = !element;
      if (element) count++; 
    });

    this.userOneWinBoolArr[5] = count > 2
    this.userTwoWinBoolArr[5] = count <= 2;
  }

}
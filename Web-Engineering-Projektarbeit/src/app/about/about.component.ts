import { Component } from '@angular/core';
import { UserserviceService } from '../shared/userservice.service';
import { Repository } from '../shared/repository';
import { ProfileData } from '../shared/profile-data';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  usernameFabian: string = "fabiansig";
  usernameNiko: string = "NikomitK";

  userdataOne?: ProfileData;
  userdataTwo?: ProfileData;

  constructor(private userservice: UserserviceService) {
}
  async ngOnInit(): Promise<void> {
    let userOne = await lastValueFrom(this.userservice.getUser(this.usernameFabian));
    this.userdataOne = {
      username: userOne.login,
      realname: userOne.name,
      avatar_url: userOne.avatar_url,
      cakeday: userOne.created_at,
      contributions: this.countContributions(await lastValueFrom(this.userservice.getContributions(userOne.login))),
      followers: userOne.followers,
      public_repos: userOne.public_repos,
      stargazers: this.countStargazers(await lastValueFrom(this.userservice.getRepositories(userOne.login))),
    }

    let userTwo = await lastValueFrom(this.userservice.getUser(this.usernameNiko));
    this.userdataTwo = {
      username: userTwo.login,
      realname: userTwo.name,
      avatar_url: userTwo.avatar_url,
      cakeday: userTwo.created_at,
      contributions: this.countContributions(await lastValueFrom(this.userservice.getContributions(userTwo.login))),
      followers: userTwo.followers,
      public_repos: userTwo.public_repos,
      stargazers: this.countStargazers(await lastValueFrom(this.userservice.getRepositories(userTwo.login))),
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

}

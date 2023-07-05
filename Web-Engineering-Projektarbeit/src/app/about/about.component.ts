import { Component } from '@angular/core';
import { Userdata } from '../userdata';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { map, switchMap } from 'rxjs';
import { Repository } from '../shared/repository';
import { Contribhistory } from '../shared/contribhistory';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  usernameOne: string = "fabiansig";
  usernameTwo?: string = "NikomitK";

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

    this.userservice.getUser('fabiansig')
      .subscribe(userdata => {

        this.userdataOne = userdata
        this.userservice.getUser('nikomitk')
          .subscribe(userdata => {

            this.userdataTwo = userdata

            this.userservice.getRepositories('fabiansig')
              .subscribe(repos => {

                this.stargazerOneCount = this.countStargazers(repos)
                this.userservice.getRepositories('nikomitk')
                  .subscribe(repos => {

                    this.stargazerTwoCount = this.countStargazers(repos)
                    this.userservice.getContributions('fabiansig')
                      .subscribe(contributions => {

                        this.userContributionsOneCount = this.countContributions(contributions)
                        this.userservice.getContributions('nikomitk')
                          .subscribe(contributions => {

                            this.userContributionsTwoCount = this.countContributions(contributions);


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

  countContributions(contribPage: string): number {
    let position = contribPage.indexOf('<h2 class="f4 text-normal mb-2">')
    if (position === -1) return 0;
    let cutString = contribPage.substring(position + 39, position + 44).replaceAll(' ', '').replaceAll(',', '')
    return parseInt(cutString);
  }

}

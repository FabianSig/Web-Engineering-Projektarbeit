import { Component, Input, OnInit } from '@angular/core';
import { Userdata } from '../userdata';
import { UserserviceService } from '../userservice.service';
import { Repository } from '../shared/repository';
import { Contribhistory } from '../shared/contribhistory';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{

  @Input() userdata?: Userdata;
  @Input() stargazerCount?: number;
  @Input() contributionsCount?: number;
  @Input() userWinarr?: boolean[];
  
  constructor(private userservice: UserserviceService){

  }

}

import { Component, Input, OnInit} from '@angular/core';
import { Userdata } from '../shared/userdata';
import { UserserviceService } from '../shared/userservice.service';
import { BehaviorSubject } from 'rxjs';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  @Input() userdata?: Userdata;
  @Input() stargazerCount?: number;
  @Input() contributionsCount?: number;
  @Input() userWinarr?: boolean[];
  constructor(private userservice: UserserviceService){

  }

  ngOnInit(): void {
          

  }



}

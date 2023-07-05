import { Component, Input } from '@angular/core';
import { ProfileData } from '../shared/profile-data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  @Input() profileData?: ProfileData;
  @Input() userWinarr: boolean[] = [false, false, false, false, false, false];
  
}

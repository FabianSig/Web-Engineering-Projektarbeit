import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web-Engineering-Projektarbeit';

  nameFormGroup = this.fb.group({
    userOneControl: ['', Validators.required],
    userTwoControl: ['', Validators.required]
  })
  

  constructor(private router: Router, private titleService:Title, private fb: FormBuilder) {
    this.titleService.setTitle("GitCompare");
   }

  goCompare(){
    if(this.nameFormGroup.valid){
      this.router
      .navigate(
        [`/compare/${this.nameFormGroup.get("userOneControl")?.value}
        /${this.nameFormGroup.get("userTwoControl")?.value}`]);
    }
  }
}

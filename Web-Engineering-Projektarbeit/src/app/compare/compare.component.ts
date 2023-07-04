import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {

  constructor(private router: Router, private fb: FormBuilder){}

  nameFormGroup = this.fb.group({
    userOneControl: ['', Validators.required],
    userTwoControl: ['', Validators.required]
  })

  goCompare(){
    if(this.nameFormGroup.valid){
      this.router
      .navigate(
        [`/compare/${this.nameFormGroup.get("userOneControl")?.value}/${this.nameFormGroup.get("userTwoControl")?.value}`]);
    }
  }
}

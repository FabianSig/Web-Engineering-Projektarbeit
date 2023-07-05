import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web-Engineering-Projektarbeit';

  constructor(private router: Router, private titleService:Title, private fb: FormBuilder) {
    this.titleService.setTitle("GitHub-Compare");
   }

}

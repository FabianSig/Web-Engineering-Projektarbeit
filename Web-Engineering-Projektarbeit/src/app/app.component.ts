import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web-Engineering-Projektarbeit';

  usernameOne = "";
  usernameTwo = "";

  constructor(private router: Router) { }

  goCompare(){
    this.router.navigate([`/compare/${this.usernameOne}/${this.usernameTwo}`]);
  }
}

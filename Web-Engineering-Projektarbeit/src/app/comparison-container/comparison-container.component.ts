import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent {


  usernameOne? :string;
  usernameTwo? :string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.usernameOne = params["nameone"];
      this.usernameTwo = params["nametwo"]; 
   });

   console.log(this.usernameOne)
  }


  


}

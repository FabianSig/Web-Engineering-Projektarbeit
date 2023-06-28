import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comparison-container',
  templateUrl: './comparison-container.component.html',
  styleUrls: ['./comparison-container.component.css']
})
export class ComparisonContainerComponent {

  constructor(private route: ActivatedRoute) {}

  usernameOne? :string;
  usernameTwo? :string;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
       this.usernameOne = params["nameone"];
       this.usernameTwo = params["nametwo"]; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
  }


}

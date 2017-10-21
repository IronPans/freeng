import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'free-main-tour',
  templateUrl: './main-tour.component.html',
  styleUrls: ['./main-tour.component.scss']
})
export class MainTourComponent implements OnInit {
  tourVisible: boolean;
  tourData: any;
  constructor() {
  }

  ngOnInit() {
    this.tourData = [
      {
        label: 'This is a first step!'
      },
      {
        label: 'This is a first step!'
      },
      {
        label: 'This is a first step!'
      },
      {
        label: 'This is a first step!'
      }
    ];
  }

}

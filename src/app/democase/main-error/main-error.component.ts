import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'free-main-error',
  templateUrl: './main-error.component.html',
  styleUrls: ['./main-error.component.css']
})
export class MainErrorComponent implements OnInit {
  pageTitle = '404 Page';
  constructor(public location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this.location.back();
  }

}



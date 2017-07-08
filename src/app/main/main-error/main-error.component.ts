import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'free-main-error',
  templateUrl: './main-error.component.html',
  styleUrls: ['./main-error.component.scss']
})
export class MainErrorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this.location.back();
  }

}



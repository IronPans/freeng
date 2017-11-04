import {Component, OnInit, HostBinding} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-progress',
  templateUrl: './main-progress.component.html',
  styleUrls: ['./main-progress.component.css'],
  animations: [fadeInUp]
})
export class MainProgressComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Progress';
  percent: number;

  constructor() {
    this.percent = 20;
  }

  ngOnInit() {
  }

  onClick() {
    const interval = setInterval(() => {
      this.percent = this.percent + Math.floor(Math.random() * 20) + 1;
      if (this.percent >= 100) {
        this.percent = 100;
        clearInterval(interval);
      }
    }, 2000);
  }
}


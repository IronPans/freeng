import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css'],
  animations: [fadeInUp]
})
export class MainTabComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Tab';
  activeState: any;
  tabs: any;
  interval: any;
  constructor() {
    this.tabs = [];
    // this.interval = setInterval(() => {
    //   if (this.tabs.length < 5) {
    //     this.tabs.push({title: this.tabs.length, content: '123' + this.tabs.length});
    //   } else {
    //     clearInterval(this.interval);
    //   }
    // }, 1000)
  }

  ngOnInit() {
  }

  onTabChange(event: any) {
    this.activeState = {
      activeIndex: event.activeIndex
    };
  }
}


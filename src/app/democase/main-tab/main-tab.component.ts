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
  constructor() { }

  ngOnInit() {
  }

  onTabChange(event: any) {
    this.activeState = {
      activeIndex: event.activeIndex
    };
  }
}


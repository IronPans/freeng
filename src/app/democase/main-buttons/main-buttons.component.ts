import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-buttons',
  templateUrl: './main-buttons.component.html',
  styleUrls: ['./main-buttons.component.css'],
  animations: [fadeInUp]
})
export class MainButtonsComponent implements OnInit {

  msg = [];
  num = 0;
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Directives-Button';
  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.msg.push('描述提示框' + (++this.num));
  }

}


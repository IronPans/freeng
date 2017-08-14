import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-shrink',
  templateUrl: './main-shrink.component.html',
  styleUrls: ['./main-shrink.component.css'],
  animations: [fadeInUp]
})
export class MainShrinkComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Shrink';
  menus: any;
  constructor() {
    this.menus = [
      { 'icon': 'weibo'},
      { 'icon': 'weixin'},
      { 'icon': 'qq'},
      { 'icon': 'renren'}
    ];
  }

  ngOnInit() {
  }

}


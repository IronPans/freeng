import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-contextmenu',
  templateUrl: './main-contextmenu.component.html',
  styleUrls: ['./main-contextmenu.component.css'],
  animations: [fadeInUp]
})
export class MainContextmenuComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  menu = [];
  globalMenu = [];
  pageTitle = 'Components-Contextmenu';

  constructor() {
  }

  ngOnInit() {
    this.menu = [
      {label: 'Child', icon: 'user', item: [{label: 'Child'}]},
      {separator: true},
      {label: 'Child', icon: 'user', disabled: true},
      {label: 'Child', icon: 'user', item: [{label: 'Child'}]}
    ];

    this.globalMenu = [
      {label: 'Root', icon: 'user', item: [{label: 'Child',
        item: [{label: 'Child', icon: 'user', back: true}]}]}
    ];
  }

}

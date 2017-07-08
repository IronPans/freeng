import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-contextmenu',
  templateUrl: './main-contextmenu.component.html',
  styleUrls: ['./main-contextmenu.component.scss'],
  animations: [fadeInUp]
})
export class MainContextmenuComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  menu = [];
  globalMenu = [];

  constructor() {
  }

  ngOnInit() {
    this.menu = [
      {label: '子菜单', icon: 'user', item: [{label: '子菜单'}]},
      {separator: true},
      {label: '子菜单', icon: 'user', disabled: true},
      {label: '子菜单', icon: 'user', item: [{label: '子菜单'}]}
    ];

    this.globalMenu = [
      {label: '根菜单', icon: 'user', item: [{label: '子菜单',
        item: [{label: '子菜单', icon: 'user', back: true}]}]}
    ];
  }

}

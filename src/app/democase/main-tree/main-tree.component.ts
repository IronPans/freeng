import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-tree',
  templateUrl: './main-tree.component.html',
  styleUrls: ['./main-tree.component.css'],
  animations: [fadeInUp]
})

export class MainTreeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Tree';
  menus = [];
  constructor() { }

  ngOnInit() {
    this.menus = [
      {
        title: '菜单',
        folder: [
          {
            title: '子菜单',
            file: [
              {
                title: '孙菜单'
              }
            ]
          }
        ]
      },
      {
        title: '菜单',
        file: [
          {
            title: '子菜单'
          }
        ]
      }
    ];
  }

}


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
        title: 'Message',
        folder: [
          {
            title: 'Javascript',
            file: [
              {
                title: 'canvas'
              }
            ]
          }
        ]
      },
      {
        title: 'Css',
        file: [
          {
            title: 'background'
          }
        ]
      }
    ];
  }

}


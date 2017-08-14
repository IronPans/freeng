import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
  animations: [fadeInUp]
})
export class MainTableComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  cells: any[] = [];
  pageTitle = 'Components-Table';
  constructor() {
  }

  ngOnInit() {
    this.cells = [
      {
        'pro': 'theme',
        'intro': '设置Table主题'
      },
      {
        'pro': 'theme',
        'intro': '设置Table主题'
      },
      {
        'pro': 'theme',
        'intro': '设置Table主题'
      }
    ];
  }

}



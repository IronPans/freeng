import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'free-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  animations: [fadeInUp]
})
export class MainTableComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  cells: any[] = [];
  constructor(private title: Title) {
    this.title.setTitle('FreeAngular-Table');
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



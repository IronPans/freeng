import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
  animations: [fadeInUp]
})
export class MainListComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  pageTitle: string;
  constructor() {
    this.pageTitle = 'Component-List-FreeNG';
  }

  ngOnInit() {
  }

}



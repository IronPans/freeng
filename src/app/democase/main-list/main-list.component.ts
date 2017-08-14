import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css'],
  animations: [fadeInUp]
})
export class MainListComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  pageTitle = 'Components-List';
  constructor() {
  }

  ngOnInit() {
  }

}



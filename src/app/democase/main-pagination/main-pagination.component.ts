import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-pagination',
  templateUrl: './main-pagination.component.html',
  styleUrls: ['./main-pagination.component.css'],
  animations: [fadeInUp]
})
export class MainPaginationComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Pagination';
  activeIndex1: number;
  activeIndex2: number;
  constructor() {
    this.activeIndex1 = 1;
    this.activeIndex2 = 1;
  }

  ngOnInit() {
  }
  onChange1(event: object) {
    this.activeIndex1 = event['activeIndex'];
  }
  onChange2(event: object) {
    this.activeIndex2 = event['activeIndex'];
  }

}


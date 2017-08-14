import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-range',
  templateUrl: './main-range.component.html',
  styleUrls: ['./main-range.component.css'],
  animations: [fadeInUp]
})
export class MainRangeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Range';
  constructor() { }

  ngOnInit() {
  }

}


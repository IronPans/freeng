import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css'],
  animations: [fadeInUp]
})
export class MainCalendarComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  birthday: string;
  minDate: string;
  defaultDate: string;
  maxDate: string;
  pageTitle = 'Components-Calendar';
  constructor() {
    this.birthday = '2016-5-31';
    this.defaultDate = '2015/10/11';
  }

  ngOnInit() {
  }

}


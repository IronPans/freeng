
import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css'],
  animations: [fadeInUp]
})
export class MainCardComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Card';
  constructor() { }

  ngOnInit() {
  }

}


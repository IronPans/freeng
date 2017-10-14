import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-knob',
  templateUrl: './main-knob.component.html',
  styleUrls: ['./main-knob.component.css'],
  animations: [fadeInUp]
})
export class MainKnobComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  percent: number;
  pageTitle = 'Components-Knob';
  constructor() {
    this.percent = 80;
  }

  ngOnInit() {
  }

}


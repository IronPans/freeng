import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import { config } from '../../common/config';

@Component({
  selector: 'free-main-checkbox',
  templateUrl: './main-checkbox.component.html',
  styleUrls: ['./main-checkbox.component.scss'],
  animations: [fadeInUp]
})
export class MainCheckboxComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  theme = [];
  constructor() { }

  ngOnInit() {
    this.theme = config.theme;
  }

}


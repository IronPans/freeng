import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';
import { config } from '../common/config';

@Component({
  selector: 'free-main-checkbox',
  templateUrl: './main-checkbox.component.html',
  styleUrls: ['./main-checkbox.component.css'],
  animations: [fadeInUp]
})
export class MainCheckboxComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  theme = [];
  pageTitle = 'Components-Checkbox';
  selectedCity: any[];
  checked: any;
  binaryChecked: boolean;
  constructor() {
    this.selectedCity = ['guangdong'];
    this.binaryChecked = false;
  }

  ngOnInit() {
    this.theme = config.theme;
  }
}


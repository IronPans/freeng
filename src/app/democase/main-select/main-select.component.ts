import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-select',
  templateUrl: './main-select.component.html',
  styleUrls: ['./main-select.component.css'],
  animations: [fadeInUp]
})
export class MainSelectComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Select';
  options: any;
  selectedOption: any;
  fruit: any;
  selectedFruit: any;
  multipleSelectd: any[];
  filterSelected: any;
  constructor() { }

  ngOnInit() {
    this.options = [
      { label: 'guangdong', value: 'gd'},
      { label: 'beijing', value: 'bj'},
      { label: 'shanghai', value: 'sh'},
      { label: 'nanjing', value: 'nj'},
      { label: 'yunnan', value: 'yn'}
    ];
    this.fruit = [
      { label: 'apple', value: 'apple'},
      { label: 'orange', value: 'orange'},
      { label: 'banana', value: 'banana'}
    ];
    this.selectedFruit = this.fruit[2];
  }

  onChange(event: any): void {
  }

}


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
      { label: '广东', value: 'gd'},
      { label: '北京', value: 'bj'},
      { label: '上海', value: 'sh'},
      { label: '南京', value: 'nj'},
      { label: '云南', value: 'yn'}
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


import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-chip',
  templateUrl: './main-chip.component.html',
  styleUrls: ['./main-chip.component.scss'],
  animations: [fadeInUp]
})
export class MainChipComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  animals: any[];
  city: any[];
  fruit: any[];
  constructor() { }

  ngOnInit() {
    this.animals = [
      {'value': 'dog'},
      {'value': 'cat'},
      {'value': 'wolf'},
      {'value': 'fish'}
    ];

    this.fruit = [
      {'value': 'apple'},
      {'value': 'banana', 'delete': true},
      {'value': 'orange', 'delete': true}
    ];

    this.city = [
      {'value': 'beijing'},
      {'value': 'guangzhou', 'delete': true},
      {'value': 'shanghai', 'delete': true},
      {'value': 'hunan', 'delete': true},
    ];
  }
}


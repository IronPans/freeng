import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-steps',
  templateUrl: './main-steps.component.html',
  styleUrls: ['./main-steps.component.scss'],
  animations: [fadeInUp]
})
export class MainStepsComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  items: any;
  steps: any;
  activeIndex: number;
  wiredIndex: number;
  stepIndex: number;
  constructor() {
    this.activeIndex = 0;
    this.wiredIndex = 0;
    this.stepIndex = 0;
    this.items = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3'}
    ];
    this.steps = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3', click: (data) => {
        alert(data.activeIndex);
      }}
    ];
  }

  ngOnInit() {
  }

  toStep(add: number) {
    this.activeIndex += add;
    if (this.activeIndex >= this.items.length) {
      this.activeIndex = this.items.length - 1;
    }
  }

  toClickStep(add: number) {
    console.log(this.stepIndex);
    this.stepIndex += add;
    if (this.stepIndex >= this.items.length) {
      this.stepIndex = this.items.length - 1;
    }
  }

  toWiredStep(add: number) {
    this.wiredIndex += add;
    if (this.wiredIndex >= this.items.length) {
      this.wiredIndex = this.items.length - 1;
    }
  }
}

import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-ripple',
  templateUrl: './main-ripple.component.html',
  styleUrls: ['./main-ripple.component.css'],
  animations: [fadeInUp]
})
export class MainRippleComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'UI Element-Ripple';
  constructor() { }

  ngOnInit() {
  }

}

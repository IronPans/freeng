import { Component, OnInit, HostBinding } from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-column',
  templateUrl: './main-column.component.html',
  styleUrls: ['./main-column.component.scss'],
  animations: [fadeInUp]
})
export class MainColumnComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'UI Element-Column';
  constructor() { }

  ngOnInit() {
  }

}

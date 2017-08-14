import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-shadow',
  templateUrl: './main-shadow.component.html',
  styleUrls: ['./main-shadow.component.css'],
  animations: [fadeInUp]
})
export class MainShadowComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'UI Element-Shadow';
  constructor() { }

  ngOnInit() {
  }

}



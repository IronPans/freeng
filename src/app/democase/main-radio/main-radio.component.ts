import {Component, OnInit, HostBinding, OnDestroy} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-radio',
  templateUrl: './main-radio.component.html',
  styleUrls: ['./main-radio.component.css'],
  animations: [fadeInUp]
})
export class MainRadioComponent implements OnInit, OnDestroy {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Radio';
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

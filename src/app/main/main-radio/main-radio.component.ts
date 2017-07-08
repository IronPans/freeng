import {Component, OnInit, HostBinding, OnDestroy} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-radio',
  templateUrl: './main-radio.component.html',
  styleUrls: ['./main-radio.component.scss'],
  animations: [fadeInUp]
})
export class MainRadioComponent implements OnInit, OnDestroy {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  abc = 'none';
  constructor() { }

  ngOnInit() {
    console.log(1);
  }

  ngOnDestroy() {
    console.log(2);
  }

}

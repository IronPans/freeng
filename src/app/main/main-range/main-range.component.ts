import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-range',
  templateUrl: './main-range.component.html',
  styleUrls: ['./main-range.component.scss'],
  animations: [fadeInUp]
})
export class MainRangeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}


import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-tooltip',
  templateUrl: './main-tooltip.component.html',
  styleUrls: ['./main-tooltip.component.scss'],
  animations: [fadeInUp]
})
export class MainTooltipComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }
}



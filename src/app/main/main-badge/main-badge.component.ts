import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-badge',
  templateUrl: './main-badge.component.html',
  styleUrls: ['./main-badge.component.scss'],
  animations: [fadeInUp]
})
export class MainBadgeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}


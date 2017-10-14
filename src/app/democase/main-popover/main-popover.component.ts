import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-popover',
  templateUrl: './main-popover.component.html',
  styleUrls: ['./main-popover.component.scss'],
  animations: [fadeInUp]
})
export class MainPopoverComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}

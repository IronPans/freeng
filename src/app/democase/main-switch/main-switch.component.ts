import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-switch',
  templateUrl: './main-switch.component.html',
  styleUrls: ['./main-switch.component.css'],
  animations: [fadeInUp]
})
export class MainSwitchComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  checked: boolean;
  pageTitle = 'Components-Switch';
  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    alert('是否选中：' + event.checked);
  }

}


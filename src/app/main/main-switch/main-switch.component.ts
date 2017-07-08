import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-switch',
  templateUrl: './main-switch.component.html',
  styleUrls: ['./main-switch.component.scss'],
  animations: [fadeInUp]
})
export class MainSwitchComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    alert('是否选中：' + event.target.checked);
  }

}


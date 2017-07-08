import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-icon',
  templateUrl: './main-icon.component.html',
  styleUrls: ['./main-icon.component.scss'],
  animations: [fadeInUp]
})
export class MainIconComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}


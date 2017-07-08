import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-shadow',
  templateUrl: './main-shadow.component.html',
  styleUrls: ['./main-shadow.component.scss'],
  animations: [fadeInUp]
})
export class MainShadowComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}



import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-loading',
  templateUrl: './main-loading.component.html',
  styleUrls: ['./main-loading.component.scss'],
  animations: [fadeInUp]
})
export class MainLoadingComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}



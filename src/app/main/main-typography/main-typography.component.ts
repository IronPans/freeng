import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-typography',
  templateUrl: './main-typography.component.html',
  styleUrls: ['./main-typography.component.scss'],
  animations: [fadeInUp]
})
export class MainTypographyComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}


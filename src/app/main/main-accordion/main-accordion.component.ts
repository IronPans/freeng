import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';

@Component({
  selector: 'free-main-accordion',
  templateUrl: './main-accordion.component.html',
  styleUrls: ['./main-accordion.component.scss'],
  animations: [fadeInUp]
})
export class MainAccordionComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}


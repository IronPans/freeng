import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-accordion',
  templateUrl: './main-accordion.component.html',
  styleUrls: ['./main-accordion.component.css'],
  animations: [fadeInUp]
})
export class MainAccordionComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Accordion'
  constructor() { }

  ngOnInit() {
  }

}


import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-progress',
  templateUrl: './main-progress.component.html',
  styleUrls: ['./main-progress.component.css'],
  animations: [fadeInUp]
})
export class MainProgressComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Progress';
  constructor() { }

  ngOnInit() {
  }

}


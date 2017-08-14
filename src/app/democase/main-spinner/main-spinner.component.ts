import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-spinner',
  templateUrl: './main-spinner.component.html',
  styleUrls: ['./main-spinner.component.css'],
  animations: [fadeInUp]
})
export class MainSpinnerComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Spinner';
  constructor() { }

  ngOnInit() {
  }

}


import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-loading',
  templateUrl: './main-loading.component.html',
  styleUrls: ['./main-loading.component.css'],
  animations: [fadeInUp]
})
export class MainLoadingComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Loading';
  constructor() { }

  ngOnInit() {
  }

}



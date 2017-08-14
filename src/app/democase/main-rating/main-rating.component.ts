import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-rating',
  templateUrl: './main-rating.component.html',
  styleUrls: ['./main-rating.component.css'],
  animations: [fadeInUp]
})
export class MainRatingComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Rating';
  constructor() { }

  ngOnInit() {
  }

  ratingChange(value: number) {
    alert(value);
  }
}


import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-timeline',
  templateUrl: './main-timeline.component.html',
  styleUrls: ['./main-timeline.component.css'],
  animations: [fadeInUp]
})
export class MainTimelineComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Timeline';
  images = [];
  constructor() { }

  ngOnInit() {
    this.images = [
      {'src': 'freeng/assets/images/landscape1.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape2.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape3.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape7.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape8.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape11.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape16.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape17.jpg', 'alt': 'image', 'highlight': true},
      {'src': 'freeng/assets/images/landscape18.jpg', 'alt': 'image', 'highlight': true}
    ];
  }

}

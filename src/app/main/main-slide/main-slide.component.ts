import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-slide',
  templateUrl: './main-slide.component.html',
  styleUrls: ['./main-slide.component.scss'],
  animations: [fadeInUp]
})
export class MainSlideComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}


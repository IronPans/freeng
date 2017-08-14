import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.css'],
  animations: [fadeInUp]
})
export class MainImageComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Image';
  constructor() { }

  ngOnInit() {
  }

}


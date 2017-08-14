import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-icon',
  templateUrl: './main-icon.component.html',
  styleUrls: ['./main-icon.component.css'],
  animations: [fadeInUp]
})
export class MainIconComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Icon';
  constructor() { }

  ngOnInit() {
  }

}


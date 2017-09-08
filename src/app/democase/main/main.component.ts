import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';
import {config} from '../common/config';

@Component({
  selector: 'free-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeInUp]
})
export class MainComponent {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  version: string;
  pageTitle = 'HomePage';
  constructor() {
    this.version = config.version;
  }
}


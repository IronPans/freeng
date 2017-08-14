import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-changelog',
  templateUrl: './main-changelog.component.html',
  styleUrls: ['./main-changelog.component.css'],
  animations: [fadeInUp]
})
export class MainChangelogComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Changelog';
  constructor() { }

  ngOnInit() {
  }
}


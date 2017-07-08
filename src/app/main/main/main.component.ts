import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {config} from '../../common/config';

@Component({
  selector: 'free-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeInUp]
})
export class MainComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  version: string;
  constructor() {
    this.version = config.version;
  }

  ngOnInit() {
  }
}


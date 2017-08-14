import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-scroll',
  templateUrl: './main-scroll.component.html',
  styleUrls: ['./main-scroll.component.css'],
  animations: [fadeInUp]
})
export class MainScrollComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Scroll';
  constructor() { }

  ngOnInit() {
  }

}



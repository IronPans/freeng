import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
  animations: [fadeInUp]
})
export class MainGridComponent implements OnInit {

  @HostBinding('@fadeInUpState') state;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}



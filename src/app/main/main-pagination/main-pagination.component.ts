import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-pagination',
  templateUrl: './main-pagination.component.html',
  styleUrls: ['./main-pagination.component.scss'],
  animations: [fadeInUp]
})
export class MainPaginationComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}


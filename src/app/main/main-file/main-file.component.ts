import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-file',
  templateUrl: './main-file.component.html',
  styleUrls: ['./main-file.component.scss'],
  animations: [fadeInUp]
})
export class MainFileComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}


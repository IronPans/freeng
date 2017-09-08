import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.scss'],
  animations: [fadeInUp]
})
export class MainSidenavComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  leftSidenav: boolean;
  rightSidenav: boolean;
  topSidenav: boolean;
  bottomSidenav: boolean;
  contentVisible: boolean;
  contentRightVisible: boolean;
  contentTopVisible: boolean;
  contentBottomVisible: boolean;
  overlay: boolean;
  constructor() { }

  ngOnInit() {
  }

}

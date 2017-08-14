import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-breadcrumb',
  templateUrl: './main-breadcrumb.component.html',
  styleUrls: ['./main-breadcrumb.component.css'],
  animations: [fadeInUp]
})
export class MainBreadcrumbComponent implements OnInit {

  menus: any;
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Breadcrumb';
  constructor() { }

  ngOnInit() {
    this.menus = [
      {'name': '首页'},
      {'name': '面包屑'},
      {'name': '面包屑'}
    ];
  }

}


import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-dropdown',
  templateUrl: './main-dropdown.component.html',
  styleUrls: ['./main-dropdown.component.css'],
  animations: [fadeInUp]
})
export class MainDropdownComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Dropdown';
  menus = [];

  constructor() { }

  ngOnInit() {
    this.menus = [{
      'name': 'TGCode',
      'icon': 'user'
    }, {
      'name': 'Email',
      'icon': 'envelope'
    }, {
      'name': 'Help',
      'icon': 'question-circle'
    }, {
      'name': 'Setting',
      'icon': 'cog'
    }, {
      'name': 'Logout',
      'icon': 'sign-out'
    }];
  }

}


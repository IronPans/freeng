import {Component, OnInit, HostBinding, Renderer2 } from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import { config } from '../../common/config';

@Component({
  selector: 'free-main-color',
  templateUrl: './main-color.component.html',
  styleUrls: ['./main-color.component.scss'],
  animations: [fadeInUp]
})
export class MainColorComponent implements OnInit {

  @HostBinding('@fadeInUpState') state;
  @HostBinding('style.display') display = 'block';
  theme = [];
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.theme = config.theme;
  }

  selectTheme(value: string) {
    const className = document.body.className;
    const theme = /free-type-2/.test(className);
    document.body.className = theme ? 'free-type-2' : '';
    this.renderer2.addClass(document.body, `free-${value}`);
  }

}


import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-colorpicker',
  templateUrl: './main-colorpicker.component.html',
  styleUrls: ['./main-colorpicker.component.css'],
  animations: [fadeInUp]
})
export class MainColorpickerComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  color: string;
  defaultColor: string;
  pageTitle = 'Components-Colorpicker';
  constructor() {
    this.color = 'rgb(110, 11, 248)';
  }

  ngOnInit() {
  }

  onColorSelect(event: any) {
    console.log(event);
  }

}

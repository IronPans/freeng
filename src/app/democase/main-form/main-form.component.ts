import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  animations: [fadeInUp]
})
export class MainFormComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  value: string;
  pageTitle = 'Components-Inputtext';
  constructor() { }

  ngOnInit() {
  }

}


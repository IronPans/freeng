import {Component, OnInit, HostBinding} from '@angular/core';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.css'],
  animations: [fadeInUp]
})
export class MainModalComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Modal';
  visible: boolean;
  blueVisible: boolean;
  confirmVisible: boolean;
  alertVisible: boolean;
  delayLoading: boolean;

  promptVisible: boolean;
  Loading: boolean;
  constructor() { }

  ngOnInit() {
  }

  open() {
    this.visible = !this.visible;
  }
}



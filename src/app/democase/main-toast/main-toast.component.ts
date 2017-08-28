import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-toast',
  templateUrl: './main-toast.component.html',
  styleUrls: ['./main-toast.component.css'],
  animations: [fadeInUp]
})
export class MainToastComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Toast';
  messages: any[];
  errors: any[];
  warnigs: any[];
  infos: any[];
  successes: any[];
  delayMessages: any[];
  constructor() {
    this.messages = [];
    this.errors = [];
    this.warnigs = [];
    this.infos = [];
    this.successes = [];
    this.delayMessages = [];
  }

  ngOnInit() {
  }

  open() {
    this.messages.push({
      content: 'Tip: This is a toast!'
    });
  }

  openErrorMessage() {
    this.errors.push({
      content: 'Tip: This is a error toast!'
    })
  }

  openWarningMessage() {
    this.warnigs.push({
      content: 'Tip: This is a warning toast!'
    })
  }

  openInfoMessage() {
    this.infos.push({
      content: 'Tip: This is a info toast!'
    })
  }

  openSuccessMessage() {
    this.successes.push({
      content: 'Tip: This is a error toast!'
    })
  }

  openCustomDelay() {
    this.delayMessages.push({
      content: 'Tip: This will hide after 5s!'
    })
  }
}


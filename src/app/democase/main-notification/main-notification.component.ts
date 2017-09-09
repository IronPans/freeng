import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-notification',
  templateUrl: './main-notification.component.html',
  styleUrls: ['./main-notification.component.css'],
  animations: [fadeInUp]
})
export class MainNotificationComponent implements OnInit, AfterViewInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle = 'Components-Notification';
  messages: any[];
  toolMessages: any[];
  avatarMessages: any[];
  delayMessages: any[];
  directions: any[];
  direction: string;
  errors: any[];
  warnigs: any[];
  infos: any[];
  successes: any[];
  constructor() {
    this.messages = [];
    this.toolMessages = [];
    this.avatarMessages = [];
    this.directions = [{
      label: 'topLeft',
      value: 'topLeft'
    }, {
      label: 'topRight',
      value: 'topRight'
    }, {
      label: 'bottomLeft',
      value: 'bottomLeft'
    }, {
      label: 'bottomRight',
      value: 'bottomRight'
    }];
    this.direction = this.directions[1];
    this.errors = [];
    this.warnigs = [];
    this.infos = [];
    this.successes = [];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.delayMessages = [{
      title: 'Notification',
      content: 'Your account has not been verified by email!' + new Date()
    }];
  }

  open() {
    this.messages.push({
      title: 'Notification',
      content: 'Your account has not been verified by email!'
    });
  }

  openToolMessage() {
    this.toolMessages.push({
      title: 'Notification',
      content: 'Your account has not been verified by email!'
    });
  }

  openAvatarMessage() {
    this.avatarMessages.push({
      title: 'Notification',
      content: 'Your account has not been verified by email!' + new Date(),
      avatar: 'freeng/assets/images/t_me.png'
    });
  }

  openDelayMessage() {
    this.delayMessages.push({
      title: 'Notification',
      content: 'Your account has not been verified by email!' + new Date()
    })
  }

  openErrorMessage() {
    this.errors.push({
      title: 'Notification',
      content: 'Tip: This is error notification'
    })
  }

  openWarningMessage() {
    this.warnigs.push({
      title: 'Notification',
      content: 'Tip: This is warning notification'
    })
  }

  openInfoMessage() {
    this.infos.push({
      title: 'Notification',
      content: 'Tip: This is info notification'
    })
  }

  openSuccessMessage() {
    this.successes.push({
      title: 'Notification',
      content: 'Tip: This is success notification'
    })
  }

}

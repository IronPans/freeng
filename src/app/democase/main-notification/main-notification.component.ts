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
      title: '通知',
      content: '你的帐号未经过邮箱验证！' + new Date()
    }];
  }

  open() {
    this.messages.push({
      title: '通知',
      content: '你的帐号未经过邮箱验证！'
    });
  }

  openToolMessage() {
    this.toolMessages.push({
      title: '通知',
      content: '你的帐号未经过邮箱验证！'
    });
  }

  openAvatarMessage() {
    this.avatarMessages.push({
      title: '通知',
      content: '你的帐号未经过邮箱验证！' + new Date(),
      avatar: 'assets/images/t_me.png'
    });
  }

  openDelayMessage() {
    this.delayMessages.push({
      title: '通知',
      content: '你的帐号未经过邮箱验证！' + new Date()
    })
  }

  openErrorMessage() {
    this.errors.push({
      title: '通知',
      content: '温馨提示：这是错误消息通知框！'
    })
  }

  openWarningMessage() {
    this.warnigs.push({
      title: '通知',
      content: '温馨提示：这是警告消息通知框！'
    })
  }

  openInfoMessage() {
    this.infos.push({
      title: '通知',
      content: '温馨提示：这是信息消息通知框！'
    })
  }

  openSuccessMessage() {
    this.successes.push({
      title: '通知',
      content: '温馨提示：这是成功消息通知框！'
    })
  }

}

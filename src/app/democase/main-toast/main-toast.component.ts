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
      content: '温馨提示：这是FreeNG框架'
    });
  }

  openErrorMessage() {
    this.errors.push({
      content: '温馨提示：这是错误提示框！'
    })
  }

  openWarningMessage() {
    this.warnigs.push({
      content: '温馨提示：这是警告提示框！'
    })
  }

  openInfoMessage() {
    this.infos.push({
      content: '温馨提示：这是信息提示框！'
    })
  }

  openSuccessMessage() {
    this.successes.push({
      content: '温馨提示：这是成功提示框！'
    })
  }

  openCustomDelay() {
    this.delayMessages.push({
      content: '温馨提示：当前提示框在5000ms后隐藏！'
    })
  }
}


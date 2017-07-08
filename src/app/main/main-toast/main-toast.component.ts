import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../../component/common/animations';
import {ToastController} from '../../component/toast/toast.controller';

@Component({
  selector: 'free-main-toast',
  templateUrl: './main-toast.component.html',
  styleUrls: ['./main-toast.component.scss'],
  animations: [fadeInUp]
})
export class MainToastComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  open() {
    this.toastCtrl.create({
      message: '警告！警告！'
    });
  }
}


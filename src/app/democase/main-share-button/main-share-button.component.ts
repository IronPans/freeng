import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-share-button',
  templateUrl: './main-share-button.component.html',
  styleUrls: ['./main-share-button.component.scss'],
  animations: [fadeInUp]
})
export class MainShareButtonComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  shareData: any;
  constructor() {
    this.shareData = {
      title: 'FreeNG: UI Components for Angular4',
      description: 'FreeNG - 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣，facebook，twitter，google，linkedIn',
      image: 'http://oumfrpm5j.bkt.clouddn.com/freeng_logo.png'
    }
  }

  ngOnInit() {
  }

}

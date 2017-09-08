import {Component, EventEmitter, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareArgs} from './share-button.provider';
import {ShareLinks} from './share-links';

@Component({
  selector: 'free-share-button, [fShareButton]',
  template: `
    <div class="free-share-button">
      <ng-template ngFor [ngForOf]="shareButtons" let-btn>
        <button *ngIf="!isDisabled(btn.type)" class="btn btn-default free-share-{{btn.type}}"
                (click)="onShare($event, btn)">
          <i class="fa fa-{{getIconName(btn.type)}}" *ngIf="!btn.template; else temp"></i>
          <ng-template #temp>
            <span [innerHTML]="btn.template"></span>
          </ng-template>
        </button>
      </ng-template>
    </div>
  `
})
export class ShareButtonComponent {
  @Input() shareButtons: any[];
  @Input() shareDisabled: any[];
  @Input() windowAttr: any;
  @Input() shareData: any;
  @Input() onClose: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.shareDisabled = [];
    this.shareButtons = [{
      type: 'qq'
    }, {
      type: 'qzone'
    }, {
      type: 'tencent'
    }, {
      type: 'weibo'
    }, {
      type: 'douban'
    }, {
      type: 'diandian'
    }, {
      type: 'facebook'
    }, {
      type: 'twitter'
    }, {
      type: 'linkedIn'
    }, {
      type: 'google'
    }];
    this.windowAttr = {width: 500, height: 400};
    this.shareData = {url: ''};
  }

  onShare(event: any, type: string) {
    const shareUrl = this.getShareUrl(type);
    this.share(shareUrl, type);
  }

  isDisabled(type: string) {
    return this.shareDisabled.indexOf(type) !== -1;
  }

  getIconName(type: string) {
    let icon = '';
    switch (type) {
      case 'qq':
        icon = 'qq';
        break;
      case 'qzone':
        icon = 'gittip';
        break;
      case 'tencent':
        icon = 'tencent-weibo';
        break;
      case 'weibo':
        icon = 'weibo';
        break;
      case 'douban':
        icon = 'douban';
        break;
      case 'diandian':
        icon = 'diandian';
        break;
      case 'facebook':
        icon = 'facebook';
        break;
      case 'twitter':
        icon = 'twitter';
        break;
      case 'linkedIn':
        icon = 'linkedin';
        break;
      case 'google':
        icon = 'google';
        break;
      default:
        return '';
    }
    return icon;
  }

  getShareData(data) {
    const getContent = (selector) => {
      const elem = document.querySelector(selector);
      return elem ? elem.getAttribute('content') : '';
    };
    if (!data) {
      data = this.shareData;
    }
    if (!data.url) {
      data.url = this.shareData.url;
    }
    data.url = this.formatUrl(data.url);
    if (!data.title) {
      data.title = getContent('[name=title], [name=Title]') || document.title;
    }
    if (!data.description) {
      data.description = getContent('[name=description], [name=Description]') || document.title;
    }
    if (!data.source) {
      data.source = getContent('[name=site], [name=Site]');
    }
    if (!data.image) {
      data.image = document.images[0] ? document.images[0].src : '';
    }
    return data;
  }

  getShareUrl(btn: any) {
    const args = new ShareArgs(this.getShareData(btn.data));
    let shareUrl = '';
    switch (btn.type) {
      case 'qq':
        shareUrl = ShareLinks.qqShare(args);
        break;
      case 'qzone':
        shareUrl = ShareLinks.qzoneShare(args);
        break;
      case 'tencent':
        shareUrl = ShareLinks.tencentShare(args);
        break;
      case 'weibo':
        shareUrl = ShareLinks.weiboShare(args);
        break;
      case 'douban':
        shareUrl = ShareLinks.doubanShare(args);
        break;
      case 'diandian':
        shareUrl = ShareLinks.diandianShare(args);
        break;
      case 'facebook':
        shareUrl = ShareLinks.fbShare(args);
        break;
      case 'twitter':
        shareUrl = ShareLinks.twitterShare(args);
        break;
      case 'linkedIn':
        shareUrl = ShareLinks.linkedInShare(args);
        break;
      case 'google':
        shareUrl = ShareLinks.googleShare(args);
        break;
      default:
        return '';
    }
    return shareUrl;
  }

  share(url, type: string) {
    const popUp = window.open(url, 'newwindow', this.getWindowAttr());

    if (window && popUp) {
      const pollTimer = window.setInterval(() => {
        if (popUp.closed) {
          this.onClose.emit({
            type: type
          });
          window.clearInterval(pollTimer);
        }
      }, 200);
    }
  }

  formatUrl(url: string) {
    if (url) {
      const r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

      if (r.test(url)) {
        return encodeURIComponent(url);
      } else {
        console.warn('[ShareButtons]: Invalid URL');
      }
    }
    return encodeURIComponent(window.location.href);
  }

  getWindowAttr() {
    const windowAttr = [];
    for (const attr in this.windowAttr) {
      if (this.windowAttr.hasOwnProperty(attr)) {
        windowAttr.push(`${attr}=${this.windowAttr[attr]}`);
      }
    }
    return windowAttr.join(',');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ShareButtonComponent],
  exports: [ShareButtonComponent]
})
export class ShareButtonModule {
}

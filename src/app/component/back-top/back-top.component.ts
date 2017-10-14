import {Component, Inject, Input, NgModule, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'free-back-top',
  template: `
    <div class="free-back-top" (click)="onScrollTop($event)" [@enterLeave] *ngIf="visible">
      <ng-content></ng-content>
    </div>
  `,
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BackTopComponent implements OnInit, OnDestroy {
  @Input() get target() {
    return this._target;
  }
  set target(el: HTMLElement) {
    if (el) {
      this._target = el;
      this.scrollTop = this._target.scrollHeight;
    }
  }
  @Input() visibleHeight: number;
  _target: any;
  visible: boolean;
  scrollTop: number;
  duration: number;
  elementScrollListener: any;
  constructor(public renderer2: Renderer2, @Inject(DOCUMENT) private doc: Document) {
    this.visibleHeight = 10;
    this.duration = 300;
  }

  ngOnInit() {
    if (this._target) {
      this.elementScrollListener = this.renderer2.listen(this._target, 'scroll', (event) => {
        if (this._target.scrollTop >= this.visibleHeight) {
          this.visible = true;
        } else {
          this.visible = false;
        }
      });
    }
  }

  onScrollTop(event: any) {
    if (this._target) {
      this.scrollToTop(this._target, this.duration);
    }
  }

  scrollToTop(element, duration) {
    let last = +new Date();
    let top = 0;
    let fading;
    const tick = () => {
      top = this.getScroll(element) - (new Date().getTime() - last) / duration;
      this.setScrollTop(element, top);
      last = +new Date();

      if (+top > 0) {
        fading = setTimeout(tick, 16);
      }
    };

    tick();
  }

  setScrollTop(el: Element | Window, topValue: number = 0) {
    if (el === window) {
      this.doc.body.scrollTop = topValue;
      this.doc.documentElement.scrollTop = topValue;
    } else {
      (el as Element).scrollTop = topValue;
    }
  }

  getScroll(el?: Element | Window, top: boolean = true): number {
    if (!el) {
      el = window;
    }
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = el === window;
    let ret = isWindow ? el[prop] : el[method];
    if (isWindow && typeof ret !== 'number') {
      ret = this.doc.documentElement[method];
    }

    return ret;
  }

  ngOnDestroy() {
    if (this.elementScrollListener) {
      this.elementScrollListener();
      this.elementScrollListener = null;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [BackTopComponent],
  exports: [BackTopComponent]
})
export class BackTopModule {}

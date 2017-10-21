import {Component, Inject, Input, NgModule, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'free-back-top',
  template: `
    <div [ngClass]="styleClass" (click)="onScrollTop()" [@enterLeave] *ngIf="visible">
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
  @Input() styleClass: any;
  _target: any;
  visible: boolean;
  scrollTop: number;
  elementScrollListener: any;
  destination: number;
  duration: number;
  easing: string;
  constructor(public renderer2: Renderer2,
              @Inject(DOCUMENT) private doc: Document) {
    this.visibleHeight = 10;
    this.duration = 200;
    this.destination = 0;
    this.easing = 'linear';
    this.styleClass = {};
  }

  ngOnInit() {
    if (this._target) {
      this.elementScrollListener = this.renderer2.listen(this._target, 'scroll', () => {
        this.visible = this._target.scrollTop >= this.visibleHeight;
      });
      this.styleClass['free-back-top'] = true;
    }
  }

  onScrollTop() {
    if (this._target) {
      this.scrollToTop(this._target, this.duration);
    }
  }

  scrollToTop(element, duration) {
    const last = +new Date();
    let fading;
    let top = this.getScroll(element);
    const tick = () => {
      const now = Date.now();
      const time = Math.min(1, (now - last) / duration);
      const timeFunction = this.getEasing()[this.easing](time);
      top = timeFunction * (this.destination - top) + top;
      this.setScrollTop(element, top);
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

  getEasing() {
    return {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return --t * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - --t * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
    };
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

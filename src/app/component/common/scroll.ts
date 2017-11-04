import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class ScrollRenderer{
  constructor(@Inject(DOCUMENT) private doc: Document) {
  }

  scrollToTop(element, duration, easing, destination) {
    const last = +new Date();
    let fading;
    let top = this.getScroll(element);
    const tick = () => {
      const now = Date.now();
      const time = Math.min(1, (now - last) / duration);
      const timeFunction = this.getEasing()[easing](time);
      top = timeFunction * (destination - top) + top;
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
}

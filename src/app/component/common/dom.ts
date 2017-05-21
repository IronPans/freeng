/**
 * Created by root on 17-5-12.
 */
import {Injectable, Renderer2} from '@angular/core';

@Injectable()
export class DomRenderer {

  constructor(private renderer2: Renderer2) {}

  public addClass(dom, className): void {
    const classes = className.split(/\s+/);
    for (const cName of classes) {
      this.renderer2.addClass(dom, cName);
    }
  }

  public removeClass(dom, className): void {
    const classes = className.split(/\s+/);
    for (const cName of classes) {
      this.renderer2.removeClass(dom, cName);
    }
  }

  public addPrefix(element, attr, value): void {
    const prefix = ['webkit', 'moz', 'o', 'ms'];
    let uattr = attr.split('');
    uattr[0] = uattr[0].toUpperCase();
    uattr = uattr.join('');
    prefix.forEach(function(x) {
      element.style[x + uattr] = value;
    });
    element.style[attr] = value;
  }

  public toggleFullScreen(elem: any = document.documentElement): void {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docElm = elem;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      };
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    };
  };

  public getStyle(dom, attr) {
    return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, 'false')[attr];
  }

  public getRandom(max, min): number {
    min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public getWebType(): string {
    const type = ['webkit', 'moz', 'o', 'ms'];
    let cur = '';
    type.forEach(function(t) {
      const mo = t + 'Transform';
      if (mo in document.createElement('div').style) {
        cur = t;
      }
    });
    return cur;
  }

  public getRect(dom): any {
    return dom.getBoundingClientRect();
  }

  public fadeIn(element, duration: number): void {
    element.style.opacity = 0;

    let last = +new Date();
    let opacity = 0;
    const tick = function () {
      opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();

      if (+opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  }

  public fadeOut(element, ms) {
    let opacity = 1;
    const interval = 50,
      duration = ms,
      gap = interval / duration;

    const fading = setInterval(() => {
      opacity = opacity - gap;

      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fading);
      }

      element.style.opacity = opacity;
    }, interval);
  }

  public css(dom, style): void {
    for (const s in style) {
      dom.style[s] = style[s];
    }
  }

  public animationEnd(elem, handler): void {
    elem.addEventListener('animationend', handler, false);
    elem.addEventListener('webkitAnimationEnd', handler, false);
    elem.addEventListener('mozAnimationEnd', handler, false);
    elem.addEventListener('OAnimationEnd', handler, false);
  }

  public setTransform(element, animation): void {
    element.style.webkitTransform = animation;
    element.style.mozTransform = animation;
    element.style.oTransform = animation;
    element.style.msTransform = animation;
    element.style.transform = animation;
  }

  public setTransitionDuration(element, times): void {
    element.style.webkitTransitionDuration = times + 'ms';
    element.style.mozTransitionDuration = times + 'ms';
    element.style.oTransitionDuration = times + 'ms';
    element.style.transitionDuration = times + 'ms';
  }

  public transitionEnd(elem, handler): void {
    elem.addEventListener('transitionend', handler, false);
    elem.addEventListener('webkitTransitionEnd', handler, false);
    elem.addEventListener('mozTransitionEnd', handler, false);
    elem.addEventListener('oTransitionEnd', handler, false);
  }

  public deleteTransitionEnd(elem, handler): void {
    elem.removeEventListener('transitionend', handler, false);
    elem.removeEventListener('webkitTransitionEnd', handler, false);
    elem.removeEventListener('mozTransitionEnd', handler, false);
    elem.removeEventListener('oTransitionEnd', handler, false);
  }

  public checkPlatform(): any {
    let userAngent = '', isMobile = false;
    const mobile = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/;
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
      (mobile.test(navigator.userAgent))) {
      try {
        if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          userAngent = 'mobile';
        } else if (/iPad/i.test(navigator.userAgent)) {
          userAngent = 'ipad';
        }
        isMobile = true;
      } catch (e) {}
    } else {
      isMobile = false;
      userAngent = 'window';
    };

    return {
      platform: userAngent,
      isMobile: isMobile
    };
  }

}

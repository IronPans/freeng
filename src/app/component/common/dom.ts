import {Injectable, Renderer2} from '@angular/core';

@Injectable()
export class DomRenderer {

  public static REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
  public static zIndex = 9990;

  constructor(public renderer2: Renderer2) {
  }

  public addClass(elem, className): void {
    const classes = className.split(/\s+/);
    for (const cName of classes) {
      this.renderer2.addClass(elem, cName);
    }
  }

  public hasClass(elem, className): boolean {
    if (elem.classList) {
      return elem.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
    }
  }

  public removeClass(elem, className): void {
    const classes = className.split(/\s+/);
    for (const cName of classes) {
      this.renderer2.removeClass(elem, cName);
    }
  }

  public getHiddenElementOuterHeight(elem: any): any {
    if (elem.style.display !== 'none') {
      return {
        width: elem.offsetWidth,
        height: elem.offsetHeight
      }
    }
    elem.style.visibility = 'hidden';
    elem.style.display = 'block';
    const height = elem.offsetHeight;
    const width = elem.offsetWidth;
    elem.style.display = 'none';
    elem.style.visibility = 'visible';
    return {
      width: width,
      height: height
    };
  }

  public getHiddenElementClient(parent: any, elem: any, property: any) {
    if (parent.style.display !== 'none') { return parseFloat(elem[property]); }
    parent.style.display = 'block';
    parent.style.visibility = 'hidden';
    const p = elem[property];
    parent.style.display = 'none';
    parent.style.visibility = 'visible';
    return parseFloat(p);
  }

  public addPrefix(element, attr, value): void {
    const prefix = ['webkit', 'moz', 'o', 'ms'];
    let uattr = attr.split('');
    uattr[0] = uattr[0].toUpperCase();
    uattr = uattr.join('');
    prefix.forEach(function (x) {
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
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  public getStyle(elem, attr): any {
    return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, 'false')[attr];
  }

  public getRandom(max, min): number {
    min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public getWebType(): string {
    const type = ['webkit', 'moz', 'o', 'ms'];
    let cur = '';
    type.forEach(function (t) {
      const mo = t + 'Transform';
      if (mo in document.createElement('div').style) {
        cur = t;
      }
    });
    return cur;
  }

  public getRect(elem): any {
    return elem.getBoundingClientRect();
  }

  public fadeIn(element, duration: number): void {
    element.style.opacity = 0;

    let last = +new Date();
    let opacity = 0;
    let fading;
    const tick = () => {
      opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();

      if (+opacity < 1) {
        fading = setTimeout(tick, 16);
      }
    };

    tick();
    return fading;
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
    return fading;
  }

  public css(elem, style): void {
    for (const s in style) {
      if (style.hasOwnProperty(s)) {
        elem.style[s] = style[s];
      }
    }
  }

  public addEventListener(elem, type, callback, capture: boolean = false) {
    if (elem.addEventListener) {
      elem.addEventListener(type, callback, capture);
    } else if (elem.attachEvent) {
      elem.attachEvent(type, callback);
    }
  }

  public removeEventListener(elem, type, callback) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, callback);
    } else if (elem.detachEvent) {
      elem.detachEvent(type, callback);
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

  public transitionStart(elem, handler): void {
    elem.addEventListener('transitionstart', handler, false);
    elem.addEventListener('webkitTransitionStart', handler, false);
    elem.addEventListener('mozTransitionStart', handler, false);
    elem.addEventListener('oTransitionStart', handler, false);
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
      } catch (e) {
      }
    } else {
      isMobile = false;
      userAngent = 'window';
    }
    return {
      platform: userAngent,
      isMobile: isMobile
    };
  }

  public isIE() {
    return 'ActiveXObject' in window;
  }

  public listen(elem, type, handler): void {
    this.renderer2.listen(elem, type, handler);
  }

  public parentNode(elem): HTMLElement {
    return this.renderer2.parentNode(elem);
  }

  public createElement(elem): HTMLElement {
    return this.renderer2.createElement(elem);
  }

  public appendChild(parent: any, newDom: any): void {
    this.renderer2.appendChild(parent, newDom);
  }

  public insertBefore(parent: any, newDom, oldDom): void {
    parent.insertBefore(newDom, oldDom);
  }

  public insertAfter(parent: any, newDom, oldChild) {
    const nextDom = oldChild.nextElementSibling;
    if (nextDom) {
      parent.insertBefore(newDom, nextDom);
    } else {
      parent.appendChild(newDom);
    }
  }

  public closest(elem, parent) {
    let closestElem;
    if (typeof parent === 'string') {
      while (elem) {
        if (this.hasClass(elem, parent)) {
          closestElem = elem;
          break;
        }
        elem = elem.parentNode;
      }
    } else {
      while (elem) {
        if (elem === parent) {
          closestElem = elem;
          break;
        }
        elem = elem.parentNode;
      }
    }
    return closestElem;
  }

  public removeChild(parent: any, oldChild: any): void {
    this.renderer2.removeChild(parent, oldChild);
  }

  public getOffsetTop(elem): number {
    let tmp = elem.offsetTop;
    let val = elem.offsetParent;
    while (val != null) {
      tmp += val.offsetTop;
      val = val.offsetParent;
    }
    return tmp;
  }

  public getOffsetLeft(elem): number {
    let tmp = elem.offsetLeft;
    let val = elem.offsetParent;
    while (val != null) {
      tmp += val.offsetLeft;
      val = val.offsetParent;
    }
    return tmp;
  }

  public getTouchEvent(): object {
    const isMobile = 'ontouchstart' in document;
    let event;
    if (isMobile) {
      event = {
        touchstart: 'touchstart',
        touchmove: 'touchmove',
        touchend: 'touchend',
        mobile: true
      }
    } else {
      event = {
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup',
        mobile: false
      }
    }

    return event;
  }

  public setProperty(elem: any, name: string, value: any): void {
    return this.renderer2.setProperty(elem, name, value);
  }

  public getScrollbarWidth() {
    const div = document.createElement('div');
    this.addClass(div, 'free-iscroll');
    this.css(div, {
      width: '100%',
      height: '100%',
      opacity: 0,
      overflow: 'scroll'
    });
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

  public dateFormat(date: any, fmt: string) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (o.hasOwnProperty(k)) {
        const regExp = new RegExp('(' + k + ')');
        if (regExp.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) :
            (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
    }
    return fmt;
  }

  public  forEach(arr: any, callback: Function) {
    if (arr) {
      if (Array.isArray(arr)) {
        arr.forEach((value, index, arrs) => {
          callback(value, index, arrs);
        })
      } else {
        for (let i = 0; i < arr.length; i++) {
          callback(arr[i], i, arr);
        }
      }
    }
  }

  public createEvent(eventName, target?: any) {

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string');
    }

    const eventFrags = eventName.match(/([a-z]+\.([a-z]+))/i),
      detail = {
        target: target
      };

    if (eventFrags !== null) {
      eventName = eventFrags[1];
      detail['namespace'] = eventFrags[2];
    }

    return new window['CustomEvent'](eventName, {
      detail: detail
    });
  }

  public triggerEvent(dom, event) {
    dom.dispatchEvent(event);
  }

  public parentsUntil(dom: any, parent: any) {
    const parentNode = [];
    if (typeof parent === 'string') {
      let target = dom;
      while (target) {
        if (this.hasClass(target, parent)) {
          break;
        }
        parentNode.push(target);
        target = target.parentNode;
      }
    } else {
      let target = dom;
      while (target) {
        if (target === parent) {
          break;
        }
        parentNode.push(target);
        target = target.parentNode;
      }
    }
    return parentNode;
  }

  public preventDefault(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
    } else if (event.returnValue) {
      event.returnValue = false;
    }
  }

  public stopPropagation(event: any) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (event.cancelBubble) {
      event.cancelBubble = false;
    }
  }

  public initRequestAnimationframe() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  }

  public getPointer(event) {
    let pointer = [];
    event = event || window.event;
    if (this.getTouchEvent()['mobile']) {
      pointer = event.changedTouches;
    } else {
      pointer.push(event);
    }
    return pointer;
  }

  public getPointRelativeToElement(element, event) {
    event = event || window.event;
    const touchEvent = this.getTouchEvent()['mobile'] ? event.changedTouches[0] : event;
    const rect = this.getRect(element);
    let x = (touchEvent.pageX ||
    touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
    x -= rect.left;
    let y = (touchEvent.pageY ||
    touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    y -= rect.top;
    return {
      x: x,
      y: y
    };
  }

  public on(elem, type, callback, capture: boolean = false) {
    const event = type.split(/(\s|\t)+/);
    for (const t of event) {
      this.removeEventListener(elem, t, callback);
      this.addEventListener(elem, t, callback, capture);
    }
  }

  public off(elem, type, callback) {
    const event = type.split(/(\s|\t)+/);
    for (const t of event) {
      this.removeEventListener(elem, t, callback);
    }
  }
}

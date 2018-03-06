import {CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, ElementRef, ViewChild,
  Input, Renderer2, OnDestroy, HostListener, EventEmitter, Output
} from '@angular/core';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-scroll, [fScroll]',
  template: `
    <div class="free-scroll" #scroll [ngStyle]="userSelectStyle"
         (mouseover)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <div class="free-scroll-wrapper">
        <div class="free-scroll-inner"><ng-content></ng-content></div>
      </div>
      <div class="free-scroll-scrollbar" #bar (mouseover)="onMouseEnter()" (mouseleave)="onMouseLeave()">
        <div class="free-scroll-track" #track></div>
        <div class="free-scroll-thumb" #thumb></div>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class ScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() options: any;
  @Output() onContentScroll: EventEmitter<any> = new EventEmitter();
  @Output() onInfiniteScroll: EventEmitter<any> = new EventEmitter();
  @ViewChild('scroll') scrollViewChild: ElementRef;
  @ViewChild('thumb') thumbViewChild: ElementRef;
  @ViewChild('track') trackViewChild: ElementRef;
  @ViewChild('bar') barViewChild: ElementRef;
  defaults: any;
  thumb: HTMLDivElement;
  bar: HTMLDivElement;
  track: HTMLDivElement;
  scrollHeight: number;
  outerHeight: number;
  barHeight: number;
  maxScrollTop: number;
  isLoading: boolean;
  isRunning: boolean;
  isDragg: boolean;
  scrollElem: any;
  wrapper;
  scrollTop: number;
  isMobile: boolean;
  isMoz: boolean;
  WHEEL_EV: any;
  TOUCH_EV: any;
  minBarHeight: number;
  originOptions: any;
  isOverBar: boolean;
  isOverContent: boolean;
  documentTouchmoveListener: any;
  thumbTouchstartListener: any;
  documentTouchendListener: any;
  documentTouchListener: any;
  wheelListener: any;
  initial: boolean;
  userSelectStyle: any;
  animationFrame: any;
  requestAnimationId: any;
  queueHide: any;

  @HostListener('window:resize') onResize() {
    this.refresh();
  };

  @HostListener('window:orientationchange') onorientationchagne() {
    this.refresh();
  };

  constructor(public domRenderer: DomRenderer,
              public renderer2: Renderer2,
              public er: ElementRef) {
    this.scrollTop = 0;
    this.minBarHeight = 30;
    this.options = {};
    this.defaults = {
      width: 'auto',
      height: '250px',
      size: '7px',
      position: 'right',
      alwaysVisible: false,
      wheelStep: 20,
      distance: '2px',
      thumbDraggable: true,
      touchScrollStep: 200,
      thumbBorderRadius: '2px',
      trackBorderRadius: '2px',
      thumbColor: 'rgba(0, 0, 0, 0.29804)',
      trackColor: '#e0e0e0',
      showBar: true
    };
    this.animationFrame = this.domRenderer.getRequestAnimationFrame();
  }

  ngOnInit() {
    this.isMoz = this.domRenderer.getBrowser() === 'FF';
    this.WHEEL_EV = this.isMoz ? 'DOMMouseScroll' : 'mousewheel';
    this.originOptions = this.options;
    const options = {};
    Object.assign(options, this.defaults, this.options);
    this.options = options;
    this.TOUCH_EV = this.domRenderer.getTouchEvent();
    this.isMobile = this.TOUCH_EV.mobile;
  }

  ngAfterViewInit() {
    this.scrollElem = this.scrollViewChild.nativeElement;
    this.thumb = this.thumbViewChild.nativeElement;
    this.bar = this.barViewChild.nativeElement;
    this.track = this.trackViewChild.nativeElement;
    this.wrapper = this.scrollElem.querySelector('.free-scroll-wrapper');
    this.setBarStyle();
    if (this.isMobile) {
      this.documentTouchListener = this.renderer2.listen(this.scrollElem,
        this.TOUCH_EV.touchstart, (e) => {
          this.onTouch(e);
          this.isOverContent = true;
        });
    }
    this.wheelListener = this.renderer2.listen(this.scrollElem, this.WHEEL_EV, (e) => this.onWheel(e));
    this.thumbTouchstartListener = this.renderer2.listen(this.thumb,
      this.TOUCH_EV.touchstart, (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
        this.setUserSelect();
        this.onTouch(e);
        this.isOverContent = false;
      });
    this.refresh();
    let offset = this.scrollTop;
    if ('scrollTo' in this.options) {
      offset = parseInt(this.options['scrollTo'], 10);
    }
    this.domRenderer.css(this.bar, {
      opacity: .9
    });
    this.scrollContent(offset, false, true);
    this.initial = true;
    if (!this.options['alwaysVisible']) {
      this.hideBar();
    }
  }

  setBarStyle() {
    this.domRenderer.css(this.scrollElem, {
      overflow: 'hidden',
      position: 'relative',
      width: this.options.width,
      height: this.options.height
    });
    this.domRenderer.css(this.bar, {
      position: 'absolute',
      opacity: .01,
      width: this.options.size,
      top: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 101,
      transition: 'all .2s'
    });
    this.domRenderer.css(this.track, {
      position: 'absolute',
      width: this.options.size,
      top: 0,
      bottom: 0,
      MozBorderRadius: this.options.trackBorderRadius,
      WebkitBorderRadius: this.options.trackBorderRadius,
      borderRadius: this.options.trackBorderRadius,
      background: this.options['trackColor']
    });
    if (this.options['trackClass']) {
      this.domRenderer.addClass(this.track, this.options['trackClass']);
    }
    const dist = this.options.position === 'left' ?
      {left: this.options.distance} : {right: this.options.distance};
    this.domRenderer.css(this.bar, dist);
    this.domRenderer.css(this.wrapper, {
      position: 'relative',
      zIndex: '10'
    });
    this.domRenderer.css(this.thumb, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      MozBorderRadius: this.options.thumbBorderRadius,
      WebkitBorderRadius: this.options.thumbBorderRadius,
      borderRadius: this.options.thumbBorderRadius,
      background: this.options['thumbColor']
    });
    if (this.options['thumbClass']) {
      this.domRenderer.addClass(this.thumb, this.options['thumbClass']);
    }
  }

  setUserSelect() {
    this.isOverBar = !this.isOverBar;
    this.userSelectStyle = {
      'user-select': this.isOverBar ? 'none' : 'auto',
      '-webkit-user-select': this.isOverBar ? 'none' : 'auto',
      '-moz-user-select': this.isOverBar ? 'none' : 'auto',
      '-ms-user-select': this.isOverBar ? 'none' : 'auto',
      'cursor': this.isOverBar ? 'default' : 'auto'
    };
  }

  scrollContent(y, isWheel?, isTo?, event?) {
    let delta = y;
    if (this.maxScrollTop > 0) {
      if (isWheel) {
        delta = this.scrollTop + y * this.defaults.wheelStep / 100 * this.barHeight;
        delta = Math.min(Math.max(delta, 0), this.maxScrollTop);
        delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
        this.domRenderer.setTransform(this.thumb, 'translate3d(0, ' + delta + 'px, 0');
        this.scrollTop = delta;
      }
      const percentScroll = this.scrollTop / (this.outerHeight - this.barHeight);
      delta = percentScroll * (this.scrollHeight - this.outerHeight);
      if (isTo) {
        delta = y;
        let offsetTop = y / this.scrollHeight * this.outerHeight;
        offsetTop = Math.min(Math.max(offsetTop, 0), this.maxScrollTop);
        this.domRenderer.setTransform(this.thumb, 'translate3d(0, ' + offsetTop + 'px, 0');
      }
      this.domRenderer.setTransform(this.wrapper, 'translate3d(0, -' + Math.ceil(delta) + 'px, 0');
    }
    if (this.initial) {
      this.onContentScroll.emit({
        event: event,
        scrollTop: this.scrollTop,
        end: this.maxScrollTop <= this.scrollTop
      });
    }
    this.showBar();
    this.hideBar();
  }

  refresh() {
    if (this.requestAnimationId) {
      this.animationFrame.clearAnimationFrame(this.requestAnimationId);
    }
    if (this.scrollViewChild) {
      this.scrollHeight = this.scrollElem.scrollHeight;
      this.outerHeight = this.scrollElem.offsetHeight;
      this.barHeight = Math.max((this.outerHeight / this.scrollHeight)
        * this.outerHeight, this.minBarHeight);
      this.maxScrollTop = this.outerHeight - this.barHeight;
      this.thumb.style.height = (this.barHeight) + 'px';
    }
    this.updatePosition();
    if (this.barHeight === this.outerHeight) {
      this.hideBar();
    }
    this.requestAnimationId = this.animationFrame.setAnimationFrame(() => {
      this.refresh();
    });
  }

  updatePosition() {
    let top = this.scrollTop || 0;
    top = Math.min(Math.max(top, 0), this.maxScrollTop);
    this.scrollTop = top;
    this.scrollTo(top, 0, true);
  }

  scrollTo(y, x?, isTo?) {
    const percentScroll = y / (this.outerHeight - this.barHeight);
    const delta = percentScroll * (this.scrollHeight - this.outerHeight);
    this.domRenderer.setTransform(this.thumb, 'translate3d(0, ' + y + 'px, 0');
    if (isTo) {
      this.domRenderer.setTransform(this.wrapper, 'translate3d(0, -' + Math.ceil(delta) + 'px, 0');
    }
  }

  reset() {
    this.scrollTop = 0;
    this.domRenderer.setTransform(this.thumb, 'translate3d(0, 0px, 0');
    this.domRenderer.setTransform(this.wrapper, 'translate3d(0, ' + this.scrollTop + 'px, 0');
  }

  onWheel(e) {
    let wheelDeltaY;
    if ('wheelDelta' in e) {// down -120，up 120
      wheelDeltaY = -e.wheelDelta / 120;
    } else if ('detail' in e) { // down 3，up -3
      wheelDeltaY = e.detail * 3;
    } else {
      return;
    }
    if (!this.isLoading) {
      this.isRunning = true;
      this.scrollContent(wheelDeltaY, true, false, e);
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  showBar() {
    clearTimeout(this.queueHide);
    if (!this.options['alwaysVisible'] && this.maxScrollTop > 0) {
      this.domRenderer.css(this.bar, {
        opacity: .9
      });
    }
  }

  hideBar() {
    if (!this.options['alwaysVisible'] && this.maxScrollTop >= 0) {
      this.queueHide = setTimeout(() => {
        if (!this.isDragg) {
          this.domRenderer.css(this.bar, {
            opacity: .01
          });
        }
      }, 500);
    }
  }

  onMouseEnter() {
    this.showBar();
  }

  onMouseLeave() {
    this.hideBar();
  }

  onTouch(event: any) {
    this.refresh();
    this.isDragg = true;
    let ev = event || window['event'];
    if (this.isMobile) {
      ev = ev.changedTouches[0];
      this.showBar();
    }
    let target = 'document';
    if (this.isOverContent) {
      target = this.scrollElem;
    }
    let pageY = ev.pageY;
    let pageX = ev.pageX;
    this.documentTouchmoveListener = this.renderer2.listen(target, this.TOUCH_EV.touchmove, (e) => {
      let vm = e || window['event'];
      if (this.isMobile) {
        vm = vm.changedTouches[0];
      }
      if (this.isDragg) {
        if (this.isMobile) {
          const diff = (pageY - vm.pageY) / this.options.touchScrollStep;
          this.scrollContent(diff, true, false, event);
        } else {
          const t = this.scrollTop + vm.pageY - pageY;
          this.scrollTop = t;
          this.domRenderer.setTransform(this.thumb, 'translate3d(0, ' + t + 'px, 0');
          this.scrollContent(0, this.scrollTop, false, event);
        }
        pageY = vm.pageY;
        pageX = vm.pageX;
      }
    });
    this.documentTouchendListener = this.renderer2.listen('document', this.TOUCH_EV.touchend, () => {
      this.isDragg = false;
      this.setUserSelect();
      if (this.isMobile) {
        this.hideBar();
      }
      this.unbindDocumentTouchListener();
    });
  }

  unbindDocumentTouchListener() {
    if (this.documentTouchmoveListener) {
      this.documentTouchmoveListener();
      this.documentTouchmoveListener = null;
    }
    if (this.documentTouchendListener) {
      this.documentTouchendListener();
      this.documentTouchendListener = null;
    }
  }

  ngOnDestroy() {
    if (this.documentTouchListener) {
      this.documentTouchListener();
      this.documentTouchListener = null;
    }
    if (this.thumbTouchstartListener) {
      this.thumbTouchstartListener();
      this.thumbTouchstartListener = null;
    }
    if (this.requestAnimationId) {
      this.animationFrame.clearAnimationFrame(this.requestAnimationId);
    }
    if (this.wheelListener) {
      this.wheelListener();
      this.wheelListener = null;
    }
    this.unbindDocumentTouchListener();
    this.queueHide = null;
  }
}
@NgModule({
  imports: [CommonModule],
  declarations: [ScrollComponent],
  exports: [ScrollComponent]
})

export class ScrollModule {
}

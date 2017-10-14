import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-slides',
  template: `
    <div class="free-slides" [ngStyle]="styles" #container>
      <div class="free-slides-wrapper" #wrapper (mousedown)="onMousedown($event)"
           (mousemove)="onMousemove($event)" (mouseup)="onMouseup()">
        <ng-content></ng-content>
      </div>
      <div class="free-slides-pagination free-pagination-bullets"
           [class.free-pagination-clickable]="paginationClickable" *ngIf="pagination">
        <span class="free-pagination-bullet"
              *ngFor="let bullet of bullets; index as i"
              [ngClass]="{'free-pagination-bullet-active': i == activeIndex}"
              (click)="paginationClick(i)"></span>
      </div>
      <div class="free-slides-prev" [ngClass]="{'free-slides-disabled': (!loop && activeIndex == 0)}"
           *ngIf="prev || arrow" (click)="slidePrev(!loop && activeIndex == 0)">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="free-slides-next"
           [ngClass]="{'free-slides-disabled': (!loop &&  activeIndex == slides.length - 1)}"
           *ngIf="next || arrow" (click)="slideNext(!loop &&  activeIndex == slides.length - 1)">
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class SlidesComponent implements AfterViewInit {

  @Input() speed = 300;
  @Input() styles: any;
  @Input() loop: number;
  @Input() pagination: boolean;
  @Input() paginationClickable: boolean;
  @Input() arrow: boolean;
  @Input() prev: boolean;
  @Input() next: boolean;
  @Input() direction: string;
  @Input() touch: boolean;
  @Input() autoplay: number;
  @Input() autoplayDisableOnInteraction = true;
  @Output() slideChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('container') container: ElementRef;
  _container: any;
  _wrapper: any;
  _er: any;
  activeIndex = 0;
  slides: SlideComponent[] = [];
  startXY: any;
  moveXY: any;
  itemWidth: number;
  itemHeight: number;
  isMobile: boolean;
  isDowned: boolean;
  _autoplaying: boolean;
  bullets: any[];
  slidesLength: number;
  loopSlidesLength: number;
  loopActiveIndex = 0;
  loopAdditionalSlides = 2;
  autoplayTimeoutId: any;
  constructor(public er: ElementRef, public domRender: DomRenderer) {
    this.bullets = [];
    this.pagination = true;
    this.arrow = true;
    this.reset();
    this.direction = 'horizontal';
    this.isMobile = 'ontouchstart' in document;
  }

  ngAfterViewInit() {
    this._er = this.er.nativeElement;
    this._wrapper = this.wrapper.nativeElement;
    this._container = this.container.nativeElement;
    this.itemWidth = this._container.offsetWidth;
    this.itemHeight = this._container.offsetHeight;

    this.slidesLength = this.slides.length;
    for (let i = 0; i < this.slidesLength; i++) {
      const slide = this.slides[i];
      slide.width = this.itemWidth;
      slide.index = i;
    }

    this.domRender.addClass(this._container, `free-container-${this.direction}`);

    this.domRender.transitionEnd(this._wrapper, () => {
      this.domRender.setTransitionDuration(this._wrapper, 0);
      if (this.loop) {
        if (this.loopActiveIndex === 0) {
          this.loopActiveIndex = this.loopSlidesLength - this.loopAdditionalSlides;
          this.slideTo(this.loopActiveIndex, 0);
          this.activeIndex = this.slidesLength - 1;
        } else if (this.loopActiveIndex >= this.loopSlidesLength - 1) {
          this.loopActiveIndex = 1;
          this.slideTo(this.loopActiveIndex, 0);
          this.activeIndex = 0;
        } else {
          this.activeIndex = this.loopActiveIndex - 1;
        }
      } else {
        this.activeIndex = this.loopActiveIndex;
      }
      this.slideChange.emit({activeIndex: this.activeIndex});
    });

    if (this.loop) {
      this._autoplaying = true;
      this.createLoop();
    }

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  reset() {
    this.startXY = {
      x: 0,
      y: 0
    };
    this.moveXY = {
      x: 0,
      y: 0
    };
  }

  add(slide: SlideComponent) {
    if (this.pagination) {
      this.bullets.push(this.slides.length);
    }
    this.slides.push(slide);
  }

  startAutoplay() {
    if (typeof this.autoplayTimeoutId !== 'undefined') { return false; }

    this.autoplayTimeoutId = setInterval(() => {
      this.slideNext(false);
    }, this.autoplay);
  }

  stopAutoplay() {
    clearInterval(this.autoplayTimeoutId);
    this.autoplayTimeoutId = undefined;
    this._autoplaying = false;
  }

  getPoint(e: any) {
    const touchEvent = this.isMobile ? e.changedTouches[0] : e;
    return {
      x: touchEvent.pageX,
      y: touchEvent.pageY
    };
  }

  createLoop() {
    const slides = this._wrapper.querySelectorAll('free-slide');
    this.loopSlidesLength = slides.length + 2;

    const prevSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);

    this._wrapper.insertBefore(lastSlide, slides[0]);
    this._wrapper.appendChild(prevSlide);

    this.slideTo(1, 0);
    this.loopActiveIndex = 1;
  }

  paginationClick(index: number) {
    if (this.paginationClickable) {
      if (this.loop) {
        this.loopActiveIndex = index + 1;
      } else {
        this.loopActiveIndex = index;
      }
      this.slideTo(this.loopActiveIndex);
    }
  }

  onMousedown(event: any) {
    if (this.touch) {
      this.reset();
      this.startXY = this.getPoint(event);
      this.isDowned = true;

      if (this.autoplay && this.autoplayTimeoutId) {
        this.stopAutoplay();
      }
    }
  }

  onMousemove(event: any) {
    if (this.isDowned && this.touch) {
      const {x, y} = this.getPoint(event);
      this.moveXY = { x: x - this.startXY.x, y: y - this.startXY.y};
      const tx = 'translate3d(' + (-this.itemWidth * this.loopActiveIndex + this.moveXY.x)  + 'px, 0, 0)';
      this.domRender.setTransform(this._wrapper, tx);
    }
  }

  onMouseup() {
    if (this.touch) {
      this.isDowned = false;
      const halfWidth = this.itemWidth / 2;
      if (this.moveXY.x < 0 && (this.loopActiveIndex !== this.slides.length - 1)
        && -this.moveXY.x > halfWidth) {
        this.loopActiveIndex++;
      } else if (this.moveXY.x > 0 && this.loopActiveIndex !== 0 && this.moveXY.x > halfWidth) {
        this.loopActiveIndex--;
      }
      this.slideTo(this.loopActiveIndex);

      if (this.loop) {
        this.activeIndex = this.loopActiveIndex - 1;
      } else {
        this.activeIndex = this.loopActiveIndex;
      }
      this._autoplaying = false;

      if (!this.autoplayDisableOnInteraction) {
        this.startAutoplay();
      }
    }
  }

  slidePrev(canSlide: boolean) {
    if (canSlide) {return}
    this.loopActiveIndex--;
    this.slideTo(this.loopActiveIndex);
  }

  slideNext(canSlide: boolean) {
    if (canSlide) {return}
    this.loopActiveIndex++;
    this.slideTo(this.loopActiveIndex);
  }

  slideTo(index: number, speed: number = this.speed) {
    this.domRender.setTransitionDuration(this._wrapper, speed);
    if (this.direction === 'horizontal') {
      this.domRender.setTransform(this._wrapper, 'translate3d(-' + this.itemWidth * index + 'px, 0, 0)');
    } else {
      this.domRender.setTransform(this._wrapper, 'translate3d(0,-' + this.itemHeight * index + 'px, 0)');
    }
  }

}

@Component({
  selector: 'free-slide',
  template: `
    <div class="free-slide" [attr.index]="index" [style.width.px]="width">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit {

  group: SlidesComponent;
  width: number;
  index: number;
  constructor(group: SlidesComponent) {
    this.group = group;
  }

  ngOnInit() {
    this.group.add(this);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SlideComponent, SlidesComponent],
  exports: [SlideComponent, SlidesComponent]
})

export class SlideModule {}

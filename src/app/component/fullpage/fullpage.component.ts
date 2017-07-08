import {
  AfterViewInit, Component, ElementRef, EventEmitter, forwardRef,
  HostListener, Inject, Input, NgModule, OnDestroy, Output, ViewChild
} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'free-fullpage-slide',
  template: `
    <div class="free-fullpage-slide" [ngClass]="{'free-fullpage-slide-active': active}"
         [style.height.px]="height">
      <ng-content></ng-content>
    </div>
  `
})

export class FullpageSlideComponent {
  @Input() index: number;
  active: boolean;
  height: number;
  constructor(@Inject(forwardRef(() => FullpageComponent)) private group: FullpageComponent) {
    this.group.addSlide(this);
  }
}

@Component({
  selector: 'free-pagination-bullet',
  template: `
    <div class="free-pagination-bullet"
         [ngClass]="{'free-pagination-bullet-active': active}"></div>
  `
})

export class FullpageBulletComponent {
  @Input() index: number;
  @Input() active: boolean;
}

@Component({
  selector: 'free-fullpage',
  template: `
    <div class="free-fullpage-container" #container>
      <div class="free-fullpage-wrapper" #wrapper>
        <ng-content></ng-content>
      </div>
      <div class="free-fullpage-pagination" *ngIf="pagination" #pagination>
        <free-pagination-bullet *ngFor="let slide of slides;index as i" [index]="i"
                                [active]="activeIndex === i" (click)="onPaginationClick(i)">
        </free-pagination-bullet>
      </div>
    </div>
  `,
  styleUrls: ['./fullpage.component.scss'],
  providers: [DomRenderer]
})
export class FullpageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('wrapper') wrapperViewChild: ElementRef;
  @ViewChild('pagination') paginationViewChild: ElementRef;
  @Input() pagination: Boolean;
  @Input() paginationClickable: boolean;
  @Output() slideStart = new EventEmitter();
  @Output() slideEnd = new EventEmitter();
  paginationElem: HTMLDivElement;
  container: HTMLDivElement;
  wrapper: HTMLDivElement;
  win: any;
  totalSlides: number;
  isScroll: boolean;
  activeIndex = 0;
  slides: FullpageSlideComponent[];
  transitionstartListener: any;
  transitionendListerner: any;
  @HostListener('window:resize') onResize() {
    this.win = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  @HostListener('document:wheel', ['$event']) onWheel(e: any) {
      e = e || window.event;
      if (!this.isScroll) {
        if (e.wheelDelta) {
          if (e.wheelDelta > 0) {
            this.scrollPrev();
          } else if (e.wheelDelta < 0) {
            this.scrollNext();
          }
        } else if (e.detail) {
          if (e.detail < 0) {
            this.scrollPrev();
          } else if (e.detail > 0) {
            this.scrollNext();
          }
        }
      }
  }
  constructor(private domRenderer: DomRenderer) {
    this.win = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.slides = [];
  }

  addSlide(slide: FullpageSlideComponent) {
    this.slides.push(slide);
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    this.wrapper = this.wrapperViewChild.nativeElement;
    if (this.pagination) {
      this.paginationElem = this.paginationViewChild.nativeElement;
    }
    this.refreshView();
    this.transitionstartListener = this.domRenderer.listen(this.wrapper, 'transitionstart', () => {
      if (this.container) {
        this.isScroll = true;
        this.slideStart.emit({
          activeIndex: this.activeIndex
        })
      }
    });
    this.transitionendListerner = this.domRenderer.listen(this.wrapper, 'transitionend', () => {
      if (this.container) {
        this.isScroll = false;
        this.slideEnd.emit({
          activeIndex: this.activeIndex
        })
      }
    });
  }

  onPaginationClick(index: number) {
    if (this.paginationClickable) {
      this.scrollTo(index);
    }
  }

  refreshView() {
    const wHeight = this.win['height'];
    this.totalSlides = this.slides.length;
    this.wrapper.style.height = wHeight * this.totalSlides + 'px';
    for (const slide of this.slides) {
      slide.height = wHeight;
    }
  }

  scrollPrev() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.scrollTo(this.activeIndex);
    }
  }

  scrollNext () {
    if (this.activeIndex < this.totalSlides - 1) {
      this.activeIndex++;
      this.scrollTo(this.activeIndex);
    }
  }

  scrollTo(index) {
    if (index < this.totalSlides) {
      this.isScroll = true;
      this.wrapper.style.transform = 'translate3d(0,-' + this.win['height'] * index + 'px,0)';
      this.activeIndex = index;
    }
  }
  ngOnDestroy() {
    if (this.transitionstartListener) {
      this.transitionstartListener();
    }
    if (this.transitionendListerner) {
      this.transitionendListerner();
    }
    this.container = null;
  }

}


@NgModule({
  imports: [CommonModule],
  declarations: [FullpageSlideComponent, FullpageBulletComponent, FullpageComponent],
  exports: [FullpageSlideComponent, FullpageBulletComponent, FullpageComponent]
})

export class FullpageModule {}

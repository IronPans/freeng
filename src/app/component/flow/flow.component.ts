import {
  AfterViewInit, Component, ContentChild, DoCheck, ElementRef, EventEmitter,
  Input, IterableDiffers, NgModule, Output, TemplateRef, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-flow',
  template: `
   <div class="free-flow" [ngStyle]="style">
     <div class="free-flow-wrapper free-iscroll" #container (scroll)="onScroll($event)">
       <ng-content></ng-content>
       <div class="free-flow-loading">
         <span *ngIf="noMore">{{tip}}</span>
         <div class="free-loading" *ngIf="!noMore">
           <div class="loader circle-round small">
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span></span>
           </div>
         </div>
       </div>
     </div>
   </div>
  `,
  providers: [DomRenderer]
})
export class FlowComponent implements AfterViewInit, DoCheck {
  @Input() style: any;
  @Input() lazy: boolean;
  @Output() onInfiniteScroll: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') containerViewChild: ElementRef;
  items: FlowItemComponent[];
  container: HTMLDivElement;
  height: number;
  page: number;
  noMore: boolean;
  tip: string;
  lazyImages: any;
  differ: any;
  timeoutId: any;
  constructor(public domRenderer: DomRenderer, differs: IterableDiffers) {
    this.page = 1;
    this.tip = '没有更多了';
    this.items = [];
    this.differ = differs.find([]).create(null);
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.style.height) {
      this.height = this.style.height;
    }
    if (this.height) {
      this.height = this.container.offsetHeight;
    }
    if (this.lazy) {
      this.inScrollView();
    }
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.items);
    if (changes) {
      this.inScrollView();
    }
  }

  addItem(item: FlowItemComponent) {
    this.items.push(item);
  }

  getLazyImages() {
    this.lazyImages = [];
    this.domRenderer.forEach(this.container.querySelectorAll('img[lazy-src]'), (item, index) => {
      this.lazyImages.push(item);
    });
  }

  onScroll(event: any) {
    const scrollTop = this.container.scrollTop;
    const scrollHeight = this.container.scrollHeight;
    if (scrollHeight - this.height <= scrollTop) {
      clearTimeout(this.timeoutId);
      this.page++;
      this.onInfiniteScroll.emit({
        done: true,
        page: this.page,
        next: this.next.bind(this)
      });
    }
    if (this.lazy) {
      this.inScrollView();
    }
  }

  inScrollView() {
    this.timeoutId = setTimeout(() => {
      this.getLazyImages();
      let length = this.lazyImages.length;
      while (length) {
        length--;
        const elem = this.lazyImages[length];
        const imgRect = this.domRenderer.getRect(elem);
        const scrollRect = this.domRenderer.getRect(this.container);
        if (imgRect.top >= scrollRect.top && imgRect.top < scrollRect.bottom
          && imgRect.left >= scrollRect.left && imgRect.left < scrollRect.right) {
          const img = new Image();
          const lazyUrl = elem.getAttribute('lazy-src');
          const index = length;
          img.onload = () => {
            elem.removeAttribute('lazy-src');
            this.lazyImages.splice(index, 1);
            elem.src = lazyUrl;
          };
          img.src = lazyUrl;
        }
      }
    }, 100);
  }

  next(title: string, condition?: any) {
    if (this.lazy) {
      this.inScrollView();
    }
    if (condition) {
      this.noMore = true;
      this.tip = title;
    }
  }
}

@Component({
  selector: 'free-flow-item',
  template: `<ng-content></ng-content>`
})
export class FlowItemComponent implements AfterViewInit {
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  itemTemplate: any;
  constructor(public flowComponent: FlowComponent) {
    this.flowComponent.addItem(this);
  }

  ngAfterViewInit() {
    this.itemTemplate = this.template;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [FlowItemComponent, FlowComponent],
  exports: [FlowItemComponent, FlowComponent]
})
export class FlowModule {}

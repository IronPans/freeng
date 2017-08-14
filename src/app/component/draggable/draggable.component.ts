import {
  AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener,
  Inject, Input, NgModule, OnDestroy, Output, Renderer2, TemplateRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';
import {ShareModule} from '../common/share';

@Component({
  selector: 'free-draggable-item',
  template: `
    <div class="free-draggable-item" [class.free-draggable-active]="isDown">
      <ng-content></ng-content>
    </div>
  `,
  providers: [DomRenderer]
})

export class DraggableItemComponent implements AfterViewInit, OnDestroy {
  @Input() disabled: boolean;
  @Input() dragData: any;
  @Input() index: number;
  isDown: boolean;
  target: any;
  startMousePoint: any;
  startTargetPoint: any;
  documentMousemoveListener: any;
  documentMouseleaveListener: any;
  dropElement: any;
  selfElem: any;
  willDropElement: any;
  targetRect: any;
  draggableRect: any;
  overlayElem: HTMLDivElement;
  parentElement: any;

  @HostListener('mousedown', ['$event'])
  onMousedown(event: any) {
    if (!this.target) {
      this.isDown = true;
      this.startMousePoint = {
        x: event.pageX,
        y: event.pageY
      };
      this.createTarget();
      this.parentElement = this.draggableComponent.er.nativeElement;
      this.draggableRect = this.domRenderer.getRect(this.parentElement);
      this.documentMousemoveListener = this.renderer2.listen('document', 'mousemove',
        (e) => this.onMousemove(e));
      this.documentMouseleaveListener = this.renderer2.listen('document', 'mouseup',
        () => this.onMouseup());
      this.draggableComponent.onDragStart.emit(this.dragData);
    }
  }

  constructor(@Inject(forwardRef(() => DraggableComponent)) private draggableComponent: DraggableComponent,
              private domRenderer: DomRenderer,
              private er: ElementRef,
              private renderer2: Renderer2) {
  }

  ngAfterViewInit() {
    this.selfElem = this.er.nativeElement;
    this.draggableComponent.addItem(this, this.selfElem.firstElementChild);
  }

  createTarget() {
    const rect = this.domRenderer.getRect(this.selfElem);
    this.target = document.createElement('div');
    this.target.className = 'free-draggable-target';
    this.domRenderer.css(this.target, {
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px'
    });
    this.startTargetPoint = {
      top: rect.top,
      left: rect.left
    };
    this.target.appendChild(this.selfElem.cloneNode(true));
    document.body.appendChild(this.target);
  }

  createWillDropElement() {
    if (this.draggableComponent.draggable && !this.draggableComponent.dropTarget) {
      this.draggableComponent.group.forEach((item, key) => {
        if (key !== this.index) {
          const elem = item.elem;
          const rect = this.domRenderer.getRect(elem);
          if (this.inRect(this.targetRect, this.draggableRect)) {
            if (rect.top < this.startTargetPoint.top
              && rect.bottom > this.startTargetPoint.top) {
              if (!this.willDropElement) {
                this.willDropElement = document.createElement('div');
                const selfElem = this.selfElem.firstElementChild.cloneNode(true);
                this.domRenderer.removeClass(selfElem, 'free-draggable-active');
                this.willDropElement.appendChild(selfElem);
                this.domRenderer.css(this.willDropElement, {
                  'position': 'fixed',
                  'top': rect.top + rect.height + 'px',
                  'left': rect.left + 'px',
                  'border': '1px dashed #d9d9d9',
                  'background': '#fff',
                  'opacity': .8,
                  'width': this.domRenderer.getRect(this.selfElem).width + 'px'
                });
                document.body.appendChild(this.willDropElement);
              }
              const top = parseFloat(this.domRenderer.getStyle(elem, 'marginTop'));
              const bottom = parseFloat(this.domRenderer.getStyle(elem, 'marginBottom'));
              this.draggableComponent.dropIndex = key + 1;
              this.domRenderer.css(this.willDropElement, {
                'top': rect.top + rect.height + top + 'px',
                'left': rect.left + 'px'
              });
              let nextElem = this.draggableComponent.group[this.draggableComponent.dropIndex];
              if (nextElem) {
                nextElem = nextElem.elem.parentNode;
                this.removeOverlayElement();
                this.overlayElem = document.createElement('div');
                this.overlayElem.style.height = rect.height + top + bottom + 'px';
                nextElem.parentNode.insertBefore(this.overlayElem, nextElem);
              }
            }
          } else {
            this.removeWillDropElement();
          }
        }
      });
    }
  }

  removeWillDropElement() {
    if (!this.willDropElement) {
      return;
    }
    document.body.removeChild(this.willDropElement);
    this.willDropElement = null;
  }

  removeOverlayElement() {
    if (this.overlayElem && this.overlayElem.parentNode) {
      this.overlayElem.parentNode.removeChild(this.overlayElem);
      this.overlayElem = null;
    }
  }

  inRect(target: any, targetB: any) {
    return targetB.left < target.right && targetB.right > target.left
      && targetB.top < target.bottom && targetB.bottom > target.top;
  }

  onMousemove(event: any) {
    this.domRenderer.preventDefault(event);
    if (this.isDown) {
      this.startTargetPoint = {
        top: this.startTargetPoint.top + event.pageY - this.startMousePoint.y,
        left: this.startTargetPoint.left + event.pageX - this.startMousePoint.x
      };
      this.domRenderer.css(this.target, {
        top: this.startTargetPoint.top + 'px',
        left: this.startTargetPoint.left + 'px'
      });
      this.targetRect = this.domRenderer.getRect(this.target);
      this.createWillDropElement();
      this.startMousePoint = {
        x: event.pageX,
        y: event.pageY
      };
    }
  }

  onMouseup() {
    this.isDown = false;
    this.startMousePoint = {};
    this.startTargetPoint = {};
    let dropRect;
    const dropIndex = this.draggableComponent.dropIndex;
    this.dropElement = this.draggableComponent.dropElement;
    if (!this.draggableComponent.dropTarget && this.draggableComponent.draggable) {
      dropRect = this.domRenderer.getRect(this.parentElement);
      if (this.inRect(this.targetRect, dropRect)) {
        this.draggableComponent.dragItems.splice(dropIndex, 0, this.dragData);
        if (this.index > dropIndex) {
          this.draggableComponent.dragItems.splice(this.index + 1, 1);
        } else {
          this.draggableComponent.dragItems.splice(this.index, 1);
        }
      }
      this.draggableComponent.onDragEnd.emit(this.draggableComponent.dragItems);
    }
    if (this.dropElement) {
      this.targetRect = this.domRenderer.getRect(this.target);
      dropRect = this.domRenderer.getRect(this.dropElement);
      if (this.inRect(this.targetRect, dropRect)) {
        if (this.draggableComponent.dragEffect === 'move') {
          this.draggableComponent.dragItems.splice(this.index, 1);
        }
        this.draggableComponent.onDragEnd.emit(this.dragData);
      }
    }
    this.removeWillDropElement();
    this.removeOverlayElement();
    this.draggableComponent.dropIndex = 0;
    document.body.removeChild(this.target);
    this.target = null;
    this.unbindDocumentListener();
  }

  unbindDocumentListener() {
    if (this.documentMouseleaveListener) {
      this.documentMouseleaveListener();
      this.documentMouseleaveListener = null;
    }
    if (this.documentMousemoveListener) {
      this.documentMousemoveListener();
      this.documentMousemoveListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentListener();
  }
}

@Component({
  selector: 'free-draggable',
  template: `
    <div class="free-draggable">
      <free-draggable-item *ngFor="let item of dragItems;index as i" [dragData]="item" [index]="i">
        <free-template [template]="templateRef" [data]="item" [index]="i"></free-template>
      </free-draggable-item>
    </div>
  `
})
export class DraggableComponent implements AfterViewInit {

  @Input() dropTarget: any;
  @Input() dragItems: any[];
  @Input() draggable: boolean;
  @Input() dragEffect: string;
  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  group: any[];
  dropElement: any;
  dropIndex: number;

  constructor(public er: ElementRef) {
    this.dragItems = [];
    this.dragEffect = 'copy';
    this.group = [];
  }

  ngAfterViewInit() {
    if (this.dropTarget) {
      this.dropElement = this.dropTarget.nativeElement;
      if (!this.dropElement) {
        this.dropElement = this.dropTarget;
      }
    }
  }

  addItem(item: DraggableItemComponent, elem: HTMLDivElement) {
    this.group.push({
      component: item,
      elem: elem
    });
  }
}

@NgModule({
  imports: [CommonModule, ShareModule],
  declarations: [DraggableItemComponent, DraggableComponent],
  exports: [DraggableComponent]
})

export class DraggableModule {
}

import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, NgModule,
  OnDestroy, OnInit, Output, Renderer2
} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-popover',
  template: `
    <div class="free-popover" (click)="onPanelClick()"
         [ngStyle]="{top: top + 'px', left: left + 'px', zIndex: zIndex, display: visible ? 'block' : 'none'}">
      <div class="free-popover-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class PopoverComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() popoverPosition: string;
  @Input() dimiss: boolean;
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  popoverElem: any;
  visible: boolean;
  targetClick: boolean;
  selfClick: boolean;
  target: any;
  top: number;
  left: number;
  zIndex: number;
  documentClickListener: any;

  constructor(public domRenderer: DomRenderer,
              public er: ElementRef,
              public renderer2: Renderer2) {
    this.visible = false;
    this.dimiss = true;
    this.popoverPosition = 'top';
  }

  ngOnInit() {
    if (this.dimiss) {
      this.documentClickListener = this.renderer2.listen('document', 'click', () => {
        if (!this.selfClick && !this.targetClick) {
          this.hide();
        }
        this.selfClick = false;
        this.targetClick = false;
      });
    }
  }

  ngAfterViewInit() {
    this.popoverElem = this.er.nativeElement.firstElementChild;
  }

  toggle(event, target?) {
    const currentTarget = (target || event.currentTarget || event.target);

    if (!this.target || this.target === currentTarget) {
      if (this.visible) {
        this.hide();
      } else {
        this.show(event, target);
      }
    } else {
      this.show(event, target);
    }
    if (this.dimiss) {
      this.targetClick = true;
    }
    this.target = currentTarget;
  }

  hide() {
    if (this.visible) {
      this.visible = false;
      this.onHide.emit(null);
    }
  }

  show(event: any, target?) {
    if (this.dimiss) {
      this.targetClick = true;
    }
    const offset = this.domRenderer.getHiddenElementOuterHeight(this.popoverElem);
    const width = offset.width;
    const height = offset.height;
    const elementTarget = target || event.currentTarget || event.target;
    this.zIndex = DomRenderer.zIndex++;
    if (!this.visible) {
      this.visible = true;
      this.onShow.emit(null);
      let top = 0;
      let left = 0;
      const rect = this.domRenderer.getRect(elementTarget);
      switch (this.popoverPosition) {
        case 'left':
          top = rect.top - height / 2 + rect.height / 2;
          left = rect.left - width;
          break;
        case 'right':
          top = rect.top - height / 2 + rect.height / 2;
          left = rect.left + rect.width;
          break;
        case 'top':
          top = rect.top - height;
          left = rect.left - width / 2 + rect.width / 2;
          break;
        case 'bottom':
          top = rect.top + rect.height;
          left = rect.left - width / 2 + rect.width / 2;
          break;
      }
      this.left = left;
      this.top = top;
      this.domRenderer.addClass(this.popoverElem, this.popoverPosition);
    }
  }

  onPanelClick() {
    this.selfClick = true;
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
    this.target = null;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PopoverComponent],
  exports: [PopoverComponent]
})

export class PopoverModule {
}

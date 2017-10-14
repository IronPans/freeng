import {CommonModule} from '@angular/common';
import {
  NgModule, Component, Input, Output, EventEmitter,
  Renderer2, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener
} from '@angular/core';
import { trigger, style, state, animate, transition} from '@angular/animations';
import { ShareModule } from '../common/share';
import {ButtonModule} from '../button/button.directive';
import {LoadingModule} from '../loading/loading.component';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-modal',
  template: `
    <div *ngIf="_visible" class="free-modal"
         [ngStyle]="{'z-index': zIndex, width: width + 'px',
         height: height + 'px','left.px': left, 'top.px': top}"
         [ngClass]="modalClass"
         [@fadeInScale]="modalState" [class.free-modal-spinner]="spinner">
      <div class="free-modal-header" *ngIf="!spinner" (mousedown)="onMouseDown($event)">
        <span *ngIf="header">{{header}}</span>
        <span><ng-content select="f-header"></ng-content></span>
        <span *ngIf="closeIcon" class="free-modal-close" (click)="visible = false">
          <i class="fa fa-close"></i>
        </span>
      </div>
      <div class="free-modal-content">
        <ng-container *ngIf="!spinner">
          <ng-content></ng-content>
          <div *ngIf="type === 'prompt'" class="free-prompt-input">
            <input type="text" #prompt>
          </div>
        </ng-container>
        <ng-container *ngIf="spinner">
          <free-loading [type]="spinner"></free-loading>
        </ng-container>
      </div>
      <div class="free-modal-footer" *ngIf="!spinner">
        <ng-container [ngSwitch]="type">
          <ng-template ngSwitchCase="alert">
            <button fButton (click)="confirm()">OK</button>
          </ng-template>
          <ng-template ngSwitchCase="confirm">
            <button fButton (click)="close()">Cancel</button>
            <button fButton (click)="confirm()">OK</button>
          </ng-template>
          <ng-template ngSwitchCase="prompt">
            <button fButton (click)="close()">Cancel</button>
            <button fButton (click)="confirm()">OK</button>
          </ng-template>
        </ng-container>
        <ng-content select="f-footer"></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeInScale', [
      state('in', style({
        opacity: 1,
        transform: 'translate(-50%, 0)'
      })),
      transition('void => *', [
        style({opacity: 0, transform: 'translate(-50%, -25%)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translate(-50%, 0)'}))
      ]),
      transition('* => void', [
        style({opacity: 1, transform: 'translate(-50%, 0)'}),
        animate('300ms ease-out', style({opacity: 0, transform: 'translate(-50%, -25%)'}))
      ])
    ])
  ],
  providers: [DomRenderer]
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @Input() header: string;
  @Input() width: any;
  @Input() height: any;
  @Input() theme: string;
  @Input() delay: number;
  @Input() closeIcon = true;
  @Input() type: string;
  @Input() size: string;
  @Input() spinner: string;
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('prompt') promptInput: ElementRef;
  _visible: boolean;
  zIndex: number;
  modal: HTMLDivElement;
  mask: HTMLDivElement;
  modalState: string;
  maskClickListener: Function;
  isDown: boolean;
  point: any;
  left: number;
  top: number;
  data: any;
  modalClass: any;
  initialized: boolean;
  visibleChangeState: boolean;
  documentClickListener: any;
  documentMousemoveListener: any;
  documentMouseupListener: any;
  @HostListener('window:resize') onResize = () => {
    this.center();
  };

  constructor(public er: ElementRef,
              public domRenderer: DomRenderer,
              public renderer2: Renderer2) {
    this.data = {done: true};
    this.modalState = 'in';
    this.theme = 'default';
  }

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    if (this.initialized) {
      if (this._visible) {
        this.show();
      } else {
        if (this.visibleChangeState) {
          this.visibleChangeState = false;
        } else {
          this.close();
        }
      }
    }
  }

  ngAfterViewInit() {
    this.modalClass = {
      'free-modal-lg': this.size === 'lg',
      'free-modal-sm': this.size === 'sm'
    };
    const modal = this.er.nativeElement;
    this.documentClickListener = this.renderer2.listen(modal, 'click', (e) => {
      if (this.initialized && this.visible) {
        let target = e.target;
        while (target) {
          if (this.domRenderer.hasClass(target, 'free-modal')) {
            break;
          }
          if (this.domRenderer.hasClass(target, 'cancel')) {
            this.close();
            break;
          }
          target = target.parentNode;
        }
      }
    });
    this.zIndex = 10002;
    modal.classList.add('free-' + this.theme);
    this.initialized = true;
  }

  show() {
    this._visible = true;
    this.center();
    this.addOverlay();
    if (this.delay) {
      setTimeout(() => {
        this.close();
      }, this.delay);
    }
  }

  confirm() {
    let data;
    if (this.type === 'prompt') {
      data = { value: this.promptInput.nativeElement.value, done: true};
    } else {
      data = {done: true};
    }
    this.data = data;
    this.close();
  }

  hide() {
    this.onChange.emit(this.data);
    if (this.mask) {
      this.renderer2.removeChild(document.body, this.mask);
    }
  }

  close() {
    this.visibleChangeState = true;
    this.hide();
    this.visibleChange.emit(false);
    this.mask = null;
    this.data = {done: true};
  }

  addOverlay() {
    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.className = 'free-modal-mask';
      this.mask.style.cssText = 'position: fixed;top:0;left:0;width:100%;height:100%;' +
             'opacity:.5;background:#000;';
      this.mask.style.zIndex = (this.zIndex - 1) + '';
      this.maskClickListener = this.renderer2.listen(this.mask, 'click', (event: any) => {
        this.close();
      });
      document.body.appendChild(this.mask);
    }
  }

  center() {
    this.left = window.innerWidth / 2;
    // this.top = window.innerHeight / 2;
  }

  onMouseDown(event: any) {
    this.modal = this.er.nativeElement.firstElementChild;
    this.isDown = true;
    this.point = {
      pageX: event.pageX,
      pageY: event.pageY
    };
    this.documentMousemoveListener = this.renderer2.listen('document', 'mousemove', (e) => {
      this.modal.style.transitionDuration = '0ms';
      if (this.isDown) {
        this.left += e.pageX - this.point.pageX;
        this.top += e.pageY - this.point.pageY;
      }
      this.point = {
        pageX: e.pageX,
        pageY: e.pageY
      };
    });
    this.documentMousemoveListener = this.renderer2.listen('document', 'mouseup', (e) => {
      this.isDown = false;
      this.modal.style.transitionDuration = '300ms';
    });
  }

  unbindDocumentMouseListener() {
    if (this.documentMousemoveListener) {
      this.documentMousemoveListener();
      this.documentMousemoveListener = null;
    }
    if (this.documentMouseupListener) {
      this.documentMouseupListener();
      this.documentMouseupListener = null;
    }
  }

  ngOnDestroy() {
    this.visibleChangeState = false;
    this.unbindDocumentMouseListener();
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
}

@NgModule({
  imports: [CommonModule, ButtonModule, LoadingModule],
  declarations: [ModalComponent],
  exports: [ModalComponent, ShareModule]
})

export class ModalModule {}

import {CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, Input, Output, EventEmitter,
  Renderer2, ElementRef, ViewChild, AfterContentInit, AfterViewInit
} from '@angular/core';
import { trigger, style, state, animate, transition} from '@angular/animations';
import { ShareModule } from '../common/share';
import {ButtonModule} from '../button/button.directive';
import {LoadingModule} from '../loading/loading.component';

@Component({
  selector: 'free-modal',
  template: `
    <div #modal class="free-modal" [style.width.px]="width" [style.height.px]="height"
         [@fadeInScale]="modalClass" (@fadeInScale.start)="animationEnd($event)"
         [style.display]="visible ? 'block' : 'none'">
      <div class="free-modal-header" *ngIf="!spinner">
        <span *ngIf="header">{{header}}</span>
        <span><ng-content select="f-header"></ng-content></span>
        <span *ngIf="closeIcon" class="free-modal-close" (click)="close()">
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
            <button fButton (click)="confirm()">确认</button>
          </ng-template>
          <ng-template ngSwitchCase="confirm">
            <button fButton (click)="close()">关闭</button>
            <button fButton (click)="confirm()">确认</button>
          </ng-template>
          <ng-template ngSwitchCase="prompt">
            <button fButton (click)="close()">关闭</button>
            <button fButton (click)="confirm()">确认</button>
          </ng-template>
        </ng-container>
        <ng-content select="f-footer"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInScale', [
      state('active', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('inactive', style({
        opacity: 0.7,
        transform: 'scale(0)'
      })),
      transition('active <=> inactive', animate('.3s ease'))
    ])
  ]
})
export class ModalComponent implements OnInit, AfterContentInit, AfterViewInit {

  _visible: boolean;
  modal: HTMLDivElement;
  mask: HTMLDivElement;
  modalClass: string;
  maskClickListener: Function;
  container: any;
  @Input() header: string;
  @Input() width: any;
  @Input() height: any;
  @Input() modalColor: string;
  @Input() delay: number;
  @Input() closeIcon = true;
  @Input() type: string;
  @Input() spinner: string;
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') modalViewChild: ElementRef;
  @ViewChild('prompt') promptInput: ElementRef;

  constructor(private er: ElementRef,
              public renderer2: Renderer2) { }

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;

    if (this._visible) {
      this.show();
    } else {
      this.close();
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.modal = this.modalViewChild.nativeElement;
    if (this.spinner) {
      this.renderer2.addClass(this.modal, 'free-modal-spinner');
    }
  }

  ngAfterContentInit() {
    this.container = this.er.nativeElement;

    const cancel = Array.from(this.container.querySelectorAll('.cancel'));
    for (const c of cancel) {
      this.renderer2.listen(c, 'click', () => this.close());
    }
  }

  animationEnd(event: any) {
  }

  show() {
    this.center();
    this.modalClass = this.visible ? 'active' : 'inactive';
    this.addOverlay();

    if (this.delay) {
      setTimeout(() => {
        this.close();
      }, this.delay);
    }
  }

  confirm() {
    let data = { value: null };
    if (this.type === 'prompt') {
      data = { value: this.promptInput.nativeElement.value};
    }
    this.onChange.emit(data);
    this.close();
  }

  close() {
    this.modalClass = this.visible ? 'active' : 'inactive';
    this.visibleChange.emit(false);
    if (this.mask) {
      this.renderer2.removeChild(document.body, this.mask);
    }
    this.mask = null;
  }

  addOverlay() {
    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.className = 'free-modal-mask';
      this.mask.style.cssText = 'position: fixed;top:0;left:0;width:100%;height:100%;' +
             'opacity:.5;background:#000;';
      this.mask.style.zIndex = (parseInt(this.modal.style.zIndex, 10) - 1) + '';
      this.maskClickListener = this.renderer2.listen(this.mask, 'click', (event: any) => {
        this.close();
      });
      document.body.appendChild(this.mask);
    }
  }

  center() {
    this.modal.style.zIndex = '10002';
    this.modal.classList.add('free-' + this.modalColor);
    const win = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let mw = {
      width: this.modal.offsetWidth,
      height: this.modal.offsetHeight
    };

    if (mw.width === 0 || mw.height === 0) {
      this.modal.style.visibility = 'hidden';
      this.modal.style.display = 'block';
      mw = {
        width: this.modal.offsetWidth,
        height: this.modal.offsetHeight
      };
      this.modal.style.visibility = 'visible';
      this.modal.style.display = 'none';
    }

    this.modal.style.left = (win.width - mw.width) / 2 + 'px';
    this.modal.style.top = (win.height - mw.height) / 2 + 'px';
  }

}

@NgModule({
  imports: [CommonModule, ButtonModule, LoadingModule],
  declarations: [ModalComponent],
  exports: [ModalComponent, ShareModule]
})

export class ModalModule {}

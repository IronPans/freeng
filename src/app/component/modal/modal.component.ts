import {CommonModule} from '@angular/common';
import { NgModule, Component, OnInit, Input, Output, EventEmitter,
         Renderer2, ElementRef, ViewChild } from '@angular/core';
import { trigger, style, state, animate, transition} from '@angular/animations';
import { ShareModule } from '../common/share';

@Component({
  selector: 'free-modal',
  template: `
    <div #modal class="free-modal" [style.width.px]="width" [style.height.px]="height"
         [@fadeInScale]="modalClass" [style.display]="visible ? 'block' : 'none'">
      <div class="free-modal-header">
        <span *ngIf="header">{{header}}</span>
        <span><ng-content select="f-header"></ng-content></span>
        <span *ngIf="closeIcon" class="free-modal-close" (click)="close()"><i class="fa fa-close"></i></span>
      </div>
      <div class="free-modal-content">
        <ng-content></ng-content>
      </div>
      <div class="free-modal-footer">
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
export class ModalComponent implements OnInit {

  @Input() header: string;
  @Input() width: any;
  @Input() height: any;
  @Input() modalColor: string;
  @Input() draggable: boolean;
  @Input() closeIcon = true;
  _visible: boolean;
  @ViewChild('modal') modalViewChild: ElementRef;

  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  modal: HTMLDivElement;
  mask: HTMLDivElement;
  modalClass: string;
  maskClickListener: Function;

  constructor(public renderer2: Renderer2) { }

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

  ngOnInit() {
  }

  show() {
    this.center();
    this.modalClass = this.visible ? 'active' : 'inactive';

    this.addOverlay();
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
    this.modal = this.modalViewChild.nativeElement;
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
  imports: [CommonModule],
  declarations: [ModalComponent],
  exports: [ModalComponent, ShareModule]
})

export class ModalModule {}

import { CommonModule } from '@angular/common';
import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'free-mask',
  template: `
    <div class="free-mask" [ngStyle]="style" *ngIf="visible" [@fadeInState]
         (@fadeInState.done)="transitionEnd()" (click)="onClose()">
      <ng-content></ng-content>
      <span *ngIf="close" class="fa fa-close"></span>
    </div>`,
  animations: [trigger('fadeInState', [
    state('in', style({opacity: 1})),
    transition('void => *', [
      style({opacity: 0}),
      animate('.3s cubic-bezier(.35,0,.25,1)')
    ])
  ])]
})
export class MaskComponent {
  _visible: boolean;
  timeoutId: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() close: boolean;
  @Input() delay: number;
  @Input() style: any;
  @Input() dismissMask: boolean;
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
  }

  constructor() {
    this.style = {};
  }

  transitionEnd() {
    if (!!this.delay && !this.timeoutId) {
      this.timeoutId = setTimeout(() => {
        this.visible = false;
      }, this.delay);
    } else if (this.timeoutId) {
      this.timeoutId = null;
    }
  }

  onClose() {
    if (this.dismissMask) {
      this.visible = false;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [MaskComponent],
  exports: [MaskComponent]
})

export class MaskModule {}

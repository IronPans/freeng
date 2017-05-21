import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn } from '../common/animations';

@Component({
  selector: 'free-mask',
  template: `
    <div class="free-mask" *ngIf="visible" [@fadeInState] 
       (@fadeInState.done)="transitionEnd()">
      <ng-content></ng-content>
      <span *ngIf="close" class="fa fa-close"></span>
    </div>`,
  styleUrls: ['./mask.component.scss'],
  animations: [fadeIn]
})
export class MaskComponent implements OnInit {

  _visible: boolean;
  timeoutId: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input() close: boolean;
  @Input() delay: number;
  @Input()
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    this.visibleChange.emit(this._visible);
  }
  constructor() { }

  ngOnInit() {}

  transitionEnd() {
    if (!!this.delay && !this.timeoutId) {
      this.timeoutId = setTimeout(() => {  // 注意: 必须使用箭头函数,不然函数里面的this指向的是window
        this.visible = false;
      }, this.delay);
    } else if (this.timeoutId) {
      this.timeoutId = null;
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [MaskComponent],
  exports: [MaskComponent]
})

export class MaskModule {}

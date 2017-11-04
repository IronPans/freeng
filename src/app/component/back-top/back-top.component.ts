import {Component, Input, NgModule, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {ScrollRenderer} from '../common/scroll';

@Component({
  selector: 'free-back-top',
  template: `
    <div [ngClass]="styleClass" (click)="onScrollTop()" [@enterLeave] *ngIf="visible">
      <ng-content></ng-content>
    </div>
  `,
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ],
  providers: [ScrollRenderer]
})
export class BackTopComponent implements OnInit, OnDestroy {
  @Input() get target() {
    return this._target;
  }
  set target(el: HTMLElement) {
    if (el) {
      this._target = el;
      this.scrollTop = this._target.scrollHeight;
    }
  }
  @Input() visibleHeight: number;
  @Input() styleClass: any;
  _target: any;
  visible: boolean;
  scrollTop: number;
  elementScrollListener: any;
  destination: number;
  duration: number;
  easing: string;
  constructor(public renderer2: Renderer2,
      public scrollRenderer: ScrollRenderer) {
    this.visibleHeight = 10;
    this.duration = 200;
    this.destination = 0;
    this.easing = 'linear';
    this.styleClass = {};
  }

  ngOnInit() {
    if (this._target) {
      this.elementScrollListener = this.renderer2.listen(this._target, 'scroll', () => {
        this.visible = this._target.scrollTop >= this.visibleHeight;
      });
      this.styleClass['free-back-top'] = true;
    }
  }

  onScrollTop() {
    if (this._target) {
      this.scrollRenderer.scrollToTop(this._target, this.duration, this.easing, this.destination);
    }
  }

  ngOnDestroy() {
    if (this.elementScrollListener) {
      this.elementScrollListener();
      this.elementScrollListener = null;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [BackTopComponent],
  exports: [BackTopComponent]
})
export class BackTopModule {}

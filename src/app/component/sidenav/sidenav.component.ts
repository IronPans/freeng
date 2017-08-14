import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, NgModule, Output, Renderer2,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'free-sidenav',
  template: `
    <div class="free-sidenav" #container [ngStyle]="style">
      <div class="free-sidenav-overlay" *ngIf="overlay" (click)="toggle(false)"></div>
      <div class="free-sidenav-wrapper" *ngIf="_visible" [@slideState]="direction + 'In'"
           (@slideState.start)="transitionStart()" (@slideState.done)="transitionEnd()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('slideState', [
      state('leftIn rightIn', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => leftIn', [
        style({transform: 'translate3d(-100%, 0, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('void => rightIn', [
        style({transform: 'translate3d(100%, 0, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('leftIn => void', [
        animate('300ms linear', style({
          transform: 'translate3d(-100%, 0, 0)'
        }))
      ]),
      transition('rightIn => void', [
        animate('300ms linear', style({
          transform: 'translate3d(100%, 0, 0)'
        }))
      ])
    ])
  ]
})
export class SidenavComponent implements AfterViewInit {
  _visible: boolean;
  @Input() direction: string;
  @Input() overlay: boolean;
  @Input() style: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') containerViewChild: ElementRef;
  container: HTMLDivElement;
  @Input()
  set visible(value: boolean) {
    this.toggle(value);
  }

  get visible(): boolean {
    return this._visible;
  }

  constructor(public renderer2: Renderer2) {
    this.direction = 'left';
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    this.renderer2.addClass(this.container, `free-sidenav-${this.direction}`);
  }

  toggle(visible: boolean) {
    if (this.container) {
      this._visible = visible;
      if (visible) {
        this.renderer2.addClass(this.container, 'free-sidenav-active');
      } else {
        this.renderer2.removeClass(this.container, 'free-sidenav-active');
      }
    }
    this.onChange.emit({
      open: visible
    });
  }

  transitionStart() {
    this.renderer2.setStyle(this.container, 'display', 'block');
  }

  transitionEnd() {
    if (!this.visible) {
      this.renderer2.setStyle(this.container, 'display', 'none');
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})

export class SidenavModule {}

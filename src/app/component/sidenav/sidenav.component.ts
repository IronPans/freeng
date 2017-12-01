import {
  AfterContentInit,
  AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, NgModule, Output, Renderer2,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'free-sidenav-content',
  template: `
    <div class="free-sidenav-content">
      <ng-content></ng-content>
    </div>
  `
})
export class SidenavContentComponent {
  constructor(public er: ElementRef) {}
}

@Component({
  selector: 'free-sidenav',
  template: `
    <div class="free-sidenav" #container [ngStyle]="style">
      <div class="free-sidenav-overlay" [style.background]="overlayBackground"
           *ngIf="overlay || outside" [class.free-sidenav-outside]="outside" (click)="toggle(false)"></div>
      <div class="free-sidenav-wrapper" [ngStyle]="navStyle" [@slideState]="stateName"
           (@slideState.start)="transitionStart()" (@slideState.done)="transitionEnd()">
        <ng-content></ng-content>
      </div>
      <ng-content select="free-sidenav-content"></ng-content>
    </div>
  `,
  animations: [
    trigger('slideState', [
      state('leftIn rightIn topIn bottomIn', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('inactive => leftIn', [
        style({transform: 'translate3d(-100%, 0, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('inactive => rightIn', [
        style({transform: 'translate3d(100%, 0, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('inactive => topIn', [
        style({transform: 'translate3d(0, -100%, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('inactive => bottomIn', [
        style({transform: 'translate3d(0, 100%, 0)'}),
        animate('300ms linear', style({
          transform: 'translate3d(0, 0, 0)'
        }))
      ]),
      transition('leftIn => inactive', [
        animate('300ms linear', style({
          transform: 'translate3d(-100%, 0, 0)'
        }))
      ]),
      transition('rightIn => inactive', [
        animate('300ms linear', style({
          transform: 'translate3d(100%, 0, 0)'
        }))
      ]),
      transition('topIn => inactive', [
        animate('300ms linear', style({
          transform: 'translate3d(0, -100%, 0)'
        }))
      ]),
      transition('bottomIn => inactive', [
        animate('300ms linear', style({
          transform: 'translate3d(0, 100%, 0)'
        }))
      ])
    ])
  ]
})
export class SidenavComponent implements AfterViewInit, AfterContentInit {
  _visible: boolean;
  @Input() direction: string;
  @Input() overlay: boolean;
  @Input() style: any;
  @Input() navStyle: any;
  @Input() outside: boolean;
  @Input() overlayBackground: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') containerViewChild: ElementRef;
  @ContentChild(SidenavContentComponent) contentViewChild: any;
  content: HTMLDivElement;
  container: HTMLDivElement;
  width: string;
  height: string;
  stateName: string;
  @Output() visibleChange: EventEmitter<any> = new EventEmitter();
  @Input()
  set visible(value: boolean) {
    this.toggle(value);
  }

  get visible(): boolean {
    return this._visible;
  }

  constructor(public renderer2: Renderer2) {
    this.direction = 'left';
    this.width = '250px';
    this.height = '200px';
    this.stateName = 'inactive';
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    this.renderer2.addClass(this.container, `free-sidenav-${this.direction}`);
    if (this.navStyle && this.navStyle.width) {
      this.width = this.navStyle.width;
    }
    if (this.navStyle && this.navStyle.height) {
      this.height = this.navStyle.height;
    }
  }

  ngAfterContentInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.contentViewChild) {
      this.renderer2.addClass(this.container, 'free-sidenav-push');
      this.content = this.contentViewChild.er.nativeElement.firstElementChild;
    }
  }

  toggle(visible: boolean) {
    if (this.container) {
      this._visible = visible;
      if (visible) {
        if (this.content) {
          this.renderer2.setStyle(this.content, 'transform', this.getTransform(this.direction));
        }
        this.renderer2.addClass(this.container, 'free-sidenav-active');
        this.stateName = this.direction + 'In';
      } else {
        if (this.content) {
          this.renderer2.setStyle(this.content, 'transform', this.getTransform(''));
        }
        this.renderer2.removeClass(this.container, 'free-sidenav-active');
        this.stateName = 'inactive';
      }
    }
    this.visibleChange.emit(this._visible);
    this.onChange.emit({
      open: visible
    });
  }

  getTransform(direction) {
    let transform;
    switch (direction) {
      case 'top':
        transform = `translate3d(0, ${this.height}, 0)`;
        break;
      case 'right':
        transform = `translate3d(-${this.width}, 0, 0)`;
        break;
      case 'bottom':
        transform = `translate3d(0, -${this.height}, 0)`;
        break;
      case 'left':
        transform = `translate3d(${this.width}, 0, 0)`;
        break;
      default:
        transform = 'translate3d(0, 0, 0)'
    }
    return transform;
  }
  transitionStart() {
    this.renderer2.setStyle(this.container, 'display', 'block');
  }

  transitionEnd() {
    if (!this.visible && !this.contentViewChild) {
      this.renderer2.setStyle(this.container, 'display', 'none');
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SidenavContentComponent, SidenavComponent],
  exports: [SidenavContentComponent, SidenavComponent]
})

export class SidenavModule {}

import {
  AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, IterableDiffers,
  NgModule, OnInit, Output, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {style, trigger, state, animate, transition} from '@angular/animations';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-notification',
  template: `
    <div #container class="free-notification free-notification-{{direction}}" [style.zIndex]="zIndex">
      <div class="free-notification-item free-notification-{{message.theme || theme}}"
           #item *ngFor="let message of messages;index as i"
           [@moveInState]="moveState" (@moveInState.done)="onMoveInDone(item, i)">
        <div class="free-notification-avatar" *ngIf="message.icon">
          <i class="fa fa-{{message.icon}}"></i>
        </div>
        <div class="free-notification-avatar" *ngIf="message.avatar">
          <img [src]="message.avatar">
        </div>
        <div class="free-notification-item-content">
          <div class="free-notification-title">{{message.title}}</div>
          <div class="free-notification-message">{{message.content}}</div>
        </div>
        <a class="free-notification-close" (click)="remove(message, i)">
          <i class="fa fa-close"></i>
        </a>
        <div class="free-notification-progress" *ngIf="delay && progress">
          <div class="free-notification-progress-bar" (transitionend)="onTransitionEnd(message, index)"></div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('moveInState', [
      state('topRightIn, topLeftIn, bottomRightIn, bottomLeftIn', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => topRightIn, void => bottomRightIn', [
        style({
          opacity: 0,
          transform: 'translate3d(100%, 0, 0)'
        }),
        animate('.25s cubic-bezier(.25,.8,.25,1)')
      ]),
      transition('void => topLeftIn, void => bottomLeftIn', [
        style({
          opacity: 0,
          transform: 'translate3d(-100%, 0, 0)'
        }),
        animate('.25s cubic-bezier(.25,.8,.25,1)')
      ]),
      transition(':leave', animate('.1s', style({
        opacity: 0
      })))
    ])
  ],
  providers: [DomRenderer]
})
export class NotificationComponent implements OnInit, DoCheck, AfterViewInit {

  @Input() get messages(): any[] {
    return this._messages;
  }
  set messages(value: any[]) {
    if (value) {
      this._messages = value;
      const length = this._messages.length;
      if (length > 10) {
        this._messages = this._messages.slice(length - 10);
      }
    }
  }
  @Input() get direction() {
   return this._direction;
  }

  set direction(value: string) {
    if (value) {
      this._direction = value;
      this.moveState = value + 'In';
    }
  }
  @Input() delay: number;
  @Input() maxMessage: number;
  @Input() progress: boolean;
  @Input() theme: string;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') containerViewChild: ElementRef;
  container: HTMLDivElement;
  items: any[];
  moveState: string;
  _direction: string;
  _messages: any[];
  zIndex: number;
  differ: any;
  constructor(public domRenderer: DomRenderer,
              public differs: IterableDiffers) {
    this.direction = 'topRight';
    this.maxMessage = 10;
    this.progress = true;
    this.theme = 'default';
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.moveState = this.direction + 'In';
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.messages);
    if (changes) {
      this.handleValueChange();
    }
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
  }

  handleValueChange() {
    this.zIndex = ++DomRenderer.zIndex;
  }

  remove(item: any, index: number) {
    this._messages.splice(index, 1);
    this.onClose.emit({
      message: item,
      index: index
    });
  }

  onMoveInDone(item: any, index: number) {
    if (this.delay) {
      if (this.progress) {
        const bar = item.querySelector('.free-notification-progress-bar');
        this.domRenderer.css(bar, {
          transitionDuration: this.delay + 'ms'
        });
        this.domRenderer.addClass(bar, 'free-notification-progress-hide');
      }
    }
  }

  onTransitionEnd(item: any, index: number) {
    this.messages.forEach((msg, i) => {
      if (msg === item) {
        this._messages.splice(i, 1);
      }
    })
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})

export class NotificationModule {}

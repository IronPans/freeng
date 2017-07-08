import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit,
  Input, ElementRef, ViewContainerRef, Inject, forwardRef, EventEmitter, OnDestroy, ViewChild
} from '@angular/core';
import {AppComponent} from '../../app.component';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-toast',
  template: `
      <div class="free-toast" #toast [ngClass]="{'free-toast-open': isOpen}" [style.left]="left">
          <div>{{message}}</div>
          <span class="fa fa-close free-toast-close" (click)="close()"></span>
      </div>
  `,
  styleUrls: ['./toast.component.scss'],
  providers: [DomRenderer]
})
export class ToastComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() duration: number;
  @Input() message: string;
  @Input() position: string;
  @Input() type: string;
  @Input()
  set data(value: any) {
    this._data = value;
    this.duration = value.duration;
    this.message = value.message;
    this.position = value.position || 'top';
    this.type = value.type;
  };
  get data() {
    return this._data;
  }
  _data: any;
  @ViewChild('toast') toast: ElementRef;
  _toast: HTMLDivElement;
  onClose = new EventEmitter();
  isOpen: boolean;
  left: string;
  viewContainerRef: ViewContainerRef;
  container: HTMLDivElement;
  constructor(private er: ElementRef,
              private domRenderer: DomRenderer,
              @Inject(forwardRef(() => AppComponent)) app: AppComponent) {
    this.viewContainerRef = app._toastPortal;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.container = this.er.nativeElement;
    this._toast = this.toast.nativeElement;
    if (this.type) {
      this.domRenderer.addClass(this._toast, this.type);
    }
    this.domRenderer.addClass(this._toast, `free-toast-${this.position}`);
    this.domRenderer.css(this._toast, {
      'zIndex': 20000 + this.viewContainerRef.length
    });
    const width = this.container.offsetWidth;
    this.isOpen = true;
    if (this.duration) {
      const delay = this.duration;
      setTimeout(() => {
        this.close();
      }, delay);
    }
  }

  close() {
    this.isOpen = false;
    this.onClose.emit();
  }

  ngOnDestroy() {
    this.onClose.unsubscribe();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  entryComponents: [ToastComponent]
})

export class ToastModule {}

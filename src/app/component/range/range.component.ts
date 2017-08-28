import { CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output,
  ViewChild, ElementRef, Renderer2, EventEmitter, forwardRef, OnDestroy
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomRenderer} from '../common/dom';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangeComponent),
  multi: true
};

@Component({
  selector: 'free-range',
  template: `
    <div #range class="free-range" (mousedown)="onTouchstart($event)"
         [class.free-range-vertical]="vertical" [ngStyle]="{width: width, height: height}">
      <div class="range-bar" [ngStyle]="{height: rangeHeight, width: rangeWidth}"></div>
      <div class="range-bar range-bar-active" #track
           [ngStyle]="{height: rangeHeight, width: rangeWidth}"></div>
      <div class="range-knob-handle" #thumb>
        <div class="range-knob"></div>
      </div>
      <span class="range-slider-tooltip" #tooltip [style.opacity]="tip?'1':'0'">0</span>
    </div>
  `,
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RangeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() min: number;
  @Input() max: number;
  @Input() vertical: boolean;
  @Input()
  set value(value: any) {
    if (isNaN(value)) {
      this._value = this.min;
    } else {
      this._value = value;
    }
  }
  get value() {
    return this._value;
  }
  @Input() width: any;
  @Input() height: any;
  @Input() theme: string;
  @Input() rangeHeight: any;
  @Input() rangeWidth: any;
  @Input() handleSize: any;
  @Input() tip: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('range') _range: ElementRef;
  @ViewChild('tooltip') _tooltip: ElementRef;
  @ViewChild('thumb') thumbViewChild: ElementRef;
  @ViewChild('track') _track: ElementRef;
  tooltip: HTMLDivElement;
  range: HTMLDivElement;
  thumb: HTMLDivElement;
  track: HTMLDivElement;
  touch: any;
  timeoutID: any;
  input: any;
  maxPercent: number;
  percent: any;
  _value: any;
  isPressed: boolean;
  documentTouchmoveListener: any;
  documentTouchendListener: any;
  thumbTop: number;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2,
              public domRenderer: DomRenderer) {
    this.maxPercent = 100;
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.width = 150;
    this.tip = true;
    this.handleSize = 1;
  }

  ngOnInit() {
    this.touch = this.domRenderer.getTouchEvent();
  }

  ngAfterViewInit() {
    this.tooltip = this._tooltip.nativeElement;
    this.range = this._range.nativeElement;
    this.thumb = this.thumbViewChild.nativeElement;
    this.track = this._track.nativeElement;
    if (this.theme) {
      this.renderer2.addClass(this.range, `free-${this.theme}`);
    }
    if (this.vertical) {
      if (this.height &&  typeof this.height === 'number') {
        this.height = <any> (this.height + 'px');
      } else {
        this.height = '150px';
      }
    }
    if (this.width &&  typeof this.width === 'number') {
      this.width = <any> (this.width + 'px');
    }
    if (this.handleSize) {
      this.domRenderer.setTransform(this.thumb, 'translate(-50%, -50%) scale(' + this.handleSize + ')');
    }
    this.pageInit();
    if (this.vertical) {
      this.width = this.thumb.offsetWidth + 'px';
    } else {
      this.range.style.height = this.thumb.offsetHeight * this.handleSize + 'px';
    }
  }

  writeValue(value: number) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  pageInit() {
    const t = this.max - this.min;
    const p = (this.value - this.min) / t;
    const current = Math.floor(p * this.range.offsetWidth);
    if (!isNaN(current)) {
      this.setValue(current);
    }
  }

  getPoint(element, event) {
    event = event || window.event;
    const touchEvent = this.touch.mobile ? event.changedTouches[0] : event;
    const rect = this.domRenderer.getRect(element);
    let x = (touchEvent.pageX ||
    touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
    x -= rect.left;
    let y = (touchEvent.pageY ||
    touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    y -= rect.top;
    return {
      x: x,
      y: y
    };
  }

  setValue(value) {
    let percent, left;
    if (this.vertical) {
      percent = value / this.range.offsetHeight * this.maxPercent;
    } else {
      percent = value / this.range.offsetWidth * this.maxPercent;
    }
    if (percent >= this.maxPercent) {
      percent = this.maxPercent;
    } else if (percent <= 0) {
      percent = 0;
    }
    percent = parseFloat(percent.toFixed(4));
    const t = this.max - this.min;
    const cp = Math.ceil(t * percent / 100) + this.min;
    if (this.vertical) {
      this.thumb['style'].top = percent + '%';
      this.track['style'].top = (100 - (this.maxPercent - percent)) + '%';
    } else {
      this.thumb['style'].left = percent + '%';
      this.track['style'].right = (this.maxPercent - percent) + '%';
    }
    this.value = cp;
    this.percent = percent;
    if (this.tip) {
      const currentPercent = percent / this.maxPercent;
      if (!this.thumbTop) {
        this.tooltip.style.opacity = '0';
        this.thumbTop = 1;
      }
      if (this.vertical) {
        this.tooltip.textContent = (this.maxPercent - this.value) + '';
        left = Math.floor(this.range.offsetHeight * currentPercent - this.tooltip.offsetWidth / 2);
        this.domRenderer.setTransform(this.tooltip,
          'translate3d(' + this.thumb.offsetWidth + 'px, ' + left + 'px, 0)');
      } else {
        this.tooltip.textContent = this.value;
        left = Math.floor(this.range.offsetWidth * currentPercent - this.tooltip.offsetWidth / 2);
        this.domRenderer.setTransform(this.tooltip, 'translate3d(' + left + 'px, -100%, 0)');
      }
    }
  }

  getValue(e) {
    const v = this.getPoint(this.range, e);
    if (this.vertical) {
      this.setValue(v.y);
    } else {
      this.setValue(v.x);
    }
    this.onChange.emit({'value': this.value});
    this.onModelChange(this.value);
  }

  onTouchstart(e) {
    if (e.button) {
      return;
    }
    if (this.tip) {
      this.tooltip.style.opacity = '.8';
    }
    clearTimeout(this.timeoutID);
    this.getValue(e);
    this.isPressed = true;
    this.documentTouchmoveListener = this.renderer2.listen('body', this.touch.touchmove, ($event) => {
      this.onTouchmove($event);
    });
    this.documentTouchendListener = this.renderer2.listen('body', this.touch.touchend, () => {
      this.onTouchend();
    });
  }

  onTouchmove(event: any) {
    if (this.isPressed) {
      if (this.tip) {
        this.tooltip.style.opacity = '.8';
      }
      this.getValue(event);
    }
  }

  onTouchend() {
    this.isPressed = false;
    this.hide(this.tooltip);
    this.unbindDocumentClickListener();
  }

  hide(elem) {
    this.timeoutID = setTimeout(function () {
      elem.style.opacity = '0';
    }, 200);
  }

  unbindDocumentClickListener() {
    if (this.documentTouchmoveListener) {
      this.documentTouchmoveListener();
      this.documentTouchmoveListener = null;
    }
    if (this.documentTouchendListener) {
     this.documentTouchendListener();
     this.documentTouchendListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RangeComponent],
  exports: [RangeComponent]
})

export class RangeModule {}

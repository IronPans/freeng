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
    <div #range class="free-range" (mousedown)="onTouchstart($event)">
      <div class="range-bar"></div>
      <div class="range-bar range-bar-active" #track></div>
      <div class="range-knob-handle" #thumb>
        <div class="range-knob"></div>
      </div>
      <span class="range-slider-tooltip" #tooltip></span>
    </div>
  `,
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RangeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() min: number;
  @Input() max: number;
  @Input() value: any;
  @Input() width: number;
  @Input() theme: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('range') _range: ElementRef;
  @ViewChild('tooltip') _tooltip: ElementRef;
  @ViewChild('thumb') _thumb: ElementRef;
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
  isPressed: boolean;
  documentTouchmoveListener: any;
  documentTouchendListener: any;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2,
              public domRenderer: DomRenderer) {
    this.maxPercent = 100;
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.width = 150;
  }

  ngOnInit() {
    this.touch = this.domRenderer.getTouchEvent();
  }

  ngAfterViewInit() {
    this.tooltip = this._tooltip.nativeElement;
    this.range = this._range.nativeElement;
    this.thumb = this._thumb.nativeElement;
    this.track = this._track.nativeElement;
    if (this.theme) {
      this.renderer2.addClass(this.range, `free-${this.theme}`);
    }
    this.pageInit();
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
    let percent = value / this.range.offsetWidth * this.maxPercent;
    if (percent >= this.maxPercent) {
      percent = this.maxPercent;
    } else if (percent <= 0) {
      percent = 0;
    }
    percent = parseFloat(percent.toFixed(4));
    const t = this.max - this.min;
    const cp = Math.ceil(t * percent / 100) + this.min;
    this.thumb['style'].left = percent + '%';
    this.track['style'].right = (this.maxPercent - percent) + '%';
    this.value = cp;
    this.percent = percent;

    const currentPercent = percent / this.maxPercent;
    const left = Math.floor(this.range.offsetWidth * currentPercent - this.tooltip.offsetWidth / 2);
    this.tooltip.textContent = this.value;
    this.domRenderer.setTransform(this.tooltip, 'translate3d(' + left + 'px,-100%,0)');
  }

  getValue(e) {
    const v = this.getPoint(this.range, e);
    this.setValue(v.x);
    this.onChange.emit({'value': this.value});
    this.onModelChange(this.value);
  }

  onTouchstart(e) {
    if (e.button) {
      return;
    }
    clearTimeout(this.timeoutID);
    this.getValue(e);
    this.show(this.tooltip);
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
      this.show(this.tooltip);
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
      elem.style.display = 'none';
    }, 200);
  }

  show(elem) {
    elem.style.display = 'block';
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

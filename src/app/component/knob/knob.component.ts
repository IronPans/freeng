import {AfterViewInit, Component, ElementRef, forwardRef,
  Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KnobComponent),
  multi: true
};

@Component({
  selector: 'free-knob',
  template: `
    <div class="free-knob" [ngStyle]="{width: size + 'px', height: size + 'px'}">
      <canvas #canvas></canvas>
      <div class="free-knob-inner">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class KnobComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() size: number;
  @Input() value: any;
  @Input() trackColor: string;
  @Input() barColor: string;
  @Input() lineWidth: number;
  @Input() round: boolean;
  @ViewChild('canvas') canvasViewChild: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: any;
  percent: number;
  currentValue: number;
  requestAnimationFrame: any;
  initialed: boolean;
  public onModelChange: Function = () => {};
  public onTouchChange: Function = () => {};
  constructor() {
    this.size = 100;
    this.trackColor = '#eee';
    this.barColor = '#5db2ff';
    this.lineWidth = 5;
    this.currentValue = 0;
    this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (m) {
      return window.setTimeout(m, 1000 / 60)
    };
  }

  ngOnInit() {
    this.getPercent();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasViewChild.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.draw();
    this.initialed = true;
  }

  getPercent() {
    let value = this.value;
    if (typeof value === 'string') {
      value = value.split('%')[0];
    }
    this.percent = value;
  }

  writeValue(value: any) {
    if (this.initialed) {
      this.value = value;
      this.currentValue = 0;
      this.getPercent();
      this.draw();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchChange = fn;
  }

  drawCircle(color: string, value: number, wise: boolean) {
    const halfWidth = this.size / 2;
    const halfHeight = this.size / 2;
    const radius = this.size / 2 - this.lineWidth;
    this.ctx.save();
    this.ctx.beginPath();
    if (this.round) {
      this.ctx.lineCap = 'round';
    }
    this.ctx.strokeStyle = color;
    this.ctx.translate(halfWidth, halfHeight);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2 * value / 100, wise);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  draw() {
    this.ctx.clearRect(0, 0 , this.size, this.size);
    this.drawCircle(this.trackColor, 100, true);
    this.currentValue++;
    this.drawCircle(this.barColor, this.currentValue, false);
    if (this.percent > this.currentValue) {
      this.requestAnimationFrame(() => this.draw());
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [KnobComponent],
  exports: [KnobComponent]
})
export class KnobModule {}

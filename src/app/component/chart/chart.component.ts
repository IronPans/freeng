import {AfterViewInit, Component, ElementRef, EventEmitter,
  Input, Output, NgModule, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as Chart from 'chart.js';

@Component({
  selector: 'free-chart',
  template: `
    <div class="free-chart">
      <canvas [attr.width]="width" [attr.height]="height" #canvas (click)="onCanvasClick($event)"></canvas>
    </div>
  `
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  @Input() width: number;
  @Input() height: number;
  @Input() type: string;
  @Input() options: any;
  _data: any;
  chart: any;
  @ViewChild('canvas') canvasViewChild: ElementRef;
  canvas: HTMLCanvasElement;
  @Output() onDataSelect: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.data = {};
  }

  @Input() get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.reInit();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasViewChild.nativeElement;
    this.initChart();
  }

  initChart() {
    this.chart = new Chart(this.canvas, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }

  getCanvas() {
    return this.canvas;
  }

  getBase64Image() {
    return this.chart.toBase64Image();
  }

  generateLegend() {
    if (this.chart) {
      this.chart.generateLegend();
    }
  }

  reInit() {
    if (this.chart) {
      this.chart.destroy();
      this.initChart();
    }
  }

  refresh() {
    if (this.chart) {
      this.chart.update();
    }
  }

  onCanvasClick(event) {
    if (this.chart) {
      const element = this.chart.getElementAtEvent(event);
      const dataset = this.chart.getDatasetAtEvent(event);
      if (element && element[0] && dataset) {
        this.onDataSelect.emit({originalEvent: event, element: element[0], dataset: dataset});
      }
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
@NgModule({
  imports: [CommonModule],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class ChartModule {}

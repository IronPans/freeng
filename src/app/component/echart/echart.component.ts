import {
  AfterViewInit, Component, ElementRef, EventEmitter,
  HostListener, Input, NgModule, OnDestroy, Output, ViewChild
} from '@angular/core';
import * as echarts from 'echarts';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-echart',
  template: `
    <div class="free-echart" [ngStyle]="style">
      <div class="free-echart-inner" #main></div>
    </div>
  `,
  providers: [DomRenderer]
})
export class EchartComponent implements AfterViewInit, OnDestroy {
  @Input() get option() {
    return this._option;
  }
  set option(opt: any) {
    if (opt) {
      this._option = opt;
      this.refresh();
    }
  }
  @Input() style: any;
  @Input() theme: any;
  @Input() inline: boolean;
  @Input() initOption: any;
  @Output() onDataSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('main') mainViewChild: ElementRef;
  main: HTMLDivElement;
  echarts: any;
  host$: any;
  initial: boolean;
  _option: any;

  @HostListener('window:resize') onResize() {
    if (this.echarts) {
      this.echarts.resize();
    }
  };

  constructor(public er: ElementRef,
              public domRenderer: DomRenderer) {
    this.theme = '';
    this.initOption = {};
  }

  ngAfterViewInit() {
    this.main = this.mainViewChild.nativeElement;
    this.host$ = this.er.nativeElement;
    if (this.inline) {
      this.domRenderer.addClass(this.host$, 'free-echart-inline');
    }
    this.initEChart();
    this.initial = true;
  }

  initEChart() {
    this.echarts = echarts.init(this.main, this.theme, this.initOption);
    this.refresh();
    this.echarts.on('click', (params) => {
      this.onDataSelect.emit(params);
    });
  }

  refresh() {
    if (this.echarts) {
      this.echarts.setOption(this.option);
    }
  }

  clear() {
    this.echarts.clear();
  }

  getDataURL(options: any = {}) {
    return this.getDataURL(options);
  }

  ngOnDestroy() {
    if (this.echarts) {
      this.echarts.dispose();
      this.echarts = null;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [EchartComponent],
  exports: [EchartComponent]
})
export class EchartModule {
}

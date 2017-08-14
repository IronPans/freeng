import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
export declare class ChartComponent implements AfterViewInit, OnDestroy {
    width: number;
    height: number;
    type: string;
    options: any;
    _data: any;
    chart: any;
    canvasViewChild: ElementRef;
    canvas: HTMLCanvasElement;
    onDataSelect: EventEmitter<any>;
    constructor();
    data: any;
    ngAfterViewInit(): void;
    initChart(): void;
    getCanvas(): HTMLCanvasElement;
    getBase64Image(): any;
    generateLegend(): void;
    reInit(): void;
    refresh(): void;
    onCanvasClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}

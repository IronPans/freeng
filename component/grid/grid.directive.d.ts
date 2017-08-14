import { ElementRef, AfterViewInit } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class GridDirective implements AfterViewInit {
    er: ElementRef;
    domRenderer: DomRenderer;
    grid: string;
    container: any;
    span: Array<any>;
    constructor(er: ElementRef, domRenderer: DomRenderer);
    ngAfterViewInit(): void;
}
export declare class GridModule {
}

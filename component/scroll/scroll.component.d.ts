import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class ScrollComponent implements OnInit, AfterViewInit {
    domRenderer: DomRenderer;
    er: ElementRef;
    _container: ElementRef;
    _thumb: ElementRef;
    _scrollbar: ElementRef;
    scrollClass: string;
    thumb: any;
    scrollbar: any;
    scrollHeight: number;
    offsetHeight: number;
    offsetTop: number;
    scrollBarHeight: number;
    scrollTop: number;
    isLoading: boolean;
    isRunning: boolean;
    container: any;
    wrapper: any;
    moveY: number;
    intervalId: any;
    isTouch: boolean;
    isMoz: boolean;
    WHEEL_EV: any;
    constructor(domRenderer: DomRenderer, er: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    refresh(): void;
    reset(): void;
    move(y: any): void;
    onWheel(e: any): void;
    scrollInit(): void;
    onMousedown(): void;
    onMousemove(): void;
    onMouseup(): void;
}
export declare class ScrollModule {
}

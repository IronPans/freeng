import { AfterViewInit, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class RippleDirective implements AfterViewInit {
    er: ElementRef;
    domRenderer: DomRenderer;
    rippleColor: string;
    container: HTMLDivElement;
    onClick(e: Event): void;
    constructor(er: ElementRef, domRenderer: DomRenderer);
    ngAfterViewInit(): void;
    ripple(event: any, $this: any): void;
}
export declare class RippleModule {
}

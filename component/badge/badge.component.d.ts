import { AfterViewInit, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class BadgeComponent implements AfterViewInit {
    domRenderer: DomRenderer;
    er: ElementRef;
    content: string;
    up: boolean;
    constructor(domRenderer: DomRenderer, er: ElementRef);
    ngAfterViewInit(): void;
}
export declare class BadgeModule {
}

import { OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class TooltipDirective implements OnInit, AfterViewInit {
    domRenderer: DomRenderer;
    er: ElementRef;
    renderer2: Renderer2;
    text: string;
    tooltipPosition: string;
    tooltip: any;
    constructor(domRenderer: DomRenderer, er: ElementRef, renderer2: Renderer2);
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    destroy(): void;
    create(): void;
}
export declare class TooltipModule {
}

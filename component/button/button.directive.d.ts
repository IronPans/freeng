import { AfterViewInit, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class ButtonDirective implements AfterViewInit {
    er: ElementRef;
    domRenderer: DomRenderer;
    button: HTMLButtonElement;
    icon: string;
    theme: string;
    direction: string;
    circle: string;
    round: number;
    size: string;
    loading: string;
    constructor(er: ElementRef, domRenderer: DomRenderer);
    ngAfterViewInit(): void;
}
export declare class BlockDirective implements AfterViewInit {
    domRenderer: DomRenderer;
    er: ElementRef;
    constructor(domRenderer: DomRenderer, er: ElementRef);
    ngAfterViewInit(): void;
}
export declare class ButtonGroupComponent {
}
export declare class ButtonModule {
}

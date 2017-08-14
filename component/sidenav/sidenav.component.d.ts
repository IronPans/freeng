import { AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
export declare class SidenavComponent implements AfterViewInit {
    renderer2: Renderer2;
    _visible: boolean;
    direction: string;
    overlay: boolean;
    style: any;
    onChange: EventEmitter<any>;
    containerViewChild: ElementRef;
    container: HTMLDivElement;
    visible: boolean;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    toggle(visible: boolean): void;
    transitionStart(): void;
    transitionEnd(): void;
}
export declare class SidenavModule {
}

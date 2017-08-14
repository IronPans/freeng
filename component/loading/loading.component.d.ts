import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class LoadingComponent implements AfterViewInit {
    renderer2: Renderer2;
    type: string;
    theme: string;
    container: ElementRef;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
}
export declare class LoadingModule {
}

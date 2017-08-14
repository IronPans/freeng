import { OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
export declare class ProgressComponent implements OnInit, AfterViewInit {
    renderer2: Renderer2;
    value: string;
    theme: string;
    move: boolean;
    striped: boolean;
    percent: boolean;
    container: ElementRef;
    bar: ElementRef;
    _bar: HTMLElement;
    _container: HTMLElement;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class ProgressModule {
}

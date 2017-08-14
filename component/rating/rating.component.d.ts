import { OnInit, AfterViewInit, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
export declare class RatingComponent implements OnInit, AfterViewInit {
    renderer2: Renderer2;
    stars: number;
    type: string;
    value: number;
    readonly: boolean;
    theme: string;
    hover: boolean;
    container: ElementRef;
    onChange: EventEmitter<any>;
    starArray: Number[];
    currentValue: number;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onClick($event: any, value: number): void;
    onMouseover($event: any, value: number): void;
    onMouseout(): void;
}
export declare class RatingModule {
}

import { AfterViewInit, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class SpinnerComponent implements ControlValueAccessor, AfterViewInit {
    renderer2: Renderer2;
    value: number;
    step: number;
    min: number;
    max: number;
    minus: ElementRef;
    onChange: EventEmitter<any>;
    onModelChange: Function;
    onTouchedChange: Function;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    onAdd(): void;
    onMinus(): void;
}
export declare class SpinnerModule {
}

import { AfterViewInit, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class RadioComponent implements ControlValueAccessor, AfterViewInit {
    renderer2: Renderer2;
    name: string;
    label: string;
    checked: boolean;
    disabled: boolean;
    value: any;
    theme: string;
    onClick: EventEmitter<any>;
    container: ElementRef;
    onModelChange: Function;
    onTouchChange: Function;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    onChange(e: any): void;
}
export declare class RadioModule {
}

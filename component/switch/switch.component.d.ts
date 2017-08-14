import { EventEmitter, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class SwitchComponent implements ControlValueAccessor, AfterViewInit {
    renderer2: Renderer2;
    label: string;
    checked: boolean;
    value: any;
    type: number;
    disabled: boolean;
    theme: string;
    onChange: EventEmitter<any>;
    container: ElementRef;
    onModelChange: Function;
    onTouchChange: Function;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    inputChange(event: any, value: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
export declare class SwitchModule {
}

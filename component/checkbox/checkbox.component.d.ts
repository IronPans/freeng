import { AfterViewInit, Renderer2, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class CheckboxComponent implements ControlValueAccessor, AfterViewInit {
    renderer2: Renderer2;
    name: string;
    label: string;
    checked: boolean;
    disabled: boolean;
    value: any;
    theme: string;
    onChange: EventEmitter<any>;
    container: ElementRef;
    checkedValue: any[];
    onModelChange: Function;
    onTouchedChange: Function;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    addValue(): void;
    isChecked(): boolean;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    onCheckboxChange(e: any): void;
}
export declare class CheckboxModule {
}

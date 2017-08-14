import { OnInit, Renderer2, OnDestroy, EventEmitter } from '@angular/core';
import { DomRenderer } from '../common/dom';
import { ControlValueAccessor } from '@angular/forms';
export declare class InputtextComponent implements ControlValueAccessor, OnInit, OnDestroy {
    renderer2: Renderer2;
    domRenderer: DomRenderer;
    theme: string;
    icon: string;
    pattern: string;
    message: string;
    placeholder: string;
    onChange: EventEmitter<string>;
    inputClass: object;
    tip: HTMLElement;
    innerValue: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(renderer2: Renderer2, domRenderer: DomRenderer);
    ngOnInit(): void;
    value: any;
    onBlur(value: string): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onInput(target: any): void;
    remove(): void;
    ngOnDestroy(): void;
}
export declare class InputtextModule {
}

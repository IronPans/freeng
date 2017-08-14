import { OnInit, AfterViewInit, ElementRef, Renderer2, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomRenderer } from '../common/dom';
export declare class RangeComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    renderer2: Renderer2;
    domRenderer: DomRenderer;
    min: number;
    max: number;
    value: any;
    width: number;
    theme: string;
    onChange: EventEmitter<any>;
    _range: ElementRef;
    _tooltip: ElementRef;
    _thumb: ElementRef;
    _track: ElementRef;
    tooltip: HTMLDivElement;
    range: HTMLDivElement;
    thumb: HTMLDivElement;
    track: HTMLDivElement;
    touch: any;
    timeoutID: any;
    input: any;
    maxPercent: number;
    percent: any;
    isPressed: boolean;
    documentTouchmoveListener: any;
    documentTouchendListener: any;
    onModelChange: Function;
    onTouchedChange: Function;
    constructor(renderer2: Renderer2, domRenderer: DomRenderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: number): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    pageInit(): void;
    getPoint(element: any, event: any): {
        x: any;
        y: any;
    };
    setValue(value: any): void;
    getValue(e: any): void;
    onTouchstart(e: any): void;
    onTouchmove(event: any): void;
    onTouchend(): void;
    hide(elem: any): void;
    show(elem: any): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class RangeModule {
}

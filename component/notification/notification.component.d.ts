import { AfterViewInit, DoCheck, ElementRef, EventEmitter, IterableDiffers, OnInit } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class NotificationComponent implements OnInit, DoCheck, AfterViewInit {
    domRenderer: DomRenderer;
    differs: IterableDiffers;
    messages: any[];
    direction: string;
    delay: number;
    maxMessage: number;
    progress: boolean;
    theme: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    container: HTMLDivElement;
    items: any[];
    moveState: string;
    _direction: string;
    _messages: any[];
    zIndex: number;
    differ: any;
    constructor(domRenderer: DomRenderer, differs: IterableDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    handleValueChange(): void;
    remove(item: any, index: number): void;
    onMoveInDone(item: any, index: number): void;
    onTransitionEnd(item: any, index: number): void;
}
export declare class NotificationModule {
}

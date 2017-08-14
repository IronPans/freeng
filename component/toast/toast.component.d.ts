import { EventEmitter, IterableDiffers, DoCheck } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class ToastComponent implements DoCheck {
    domRenderer: DomRenderer;
    differs: IterableDiffers;
    messages: any[];
    delay: number;
    maxMessage: number;
    theme: string;
    onClose: EventEmitter<any>;
    icon: string;
    _messages: any[];
    zIndex: number;
    differ: any;
    constructor(domRenderer: DomRenderer, differs: IterableDiffers);
    ngDoCheck(): void;
    remove(item: any, index: number): void;
    onMoveInDone(item: any, index: number): void;
    setIcon(value: string): string;
}
export declare class ToastModule {
}

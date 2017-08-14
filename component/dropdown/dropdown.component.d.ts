import { ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class DropdownComponent implements AfterViewInit, OnDestroy {
    domRenderer: DomRenderer;
    renderer2: Renderer2;
    menus: any;
    header: string;
    direction: string;
    theme: string;
    caret: boolean;
    hover: boolean;
    button: ElementRef;
    container: ElementRef;
    dropdownMenu: ElementRef;
    isOpen: boolean;
    selfClick: boolean;
    itemClick: boolean;
    documentClickListener: any;
    modal: any;
    constructor(domRenderer: DomRenderer, renderer2: Renderer2);
    clickDisabled(event: any, item: any): boolean;
    ngAfterViewInit(): void;
    open(event?: any): void;
    onMouseover(): void;
    onMouseout(): void;
    onItemClick(): void;
    onDocumentClickListener(): void;
    close(): void;
    offDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class DropdownModule {
}

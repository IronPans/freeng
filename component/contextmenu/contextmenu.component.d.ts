import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { DomRenderer } from '../common/dom';
export declare class ContextmenuItemComponent {
    contextMenu: ContextmenuComponent;
    location: Location;
    domRenderer: DomRenderer;
    item: any;
    root: boolean;
    activeItem: any;
    constructor(contextMenu: ContextmenuComponent, location: Location, domRenderer: DomRenderer);
    onMouseenter(event: any, child: any, item: any): void;
    clickDisabled(event: any, item: any): boolean;
    onMouseleave(event: any): void;
    position(childItem: any, item: any): void;
    itemClick(event: any, child?: any): void;
}
export declare class ContextmenuComponent implements AfterViewInit, OnDestroy {
    domRenderer: DomRenderer;
    renderer2: Renderer2;
    target: any;
    menu: any;
    global: boolean;
    containerViewChild: ElementRef;
    documentClickListener: any;
    childClickListener: any;
    visible: boolean;
    container: HTMLDivElement;
    constructor(domRenderer: DomRenderer, renderer2: Renderer2);
    ngAfterViewInit(): void;
    show(event: any): void;
    position(event: any): void;
    hide(): void;
    ngOnDestroy(): void;
}
export declare class ContextmenuModule {
}

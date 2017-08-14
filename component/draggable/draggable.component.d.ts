import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class DraggableItemComponent implements AfterViewInit, OnDestroy {
    private draggableComponent;
    private domRenderer;
    private er;
    private renderer2;
    disabled: boolean;
    dragData: any;
    index: number;
    isDown: boolean;
    target: any;
    startMousePoint: any;
    startTargetPoint: any;
    documentMousemoveListener: any;
    documentMouseleaveListener: any;
    dropElement: any;
    selfElem: any;
    willDropElement: any;
    targetRect: any;
    draggableRect: any;
    overlayElem: HTMLDivElement;
    parentElement: any;
    onMousedown(event: any): void;
    constructor(draggableComponent: DraggableComponent, domRenderer: DomRenderer, er: ElementRef, renderer2: Renderer2);
    ngAfterViewInit(): void;
    createTarget(): void;
    createWillDropElement(): void;
    removeWillDropElement(): void;
    removeOverlayElement(): void;
    inRect(target: any, targetB: any): boolean;
    onMousemove(event: any): void;
    onMouseup(): void;
    unbindDocumentListener(): void;
    ngOnDestroy(): void;
}
export declare class DraggableComponent implements AfterViewInit {
    er: ElementRef;
    dropTarget: any;
    dragItems: any[];
    draggable: boolean;
    dragEffect: string;
    onDragStart: EventEmitter<any>;
    onDragEnd: EventEmitter<any>;
    templateRef: TemplateRef<any>;
    group: any[];
    dropElement: any;
    dropIndex: number;
    constructor(er: ElementRef);
    ngAfterViewInit(): void;
    addItem(item: DraggableItemComponent, elem: HTMLDivElement): void;
}
export declare class DraggableModule {
}

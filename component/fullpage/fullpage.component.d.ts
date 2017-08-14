import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class FullpageSlideComponent {
    group: FullpageComponent;
    index: number;
    active: boolean;
    height: number;
    constructor(group: FullpageComponent);
}
export declare class FullpageBulletComponent {
    index: number;
    active: boolean;
}
export declare class FullpageComponent implements AfterViewInit, OnDestroy {
    domRenderer: DomRenderer;
    containerViewChild: ElementRef;
    wrapperViewChild: ElementRef;
    paginationViewChild: ElementRef;
    pagination: Boolean;
    paginationClickable: boolean;
    slideStart: EventEmitter<{}>;
    slideEnd: EventEmitter<{}>;
    paginationElem: HTMLDivElement;
    container: HTMLDivElement;
    wrapper: HTMLDivElement;
    win: any;
    totalSlides: number;
    isScroll: boolean;
    activeIndex: number;
    slides: FullpageSlideComponent[];
    transitionstartListener: any;
    transitionendListerner: any;
    onResize(): void;
    onWheel(e: any): void;
    constructor(domRenderer: DomRenderer);
    addSlide(slide: FullpageSlideComponent): void;
    ngAfterViewInit(): void;
    onPaginationClick(index: number): void;
    refreshView(): void;
    scrollPrev(): void;
    scrollNext(): void;
    scrollTo(index: any): void;
    ngOnDestroy(): void;
}
export declare class FullpageModule {
}

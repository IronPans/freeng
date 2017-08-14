import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class SlidesComponent implements OnInit, AfterViewInit, AfterContentInit {
    er: ElementRef;
    domRender: DomRenderer;
    speed: number;
    styles: any;
    loop: number;
    pagination: boolean;
    paginationClickable: boolean;
    arrow: boolean;
    prev: boolean;
    next: boolean;
    direction: string;
    autoplay: number;
    autoplayDisableOnInteraction: boolean;
    slideChange: EventEmitter<any>;
    wrapper: ElementRef;
    container: ElementRef;
    _container: any;
    _wrapper: any;
    _er: any;
    activeIndex: number;
    slides: SlideComponent[];
    startXY: any;
    moveXY: any;
    itemWidth: number;
    isMobile: boolean;
    isDowned: boolean;
    _autoplaying: boolean;
    bullets: any[];
    slidesLength: number;
    loopSlidesLength: number;
    loopActiveIndex: number;
    loopAdditionalSlides: number;
    autoplayTimeoutId: any;
    constructor(er: ElementRef, domRender: DomRenderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    reset(): void;
    add(slide: SlideComponent): void;
    startAutoplay(): boolean;
    stopAutoplay(): void;
    getPoint(e: any): {
        x: any;
        y: any;
    };
    createLoop(): void;
    paginationClick(index: number): void;
    onMousedown(event: any): void;
    onMousemove(event: any): void;
    onMouseup(event: any): void;
    slidePrev(canSlide: boolean): void;
    slideNext(canSlide: boolean): void;
    slideTo(index: number, speed?: number): void;
}
export declare class SlideComponent implements OnInit {
    group: SlidesComponent;
    width: number;
    index: number;
    constructor(group: SlidesComponent);
    ngOnInit(): void;
}
export declare class SlideModule {
}

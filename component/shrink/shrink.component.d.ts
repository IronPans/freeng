import { OnInit, AfterViewInit, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class ShrinkItemComponent implements OnInit {
    icon: string;
    itemStyle: any;
    constructor();
    ngOnInit(): void;
}
export declare class ShrinkComponent implements OnInit, AfterViewInit {
    domRenderer: DomRenderer;
    renderer2: Renderer2;
    expanded: boolean;
    _items: any;
    btn: HTMLDivElement;
    container: HTMLDivElement;
    reverse: boolean;
    menus: any;
    type: string;
    direction: string;
    hover: boolean;
    itemWidth: any;
    distance: number;
    delay: any;
    angle: number;
    _btn: ElementRef;
    _container: ElementRef;
    items: QueryList<ShrinkItemComponent>;
    onMouseover(): void;
    onMouseout(): void;
    constructor(domRenderer: DomRenderer, renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    toggle(): void;
    open(): void;
    anim(i: any, rotation: any, r: any): void;
    close(): void;
}
export declare class ShrinkModule {
}

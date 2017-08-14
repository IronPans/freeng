import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { DomRenderer } from '../common/dom';
export declare class TimelineItemComponent implements AfterViewInit {
    domRenderer: DomRenderer;
    header: string;
    dot: string;
    itemViewChild: ElementRef;
    item: HTMLDivElement;
    constructor(domRenderer: DomRenderer);
    ngAfterViewInit(): void;
}
export declare class TimelineComponent implements OnInit {
    constructor();
    ngOnInit(): void;
}
export declare class TimelineModule {
}

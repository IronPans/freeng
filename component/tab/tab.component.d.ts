import { OnInit, AfterContentInit, QueryList, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
export declare class TabNavComponent {
    header: string;
    tabs: any;
    direction: string;
    onTabClick: EventEmitter<{}>;
    constructor();
    tabClick(index: number, disabled: boolean): void;
}
export declare class TabComponent implements OnInit {
    header: string;
    disabled: boolean;
    selected: boolean;
    tabClass: any;
    _selected: boolean;
    constructor();
    toggleClass(): void;
    ngOnInit(): void;
    setActive(value: boolean): void;
}
export declare class TabGroupComponent implements OnInit, AfterContentInit {
    renderer2: Renderer2;
    theme: string;
    direction: string;
    activeIndex: number;
    groups: ElementRef;
    nav: ElementRef;
    tabGroup: QueryList<TabComponent>;
    onChange: EventEmitter<any>;
    tabs: TabComponent[];
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    tabInit(): void;
    open(index?: number): void;
    tabClick(index: number): void;
}
export declare class TabGroupModule {
}

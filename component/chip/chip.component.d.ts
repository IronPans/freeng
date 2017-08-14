import { OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2, EventEmitter } from '@angular/core';
export declare class ChipGroupComponent implements OnInit {
    chips: any;
    onChange: EventEmitter<any>;
    placeholder: string;
    chipClass: {};
    focus: boolean;
    groups: ChipComponent[];
    value: any[];
    constructor();
    ngOnInit(): void;
    setChipClass(): void;
    addGroup(value: ChipComponent): void;
    removeGroup(value: ChipComponent): void;
    onFocus(): void;
    onEnter(event: any): void;
}
export declare class ChipComponent implements OnInit, AfterViewInit, OnDestroy {
    renderer2: Renderer2;
    group: ChipGroupComponent;
    value: any;
    delete: boolean;
    container: ElementRef;
    constructor(renderer2: Renderer2, group: ChipGroupComponent);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onDelete(): void;
    ngOnDestroy(): void;
}
export declare class ChipModule {
}

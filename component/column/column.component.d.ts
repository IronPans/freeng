import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
export declare class ColumnComponent implements OnInit, AfterViewInit {
    columns: any;
    containerViewChild: ElementRef;
    container: HTMLDivElement;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    addPrefix(element: any, attr: any, value: any): void;
}
export declare class ColumnModule {
}

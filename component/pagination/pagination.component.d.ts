import { EventEmitter, AfterViewInit } from '@angular/core';
export declare class PaginationComponent implements AfterViewInit {
    maxPage: number;
    row: number;
    activeIndex: number;
    total: number;
    onPageChange: EventEmitter<object>;
    _total: any[];
    isFirstPage: boolean;
    isLastPage: boolean;
    pageOffset: number;
    startEllipsis: boolean;
    endEllipsis: boolean;
    start: number;
    end: number;
    pageCount: number;
    totalRecord: number;
    _activeIndex: number;
    isSet: boolean;
    constructor();
    ngAfterViewInit(): void;
    countPage(end: number, start?: number): void;
    changePage(index: number): void;
    getPage(): number;
    changePageToNext(): void;
    changePageToPrev(): void;
    changePageToFirst(): void;
    changePageToLast(): void;
    checkStartOrEnd(): void;
}
export declare class PaginationItemComponent {
    pagination: any;
    active: boolean;
    disabled: boolean;
    constructor(pagination: PaginationComponent);
}
export declare class PaginationModule {
}

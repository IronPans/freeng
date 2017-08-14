import { OnInit, AfterViewInit, ElementRef, QueryList, EventEmitter, Renderer2, TemplateRef, ViewContainerRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { FreeTemplateDirective } from '../common/share';
import { DomRenderer } from '../common/dom';
export declare class TCheckboxComponent {
    dt: DatatableComponent;
    checkboxName: string;
    checked: boolean;
    onClick: EventEmitter<any>;
    checkbox: HTMLInputElement;
    constructor(dt: DatatableComponent);
    onChange(value: boolean): void;
}
export declare class TRadioComponent {
    dt: DatatableComponent;
    checked: boolean;
    onClick: EventEmitter<any>;
    checkbox: HTMLInputElement;
    constructor(dt: DatatableComponent);
    onChange(value: boolean): void;
}
export declare class DatatableColumnComponent implements AfterViewInit {
    header: string;
    sort: boolean;
    field: string;
    colspan: number;
    rowspan: number;
    rowData: any;
    editable: boolean;
    style: any;
    template: TemplateRef<any>;
    desc: boolean;
    cell: any;
    table: DatatableComponent;
    selected: boolean;
    cellTemplate: TemplateRef<any>;
    constructor(table: DatatableComponent);
    ngAfterViewInit(): void;
}
export declare class ExpansionRowComponent implements OnInit, OnDestroy {
    _viewContainerRef: ViewContainerRef;
    template: any;
    rowData: any;
    rowIndex: number;
    view: EmbeddedViewRef<any>;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class DatatableHeaderComponent {
    dt: DatatableComponent;
    columns: DatatableColumnComponent[];
    constructor(dt: DatatableComponent);
}
export declare class DatatableBodyComponent {
    dt: DatatableComponent;
    columns: DatatableColumnComponent[];
    constructor(dt: DatatableComponent);
}
export declare class DatatableScrollableComponent implements AfterViewInit {
    domRenderer: DomRenderer;
    dt: DatatableComponent;
    columns: DatatableColumnComponent[];
    headViewChild: ElementRef;
    scrollHead: HTMLDivElement;
    constructor(domRenderer: DomRenderer, dt: DatatableComponent);
    ngAfterViewInit(): void;
    initScrolling(): void;
}
export declare class DatatableComponent implements OnInit, AfterViewInit, OnDestroy {
    renderer2: Renderer2;
    domRenderer: DomRenderer;
    pagination: boolean;
    selectionMode: string;
    striped: boolean;
    scrollable: boolean;
    border: boolean;
    hover: boolean;
    row: number;
    editable: boolean;
    sort: boolean;
    expandableRows: boolean;
    scrollHeight: number;
    resizable: boolean;
    value: any[];
    order: boolean;
    emptyMessage: string;
    container: ElementRef;
    templates: QueryList<FreeTemplateDirective>;
    onSelect: EventEmitter<any>;
    cols: QueryList<DatatableColumnComponent>;
    columns: any[];
    checkboxSelection: any;
    radioSelection: any;
    checkboxs: TCheckboxComponent[];
    radios: TRadioComponent[];
    total: number;
    isEmpty: boolean;
    page: number;
    first: number;
    data: any[];
    _value: any[];
    totalChecked: boolean;
    expandedRows: any;
    columnResizeStartX: number;
    currentResizeCell: any;
    columnResizeMoveX: number;
    resizeDown: boolean;
    rowExpansionTemplate: TemplateRef<any>;
    documentMousemoveListener: any;
    documentMouseupListener: any;
    constructor(renderer2: Renderer2, domRenderer: DomRenderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    initColumns(): void;
    initColumnResize(): void;
    columnResizeStart(event: any): void;
    addCheckbox(checkbox: TCheckboxComponent): void;
    addRadio(radio: TRadioComponent): void;
    getColumnLength(): number;
    onColumnSort(column: DatatableColumnComponent, desc: number, event: any): void;
    toggleRow(row: any): void;
    findRowExpand(row: any): number;
    isRowExpand(row: any): boolean;
    findCell(elem: any, tagName: string): any;
    filterValue(page: number): void;
    onPageChange(event: any): void;
    rowClick(event: any): void;
    onCheckboxItemClick(event: any, rowData: any, i: any): void;
    onRadioItemClick(event: any, rowData: any, i: any): void;
    onSelectChange(): void;
    checkOfSelect(): boolean;
    unbindDocumentMouseListener(): void;
    ngOnDestroy(): void;
}
export declare class DatatableModule {
}

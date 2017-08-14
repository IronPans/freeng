import { OnInit, AfterViewInit, ElementRef, QueryList, Renderer2, TemplateRef } from '@angular/core';
export declare class TableComponent implements OnInit, AfterViewInit {
    renderer2: Renderer2;
    striped: boolean;
    border: boolean;
    hover: boolean;
    row: number;
    heads: TableHeadComponent[];
    bodys: TableBodyComponent[];
    total: number;
    container: ElementRef;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    addHead(value: TableHeadComponent): void;
    addBody(value: TableBodyComponent): void;
}
export declare class TableHeaderComponent {
}
export declare class TableHeadComponent implements OnInit, AfterViewInit {
    er: ElementRef;
    rowspan: string;
    colspan: string;
    template: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    title: string;
    protected table: any;
    constructor(table: TableComponent, er: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class TableRowComponent {
    header: string;
    cells: TableCellComponent[];
    table: any;
    constructor();
    addCell(value: TableCellComponent): void;
}
export declare class TableBodyComponent implements OnInit, AfterViewInit {
    _rows: QueryList<TableRowComponent>;
    rows: TableRowComponent[];
    protected table: TableComponent;
    constructor(table: TableComponent);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class TableCellComponent implements OnInit, AfterViewInit {
    er: ElementRef;
    protected row: TableRowComponent;
    colspan: number;
    rowspan: number;
    template: TemplateRef<any>;
    cellTemplate: TemplateRef<any>;
    value: string;
    constructor(row: TableRowComponent, er: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class TableModule {
}

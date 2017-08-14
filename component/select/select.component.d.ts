import { ControlValueAccessor } from '@angular/forms';
import { OnInit, EventEmitter, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ObjectUtils } from '../common/util';
export declare class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    renderer2: Renderer2;
    objUtil: ObjectUtils;
    pholder: string;
    multipleTotal: boolean;
    editable: boolean;
    filter: boolean;
    selected: any;
    multiple: boolean;
    onChange: EventEmitter<any>;
    input: ElementRef;
    options: any;
    _options: any;
    opened: boolean;
    _filterValue: any;
    value: string;
    itemClick: boolean;
    items: SelectItemComponent[];
    selfClick: boolean;
    bindDocumentClickListener: Function;
    onModelChange: Function;
    onTouchedChange: Function;
    constructor(renderer2: Renderer2, objUtil: ObjectUtils);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    onMultipleTotal(event: any): void;
    onCheckboxSelect(event: any, option: any): void;
    compareWith(value: string): boolean;
    onItemClick($event: any): void;
    getValue(): void;
    getSelectedValue(): void;
    onFilterChange(event: any): void;
    addGroup(value: SelectItemComponent): void;
    onMenuClick(): void;
    onDocumentClickListener(): void;
    offDocumentClickListener(): void;
    onClick(): void;
    filterValue(options: any[], value: string): any[];
    open(): void;
    close(): void;
    ngOnDestroy(): void;
}
export declare class SelectItemComponent implements OnInit {
    option: any;
    onClick: EventEmitter<any>;
    selector: SelectComponent;
    constructor(selector: SelectComponent);
    ngOnInit(): void;
    itemClick(): void;
}
export declare class SelectModule {
}

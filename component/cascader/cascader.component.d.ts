import { ControlValueAccessor } from '@angular/forms';
import { EventEmitter, AfterViewInit, ElementRef, Renderer2, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ObjectUtils } from '../common/util';
import { DomRenderer } from '../common/dom';
export declare class CascaderMenuComponent implements AfterViewInit {
    cascaderComponent: CascaderComponent;
    options: any[];
    selected: any;
    order: number;
    index: number;
    onItemClick: EventEmitter<any>;
    selectedIndex: number;
    scrollViewChild: ElementRef;
    scroll: HTMLDivElement;
    _selectedIndex: number;
    constructor(cascaderComponent: CascaderComponent);
    ngAfterViewInit(): void;
    setIndex(): void;
    scrollTo(): void;
    itemClick(event: any, option: any, index: number): void;
}
export declare class CascaderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    renderer2: Renderer2;
    objectUtils: ObjectUtils;
    domRenderer: DomRenderer;
    _componentFactoryResolver: ComponentFactoryResolver;
    pholder: string;
    separator: string;
    deploy: boolean;
    onChange: EventEmitter<any>;
    menu: ElementRef;
    input: ElementRef;
    containerViewChild: ElementRef;
    rootViewContainerRef: any;
    rootMenuComponent: CascaderMenuComponent;
    options: any;
    _options: any;
    _menu: HTMLDivElement;
    container: HTMLDivElement;
    firstIndex: number;
    order: number;
    selectedIndex: number[];
    opened: boolean;
    activeState: string;
    label: string;
    value: any[];
    itemClick: boolean;
    selfClick: boolean;
    lastOrder: number;
    componentRef: any[];
    isSet: boolean;
    bindDocumentClickListener: any;
    onModelChange: Function;
    onTouchedChange: Function;
    constructor(renderer2: Renderer2, objectUtils: ObjectUtils, domRenderer: DomRenderer, _componentFactoryResolver: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    createComponent(event: any, options: any): void;
    onItemClick(event: any): void;
    clearView(order: number): void;
    deleteItem(index: number): void;
    getCascaderOption(order: number): any;
    getValue(): void;
    setOption(value: any): void;
    onMenuClick(): void;
    onDocumentClickListener(): void;
    offDocumentClickListener(): void;
    onClick(): void;
    open(): void;
    close(): void;
    transitionStart(): void;
    transitionEnd(): void;
    reset(): void;
    ngOnDestroy(): void;
}
export declare class CascaderItemComponent {
    option: any;
    selected: boolean;
    onClick: EventEmitter<any>;
    hover: boolean;
    constructor();
    itemClick(): void;
}
export declare class CascaderModule {
}

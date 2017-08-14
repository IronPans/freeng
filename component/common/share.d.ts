import { ViewContainerRef, EmbeddedViewRef, OnInit, ComponentFactoryResolver, OnDestroy, TemplateRef } from '@angular/core';
export declare class HeaderComponent {
}
export declare class FooterComponent {
}
export declare class TemplateComponent implements OnInit, OnDestroy {
    _viewContainerRef: ViewContainerRef;
    template: any;
    index: any;
    data: any;
    view: EmbeddedViewRef<any>;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class TemplateColumnComponent implements OnInit, OnDestroy {
    _viewContainerRef: ViewContainerRef;
    template: any;
    rowData: any;
    rowIndex: number;
    column: any;
    view: EmbeddedViewRef<any>;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class FHostDirective implements OnInit {
    _viewContainerRef: ViewContainerRef;
    _componentFactoryResolver: ComponentFactoryResolver;
    item: any;
    data: any;
    constructor(_viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
}
export declare class FreeTemplateDirective {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
}
export declare class ShareModule {
}

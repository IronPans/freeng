import { OnInit, EventEmitter, Renderer2, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
export declare class ModalComponent implements OnInit, AfterContentInit, AfterViewInit {
    er: ElementRef;
    renderer2: Renderer2;
    header: string;
    width: any;
    height: any;
    theme: string;
    delay: number;
    closeIcon: boolean;
    type: string;
    spinner: string;
    visibleChange: EventEmitter<any>;
    onChange: EventEmitter<any>;
    modalViewChild: ElementRef;
    promptInput: ElementRef;
    _visible: boolean;
    modal: HTMLDivElement;
    mask: HTMLDivElement;
    modalClass: string;
    maskClickListener: Function;
    container: any;
    constructor(er: ElementRef, renderer2: Renderer2);
    visible: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    animationEnd(event: any): void;
    show(): void;
    confirm(): void;
    close(): void;
    addOverlay(): void;
    center(): void;
}
export declare class ModalModule {
}

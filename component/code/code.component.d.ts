import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class CodeComponent implements AfterViewInit {
    renderer2: Renderer2;
    lang: string;
    copy: boolean;
    codeViewChild: ElementRef;
    codeText: string;
    code: HTMLElement;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
    format(): string;
    clearSelection(): void;
    onCopy(): void;
}
export declare class CodeModule {
}

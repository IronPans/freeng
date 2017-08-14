import { OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class IconComponent implements OnInit, AfterViewInit {
    renderer2: Renderer2;
    icon: string;
    spin: boolean;
    size: string;
    iconClass: any;
    container: ElementRef;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class IconModule {
}

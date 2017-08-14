import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
export declare class ImageComponent implements OnInit, AfterViewInit {
    er: ElementRef;
    src: string;
    alt: string;
    highlight: boolean;
    imageWidth: any;
    width: any;
    constructor(er: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class ImageGroupComponent implements OnInit {
    images: any[];
    constructor();
    ngOnInit(): void;
}
export declare class ImageModule {
}

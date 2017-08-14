import { OnInit, ElementRef, Renderer2 } from '@angular/core';
export declare class HamburgeComponent implements OnInit {
    renderer2: Renderer2;
    isOpen: boolean;
    type: string;
    container: ElementRef;
    onClick(): void;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
}
export declare class HamburgeModule {
}

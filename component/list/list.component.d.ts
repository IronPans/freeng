import { OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
export declare class ListComponent implements OnInit, AfterViewInit {
    renderer2: Renderer2;
    hover: boolean;
    line: boolean;
    list: ElementRef;
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
export declare class ListItemComponent {
    constructor();
}
export declare class ListAvatarComponent implements AfterViewInit {
    renderer2: Renderer2;
    large: boolean;
    avatar: ElementRef;
    circle: boolean;
    constructor(renderer2: Renderer2);
    ngAfterViewInit(): void;
}
export declare class ListModule {
}

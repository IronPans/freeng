import { OnInit, EventEmitter } from '@angular/core';
export declare class MaskComponent implements OnInit {
    _visible: boolean;
    timeoutId: any;
    visibleChange: EventEmitter<boolean>;
    close: boolean;
    delay: number;
    visible: boolean;
    constructor();
    ngOnInit(): void;
    transitionEnd(): void;
}
export declare class MaskModule {
}

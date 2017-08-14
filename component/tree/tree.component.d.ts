import { OnInit, OnChanges, EventEmitter } from '@angular/core';
export declare class TreeItemComponent implements OnChanges {
    title: string;
    folder: any;
    file: any;
    expanded: boolean;
    onSelect: EventEmitter<any>;
    isActive: string;
    isOpen: boolean;
    constructor();
    ngOnChanges(): void;
    toggle(event: any): void;
    onClick(item: any): void;
}
export declare class TreeComponent implements OnInit {
    menus: any;
    constructor();
    ngOnInit(): void;
}
export declare class TreeModule {
}

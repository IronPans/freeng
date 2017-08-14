import { OnInit } from '@angular/core';
export declare class AccordionGroupComponent {
    closeOthers: boolean;
    groups: AccordionComponent[];
    constructor();
    closeOther(activeItem: AccordionComponent): void;
    addGroup(item: AccordionComponent): void;
}
export declare class AccordionComponent implements OnInit {
    header: string;
    disabled: boolean;
    toggleable: boolean;
    iconName: string;
    isExpand: boolean;
    _isExpanded: boolean;
    _icon: string;
    isActive: string;
    itemClass: any;
    isAnimating: boolean;
    accordionGroup: AccordionGroupComponent;
    constructor(accordionGroup: AccordionGroupComponent);
    ngOnInit(): void;
    toggleClass(): void;
    toggle(): void;
    transitionStart(): void;
    transitionDone(): void;
}
export declare class AccordionModule {
}

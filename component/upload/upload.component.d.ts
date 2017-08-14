import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
export declare class UploadComponent implements OnInit {
    renderer2: Renderer2;
    title: string;
    review: boolean;
    multiple: boolean;
    media: string;
    maxSize: number;
    type: string;
    onChange: EventEmitter<any>;
    input: ElementRef;
    files: any[];
    dataURL: any[];
    constructor(renderer2: Renderer2);
    ngOnInit(): void;
    onUploadChange(event: any): void;
    addFile(file: any): void;
    imageToData(file: any): void;
    onDelete(index: number): void;
}
export declare class UploadModule {
}

import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Particle } from './partical';
import { DomRenderer } from '../common/dom';
export declare class ParticleDirective implements OnInit, AfterViewInit {
    er: ElementRef;
    domRenderer: DomRenderer;
    renderer2: Renderer2;
    size: number;
    distance: number;
    color: string[] | string;
    total: number;
    backgroundColor: string;
    container: HTMLCanvasElement;
    particles: Particle[];
    ctx: any;
    width: any;
    height: any;
    defaultColor: string;
    isRunning: boolean;
    canvas: HTMLCanvasElement;
    onResize(): void;
    constructor(er: ElementRef, domRenderer: DomRenderer, renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    drawBackground(): void;
    addParticle(): void;
    reset(): void;
    selectColor(): string;
    setParticleData(): any;
    getRandom(max: number, min?: number): number;
    drawParticle(): void;
    drawLine(p1: Particle, p2: Particle): void;
    lineColor(p1: any, p2: any): any;
    checkInView(p: Particle): void;
}
export declare class ParticleModule {
}

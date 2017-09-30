import {CommonModule} from '@angular/common';
import {NgModule, Component, Input, ElementRef, ViewChild, AfterViewInit, ContentChild} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {FooterComponent, ShareModule} from '../common/share';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'free-panel',
  template: `
    <div class="free-panel" #container [class.free-panel-maximized]="maximized"
         [style.display]="closed ? 'none' : 'block'">
      <div class="free-panel-header">
        <span *ngIf="header">{{header}}</span>
        <ng-content select="f-header"></ng-content>
        <div class="free-panel-tool" *ngIf="tool">
          <i class="fa" [ngClass]="{'fa-expand': !maximized, 'fa-compress': maximized}"
             (click)="maximized = !maximized"></i>
          <i class="fa" [ngClass]="{'fa-minus': expanded, 'fa-plus': !expanded}" (click)="onExpand()"></i>
          <i class="fa fa-close" (click)="closed = !closed"></i>
        </div>
      </div>
      <div class="free-panel-content" [@expandState]="state">
        <div class="free-panel-inner">
          <ng-content></ng-content>
        </div>
        <div class="free-panel-footer" *ngIf="footer">
          <ng-content select="f-footer"></ng-content>
        </div>
      </div>
    </div>
  `,
  providers: [DomRenderer],
  animations: [
    trigger('expandState', [
      state('expand', style({
        height: '*'
      })),
      state('compress', style({
        height: '0'
      })),
      transition('expand <=> compress', animate('.3s linear'))
    ])
  ]
})
export class PanelComponent implements AfterViewInit {
  @Input() header: string;
  @Input() theme: string;
  @Input() tool: boolean;
  @Input()
  set expanded(value: boolean) {
    this._expanded = value;
    this.state = value ? 'expand' : 'compress';
  }
  get expanded() {
    return this._expanded;
  }
  @ViewChild('container') containerViewChild: ElementRef;
  @ContentChild(FooterComponent) footer: any;
  container: HTMLDivElement;
  maximized: boolean;
  state: string;
  closed: boolean;
  _expanded: boolean;
  constructor(public domRenderer: DomRenderer) {
    this.state = 'expand';
    this.expanded = true;
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.theme) {
      this.domRenderer.addClass(this.container, `free-panel-${this.theme}`);
    }
  }

  onExpand() {
    this.expanded = !this.expanded;
    this.state = this.expanded ? 'expand' : 'compress';
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent],
  exports: [PanelComponent, ShareModule]
})

export class PanelModule {}

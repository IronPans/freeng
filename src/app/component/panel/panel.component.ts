import {CommonModule} from '@angular/common';
import {NgModule, Component, Input, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {ShareModule} from '../common/share';

@Component({
  selector: 'free-panel',
  template: `
    <div class="free-panel" #container>
      <div class="free-panel-header">
        <span *ngIf="header">{{header}}</span>
        <ng-content select="f-header"></ng-content>
      </div>
      <div class="free-panel-content">
        <div class="free-panel-inner">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class PanelComponent implements AfterViewInit {
  @Input() header: string;
  @Input() theme: string;
  @ViewChild('container') containerViewChild: ElementRef;
  container: HTMLDivElement;
  constructor(public domRenderer: DomRenderer) { }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.theme) {
      this.domRenderer.addClass(this.container, `free-panel-${this.theme}`);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent],
  exports: [PanelComponent, ShareModule]
})

export class PanelModule {}

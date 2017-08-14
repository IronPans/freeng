import {AfterViewInit, Component, ElementRef, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../common/share';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-timeline-item',
  template: `
    <div class="free-timeline-item" #item>
      <h4 *ngIf="header"><span>{{header}}</span></h4>
      <ng-content></ng-content>
    </div>
  `,
  providers: [DomRenderer]
})
export class TimelineItemComponent implements AfterViewInit {
  @Input() header: string;
  @Input() dot: string;
  @ViewChild('item') itemViewChild: ElementRef;
  item: HTMLDivElement;
  constructor(public domRenderer: DomRenderer) {}

  ngAfterViewInit() {
    this.item = this.itemViewChild.nativeElement;
    switch (this.dot) {
      case 'square':
        this.domRenderer.addClass(this.item, 'free-square');
        break;
    }
  }
}

@Component({
  selector: 'free-timeline',
  template: `
    <div class="free-timeline">
      <ng-content></ng-content>
    </div>
  `
})
export class TimelineComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule, ShareModule],
  declarations: [TimelineItemComponent, TimelineComponent],
  exports: [[TimelineItemComponent, TimelineComponent]]
})
export class TimelineModule {}

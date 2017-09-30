import {AfterViewInit, Component, ElementRef, forwardRef, Inject, Input, NgModule, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../common/share';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-timeline-node',
  template: `
    <li class="free-timeline-node">
      <ng-content></ng-content>
    </li>
  `
})

export class TimelineNodeComponent {
}

@Component({
  selector: 'free-timeline-list',
  template: `
    <div class="free-timeline-list" [class.free-timeline-list-inverted]="inverted">
      <ng-content></ng-content>
    </div>
  `
})
export class TimelineListComponent {
  @Input() inverted: boolean;
  constructor(@Inject(forwardRef(() => TimelineComponent)) timeline: TimelineComponent) {
    timeline.line = true;
  }
}

@Component({
  selector: 'free-timeline-datetime',
  template: `
    <div class="free-timeline-datetime">
        <span class="free-timeline-time">{{time}}</span>
      <span class="free-timeline-date">{{date}}</span>
    </div>
  `
})

export class TimelineDatetimeComponent {
  @Input() time: string;
  @Input() date: string;
}

@Component({
  selector: 'free-timeline-badge',
  template: `
    <div class="free-timeline-badge">
      <ng-content></ng-content>
    </div>
  `
})

export class TimelineBadgeComponent {
}

@Component({
  selector: 'free-timeline-body',
  template: `
    <div class="free-timeline-panel">
      <ng-content></ng-content>
    </div>
  `
})

export class TimelineBodyComponent {
}

@Component({
  selector: 'free-timeline-item',
  template: `
    <div class="free-timeline-item" #item>
      <ng-content select="f-header"></ng-content>
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

  constructor(public domRenderer: DomRenderer) {
  }

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
    <div class="free-timeline" [class.free-timeline-line]="line">
      <ng-content></ng-content>
    </div>
  `
})
export class TimelineComponent {
  line: boolean;
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    TimelineItemComponent,
    TimelineComponent,
    TimelineNodeComponent,
    TimelineListComponent,
    TimelineDatetimeComponent,
    TimelineBadgeComponent,
    TimelineBodyComponent
  ],
  exports: [
    TimelineItemComponent,
    TimelineComponent,
    TimelineNodeComponent,
    TimelineListComponent,
    ShareModule,
    TimelineDatetimeComponent,
    TimelineBadgeComponent,
    TimelineBodyComponent
  ]
})
export class TimelineModule {
}

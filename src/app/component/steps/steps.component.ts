import {
  AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, forwardRef, Inject, Input,
  NgModule, Output, QueryList
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent, ShareModule} from '../common/share';

@Component({
  selector: 'free-step-content',
  template: `
    <div class="free-step-content" *ngIf="index == steps.activeIndex">
      <ng-content></ng-content>
    </div>
  `
})
export class StepContentComponent {
  index: number;
  steps: any;
  constructor(@Inject(forwardRef(() => StepsComponent)) steps: StepsComponent) {
    this.steps = steps;
  }
}

@Component({
  selector: 'free-steps',
  template: `
    <div class="free-steps" [class.free-steps-wired]="wired">
      <div class="free-steps-nav">
        <ul>
          <li *ngFor="let step of model;index as i" [class.active]="i === activeIndex"
              [class.free-step-complete]="i < activeIndex"
             [class.free-step-actived]="!readonly" (click)="onClick($event, step, i)">
            <span class="free-step">{{i}}</span>
            <span class="free-step-title" *ngIf="wired; else temp">{{step['label']}}</span>
            <ng-template #temp>{{step['label']}}</ng-template>
            <span class="free-step-chevron"></span>
          </li>
        </ul>
      </div>
      <div class="free-steps-content" *ngIf="stepContentComponents">
        <ng-content></ng-content>
      </div>
      <div class="free-steps-footer" *ngIf="footerComponent">
        <ng-content select="f-footer"></ng-content>
      </div>
    </div>
  `
})
export class StepsComponent implements AfterContentInit {
  @Input() model: any;
  @Input() readonly: boolean;
  @Input() get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(value: number) {
    value = Math.abs(value);
    if (this.model.length > 0) {
      value = value % this.model.length;
    }
    this._activeIndex = value;
  }
  @Input() wired: boolean;
  @Output() onStepChange: EventEmitter<any> = new EventEmitter();
  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();
  @ContentChildren(StepContentComponent) stepContentComponents: QueryList<StepContentComponent>;
  @ContentChild(FooterComponent) footerComponent: FooterComponent;
  _activeIndex: number;

  constructor() {
    this.model = [];
    this.activeIndex = 0;
    this.readonly = true;
  }

  ngAfterContentInit() {
    const stepsContentArray = this.stepContentComponents.toArray();
    let num = 0;
    if (stepsContentArray.length > 0) {
      for (const con of stepsContentArray) {
        con.index = num;
        num++;
      }
    }
  }

  onClick(event: any, item: any, index: number) {
    if (!this.readonly) {
      this.activeIndex = index;
      const data = {
        originEvent: event,
        item: item,
        activeIndex: this.activeIndex
      };
      if (item.click) {
        item.click(data);
      }
      this.activeIndexChange.emit(this.activeIndex);
      this.onStepChange.emit(data);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [StepsComponent, StepContentComponent],
  exports: [StepsComponent, StepContentComponent, ShareModule]
})
export class StepsModule {
}

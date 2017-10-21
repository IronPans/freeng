import {AfterViewInit, Component, HostListener, Input, NgModule} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-tour',
  template: `
    <div class="free-tour" [class.free-tour-active]="visible">
      <div class="free-tour-overlay"></div>
      <div class="free-tour-helperLayer" [ngStyle]="layerStyle"></div>
      <div class="free-tour-tooltipReferenceLayer" [ngStyle]="layerStyle">
        <span class="free-tour-helperNumberLayer">{{activeStep + 1}}</span>
        <div class="free-tour-tooltip free-tour-{{tooltipPosition}}" [ngClass]="tooltipClass" *ngIf="data.length > 0">
          <div class="free-tour-tooltiptext" *ngIf="stepItem">{{stepItem['label']}}</div>
          <div class="free-tour--bullets" *ngIf="showBullets">
            <ul>
              <li *ngFor="let bullet of data;index as i">
                <span [class.active]="activeStep === i">{{i}}</span>
              </li>
            </ul>
          </div>
          <div class="free-tour-tooltipbuttons">
            <button class="btn btn-default" *ngIf="skipLabel">{{skipLabel}}</button>
            <button class="btn btn-default"
                    [class.btn-disabled]="activeStep <= 0" *ngIf="prevLabel" (click)="_previousStep()">{{prevLabel}}</button>
            <button class="btn btn-default"
                    [class.btn-disabled]="activeStep >= data.length" *ngIf="nextLabel" (click)="_nextStep()">{{nextLabel}}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class TourComponent implements AfterViewInit {
  @Input() get visible() {
    return this._visible;
  }
  set visible(v: boolean) {
    this._visible = !!v;
    if (this.initial) {
      this.show();
    }
  }
  @Input() nextLabel: string;
  @Input() prevLabel: string;
  @Input() skipLabel: string;
  @Input() doneLabel: string;
  @Input() tooltipPosition: string;
  @Input() showStepNumbers: boolean;
  @Input() scrollToElement: boolean;
  @Input() showProgress: boolean;
  @Input() showBullets: boolean;
  @Input() overlayOpacity: number;
  @Input() keyboardNavigation: boolean;
  @Input() data: any;
  @Input() tooltipClass: any;
  @HostListener('window:scroll') onScroll(event) {
    if (this.stepElement) {
      const rect = this.domRenderer.getRect(this.stepElement);
      const wHeight = window.innerHeight;
      const wWidth = window.innerWidth;
      if (rect.top > 0 && rect.top < wHeight && rect.left > 0 && rect.left < wWidth) {}
    }
  }
  activeStep: number;
  helperLayer: any;
  helperNumberLayer: any;
  tooltipReferenceLayer: any;
  tooltip: any;
  overlayer: any;
  tourLayer: any;
  layerStyle: any;
  stepElement: any;
  stepItem: any;
  _visible: boolean;
  initial: boolean;
  dist: number;

  constructor(public domRenderer: DomRenderer) {
    this.layerStyle = {};
    this.overlayOpacity = 0.8;
    this.data = [];
    this.activeStep = 0;
    this.tooltipPosition = 'bottom';
    this.dist = 20;
  }

  ngAfterViewInit() {
    this.initial = true;
    this.show();
  }

  show() {
    if (this.stepElement) {
      this.domRenderer.removeClass(this.stepElement, 'free-tour-target');
      this.domRenderer.removeClass(this.stepElement, 'free-tour-relativePosition');
    }
    this.stepElement = document.querySelector('[data-step="' + (this.activeStep + 1) + '"]');
    this.domRenderer.addClass(this.stepElement, 'free-tour-target');
    const position = this.domRenderer.getStyle(this.stepElement, 'position');
    if (!position || position === 'inherit' || position === 'static') {
      this.domRenderer.addClass(this.stepElement, 'free-tour-relativePosition');
    }
    this.stepItem = this.data[this.activeStep];
    if (this.stepElement && this.stepItem) {
      this.getTargetOffset(this.stepElement);
    }
  }

  _goToStep(step: number) {
    this.activeStep = step - 1;
    this.show();
  }

  _previousStep() {
    --this.activeStep;
    if (this.activeStep < 0) {
      this.activeStep = 0;
      return false;
    }
    this.show();
  }

  _nextStep() {
    if (typeof (this.activeStep) === 'undefined') {
      this.activeStep = 0;
    } else {
      ++this.activeStep;
    }
    if (this.activeStep >= this.data.length) {
      this.activeStep = this.data.length - 1;
      return;
    }
    this.show();
  }

  getTargetOffset(target: any) {
    const rect = this.domRenderer.getRect(target);
    this.layerStyle = {
      width: (rect.width + 20) + 'px',
      height: (rect.height + 20) + 'px',
      left: (rect.left - 10) + 'px',
      top: (rect.top - 10) + 'px'
    };
  }

  _getOffset(element) {
    const elementPosition = {};
    elementPosition['width'] = element.offsetWidth;
    elementPosition['height'] = element.offsetHeight;

    let _x = 0;
    let _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    elementPosition['top'] = _y;
    elementPosition['left'] = _x;

    return elementPosition;
  }

  _getWinSize() {
    if (window.innerWidth !== undefined) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      const D = document.documentElement;
      return { width: D.clientWidth, height: D.clientHeight };
    }
  }

  _elementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      (rect.bottom + 80) <= window.innerHeight && // add 80 to get the text right
      rect.right <= window.innerWidth
    );
  }

  _mergeOptions(obj1, obj2) {
    const obj3 = {};
    for (const attrname in obj1) {
      if (obj1.hasOwnProperty(attrname)) {
        obj3[attrname] = obj1[attrname];
      }
    }
    for (const attrname in obj2) {
      if (obj2.hasOwnProperty(attrname)) {
        obj3[attrname] = obj2[attrname];
      }
    }
    return obj3;
  }

  _cloneObject(object) {
    if (object == null || typeof (object) !== 'object' || typeof (object.nodeType) !== 'undefined') {
      return object;
    }
    const temp = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        temp[key] = this._cloneObject(object[key]);
      }
    }
    return temp;
  }
}
@NgModule({
  imports: [CommonModule],
  declarations: [TourComponent],
  exports: [TourComponent]
})
export class TourModule {}

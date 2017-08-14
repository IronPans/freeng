import { CommonModule } from '@angular/common';
import { NgModule, Component, AfterViewInit,
  Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'free-loading',
  template: `
    <div class="free-loading" [ngSwitch]="type" #container>
      <div class="loader circle-line small" *ngSwitchCase="'circleLine'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader circle-line-spin small" *ngSwitchCase="'circleLineSpin'">
        <div class="circle-line-inner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="loader circle-round-fade small" *ngSwitchCase="'circleRoundFade'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader line-square small" *ngSwitchCase="'lineSquare'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader line-round small" *ngSwitchCase="'lineRound'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader line-bounce small" *ngSwitchCase="'lineBounce'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader circle-spin small" *ngSwitchCase="'circleSpin'">
        <div class="loader-placeholder"></div>
      </div>
      <div class="loader circle-round small" *ngSwitchDefault>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  `
})
export class LoadingComponent implements AfterViewInit {
  @Input() type: string;
  @Input() theme: string;
  @ViewChild('container') container: ElementRef;
  constructor(public renderer2: Renderer2) { }

  ngAfterViewInit() {
   if (this.theme) {
     this.renderer2.addClass(this.container.nativeElement, `free-${this.theme}`);
   }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})

export class LoadingModule {}

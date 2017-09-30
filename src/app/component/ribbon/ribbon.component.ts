import {AfterViewInit, Component, ElementRef, Input, NgModule, Renderer2, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-ribbon',
  template: `
    <div class="free-ribbon" #ribbon>
      <div class="free-ribbon-wrapper">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class RibbonComponent implements AfterViewInit {

  @Input() theme: string;
  @ViewChild('ribbon') ribbonViewChild: ElementRef;
  ribbon: HTMLDivElement;
  constructor(public renderer2: Renderer2) { }

  ngAfterViewInit() {
    this.ribbon = this.ribbonViewChild.nativeElement;
    if (this.theme) {
      this.renderer2.addClass(this.ribbon, `free-ribbon-${this.theme}`);
    }
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [RibbonComponent],
  exports: [RibbonComponent]
})

export class RibbonModule {}

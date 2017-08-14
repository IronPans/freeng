import { CommonModule } from '@angular/common';
import { NgModule, Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';

@Component({
  selector: 'free-badge',
  template: `<span class="free-badge" [class.free-badge-up]="up">{{content}}</span>`,
  providers: [DomRenderer]
})
export class BadgeComponent implements AfterViewInit {

  @Input() content: string;
  @Input() up: boolean;
  constructor(public domRenderer: DomRenderer,
              public er: ElementRef) { }

  ngAfterViewInit() {
    const container = this.er.nativeElement;
    const parent = this.domRenderer.parentNode(container);
    const position = this.domRenderer.getStyle(container, 'position');
    if (!position || position === 'static') {
      this.domRenderer.css(parent, {'position': 'relative'});
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [BadgeComponent],
  exports: [BadgeComponent]
})

export class BadgeModule {}

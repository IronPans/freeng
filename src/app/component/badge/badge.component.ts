import { CommonModule } from '@angular/common';
import { NgModule, Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import { DomRenderer } from '../common/dom';

@Component({
  selector: 'free-badge',
  template: `<span class="free-badge free-badge-{{theme}}" [ngStyle]="style"
                   [ngClass]="{'free-badge-outline': outline, 'free-badge-circle': circle}"
                   [class.free-badge-up]="up">{{content}}</span>`,
  providers: [DomRenderer]
})
export class BadgeComponent implements AfterViewInit {

  @Input() content: string;
  @Input() up: boolean;
  @Input() circle: boolean;
  @Input() outline: boolean;
  @Input() theme: string;
  @Input() style: any;
  constructor(public domRenderer: DomRenderer,
              public er: ElementRef) {
    this.circle = true;
    this.theme = 'default';
  }

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

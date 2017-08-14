import { CommonModule } from '@angular/common';
import { NgModule, Directive, OnInit, AfterViewInit,
  Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { DomRenderer } from '../common/dom';

@Directive({
  selector: '[fTooltip]',
  providers: [DomRenderer]
})
export class TooltipDirective implements OnInit, AfterViewInit {

  @Input('fTooltip') text: string;
  @Input() tooltipPosition = 'right';
  tooltip: any;

  constructor(public domRenderer: DomRenderer,
              public er: ElementRef,
              public renderer2: Renderer2) { }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: Event) {
    this.create();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: Event) {
    this.destroy();
  }

  ngOnInit() {}

  ngAfterViewInit() {

  }

  destroy() {
    this.renderer2.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  create() {
    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.innerHTML = this.text;
      this.tooltip.className = 'free-tooltip';
      this.tooltip.style.opacity = '0';
      this.renderer2.appendChild(document.body, this.tooltip);
      let top = 0;
      let left = 0;
      const rect = this.domRenderer.getRect(this.er.nativeElement);
      switch (this.tooltipPosition) {
        case 'left':
          top = rect.top - this.tooltip.offsetHeight / 2 + rect.height / 2;
          left = rect.left - this.tooltip.offsetWidth;
          break;
        case 'right':
          top = rect.top - this.tooltip.offsetHeight / 2 + rect.height / 2;
          left = rect.left + rect.width;
          break;
        case 'top':
          top = rect.top - this.tooltip.offsetHeight;
          left = rect.left - this.tooltip.offsetWidth / 2 + rect.width / 2;
          break;
        case 'bottom':
          top = rect.top + rect.height;
          left = rect.left - this.tooltip.offsetWidth / 2 + rect.width / 2;
          break;
      }
      this.domRenderer.addClass(this.tooltip, this.tooltipPosition);
      this.domRenderer.css(this.tooltip, {
        'top': top + 'px',
        'left': left + 'px',
        'opacity': '1'
      });
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipDirective],
  exports: [TooltipDirective]
})

export class TooltipModule {}

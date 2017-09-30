import { CommonModule } from '@angular/common';
import {
  NgModule, Directive, AfterViewInit, ElementRef, Input, Component
} from '@angular/core';
import {DomRenderer} from '../common/dom';

@Directive({
  selector: '[fButton]',
  providers: [DomRenderer]
})

export class ButtonDirective implements AfterViewInit {
  @Input() icon: string;
  @Input() theme: string;
  @Input() direction: string;
  @Input() round: string;
  @Input() roundRadius: number;
  @Input() size: string;
  @Input() loading: string;
  @Input() flat: boolean;
  @Input() circle: boolean;
  button: HTMLButtonElement;

  constructor(public er: ElementRef,
              public domRenderer: DomRenderer) {
    this.direction = 'left';
    this.theme = 'default';
  }

  ngAfterViewInit() {
    this.button = this.er.nativeElement;
    this.domRenderer.addClass(this.button, 'btn');
    this.domRenderer.addClass(this.button, 'btn-' + this.theme);

    if (this.size) {
      this.domRenderer.addClass(this.button, `btn-${this.size}`);
    }
    if (this.icon) {
      const icon = this.domRenderer.createElement('i');
       this.domRenderer.addClass(icon, 'fa');
       this.domRenderer.addClass(icon, 'fa-' + this.icon);
       const firstChild = this.button.firstChild;
       const lastChild = this.button.lastChild;
       if (this.direction === 'left' && firstChild) {
          this.domRenderer.insertBefore(this.button, icon, firstChild);
       } else {
         this.domRenderer.appendChild(this.button, icon);
       }

       if (lastChild && lastChild !== icon ) {
         this.domRenderer.addClass(icon, 'free-btn-' + this.direction);
       }
    }
    if (this.round) {
      this.domRenderer.addClass(this.button, 'btn-round');
    }

    if (this.roundRadius) {
      this.domRenderer.css(this.button, {
        'borderRadius': this.roundRadius
      })
    }
    if (this.flat) {
      this.domRenderer.addClass(this.button, 'btn-flat');
    }
    if (this.circle) {
      this.domRenderer.addClass(this.button, 'btn-circle');
    }
  }
}

@Directive({
  selector: '[fButton][block]',
  providers: [DomRenderer]
})

export class BlockDirective implements AfterViewInit {

  constructor(
      public domRenderer: DomRenderer,
      public er: ElementRef) {}

  ngAfterViewInit() {
    this.domRenderer.addClass(this.er.nativeElement, 'btn-block');
  }
}

@Component({
  selector: 'free-button-group',
  template: '<div class="btn-group" [class.btn-group-flat]="flat"><ng-content></ng-content></div>'
})

export class ButtonGroupComponent {
  @Input() flat: boolean;
}

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonDirective, BlockDirective, ButtonGroupComponent],
  exports: [ButtonDirective, BlockDirective, ButtonGroupComponent]
})

export class ButtonModule {}

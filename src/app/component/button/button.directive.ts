import { CommonModule } from '@angular/common';
import {
  NgModule, Directive, OnInit, AfterViewInit, ElementRef, Input, Component
} from '@angular/core';
import {DomRenderer} from '../common/dom';

@Directive({
  selector: '[fButton]',
  providers: [DomRenderer]
})

export class ButtonDirective implements OnInit, AfterViewInit {
  button: HTMLButtonElement;
  @Input() icon: string;
  @Input() color: string;
  @Input() direction = 'left';
  @Input() circle: string;
  @Input() round: number;
  @Input() size: string;
  @Input() loading: string;

  constructor(private er: ElementRef,
              private domRenderer: DomRenderer) {}

  ngOnInit() {
    if (!this.color) {
      this.color = 'default';
    }
  }

  ngAfterViewInit() {
    this.button = this.er.nativeElement;
    this.domRenderer.addClass(this.button, 'btn');
    this.domRenderer.addClass(this.button, 'btn-' + this.color);

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
    if (this.circle) {
      this.domRenderer.addClass(this.button, 'btn-circle');
    }

    if (this.round) {
      this.domRenderer.addClass(this.button, 'btn-round');
    }

  }
}

@Directive({
  selector: '[fButton][block]',
  providers: [DomRenderer]
})

export class BlockDirective implements AfterViewInit {

  constructor(
      private domRenderer: DomRenderer,
      private er: ElementRef) {}

  ngAfterViewInit() {
    this.domRenderer.addClass(this.er.nativeElement, 'btn-block');
  }
}

@Component({
  selector: 'free-button-group',
  template: '<div class="btn-group"><ng-content></ng-content></div>'
})

export class ButtonGroupComponent {

}

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonDirective, BlockDirective, ButtonGroupComponent],
  exports: [ButtonDirective, BlockDirective, ButtonGroupComponent]
})

export class ButtonModule {}

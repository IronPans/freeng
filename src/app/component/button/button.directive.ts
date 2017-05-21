/**
 * Created by root on 17-4-6.
 */
import { CommonModule } from '@angular/common';
import {NgModule, Directive, OnInit, AfterViewInit,
  ElementRef, Input, Renderer2, Component} from '@angular/core';

@Directive({
  selector: '[fButton]'
})

export class ButtonDirective implements OnInit, AfterViewInit {
  @Input() icon: string;
  @Input() color: string;
  // @Input() block: boolean;
  @Input() direction = 'left';
  @Input() circle: string;
  @Input() round: number;
  @Input() size: string;
  button: HTMLButtonElement;

  constructor(private er: ElementRef,
              private renderer2: Renderer2) {}

  ngOnInit() {
    if (!this.color) {
      this.color = 'default';
    }
  }

  ngAfterViewInit() {
    this.button = this.er.nativeElement;
    this.renderer2.addClass(this.button, 'btn');
    this.renderer2.addClass(this.button, 'btn-' + this.color);

    if (this.size) {
      this.renderer2.addClass(this.button, `btn-${this.size}`);
    };
    if (this.icon) {
      const icon = this.renderer2.createElement('i');
       this.renderer2.addClass(icon, 'fa');
       this.renderer2.addClass(icon, 'fa-' + this.icon);
       const firstChild = this.button.firstChild;
       const lastChild = this.button.lastChild;
       if (this.direction === 'left' && firstChild) {
          this.renderer2.insertBefore(this.button, icon, firstChild);
       } else {
         this.renderer2.appendChild(this.button, icon);
       }

       if (lastChild && lastChild !== icon ) {
         this.renderer2.addClass(icon, 'free-btn-' + this.direction);
       }
    };


    if (this.circle) {
      this.renderer2.addClass(this.button, 'btn-circle');
    }

    // if (this.block) {
    //   this.renderer2.addClass(this.button, 'btn-block');
    // }

    if (this.round) {
      this.renderer2.addClass(this.button, 'btn-round');
    }

  }
}

@Directive({
  selector: '[fButton][block]'
})

export class BlockDirective implements AfterViewInit {

  constructor(
      private renderer2: Renderer2,
      private er: ElementRef) {}

  ngAfterViewInit() {
    this.renderer2.addClass(this.er.nativeElement, 'btn-block');
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

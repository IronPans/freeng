import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, HostListener, Input,
  ViewChild, ElementRef, Renderer2
} from '@angular/core';

@Component({
  selector: 'free-hamburge',
  template: `
    <i class="hamburge hamburge-{{type}}" #container>
      <span></span>
      <span></span>
      <span></span>
    </i>
  `,
  styleUrls: ['./hamburge.component.scss']
})
export class HamburgeComponent implements OnInit {

  isOpen: boolean;
  @Input() type: string;
  @ViewChild('container') container: ElementRef;

  @HostListener('click')
  onClick() {
    const con = this.container.nativeElement;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer2.addClass(con, 'hamburge-open');
    } else {
      this.renderer2.removeClass(con, 'hamburge-open');
    }
  };

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [HamburgeComponent],
  exports: [HamburgeComponent]
})

export class HamburgeModule {}

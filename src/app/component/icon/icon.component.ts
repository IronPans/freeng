import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, AfterViewInit, Input,
  ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'free-icon',
  template: `<i #container class="free-icon fa fa-{{icon}}" [ngClass]="iconClass"></i>`,
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit, AfterViewInit {

  @Input() icon: string;
  @Input() spin: boolean;
  @Input() size: string;
  iconClass: any;
  @ViewChild('container') container: ElementRef;
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.iconClass = {
      'fa-spin': this.spin
    };
  }

  ngAfterViewInit() {
    const _container = this.container.nativeElement;

    if (this.size) {
      this.renderer2.addClass(_container, 'fa-' + this.size);
    }

    if (this.spin) {
      this.renderer2.addClass(_container, 'fa-spin');
    }
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent]
})

export class IconModule {}

import { CommonModule } from '@angular/common';
import {NgModule, Component, Input, ElementRef, HostBinding} from '@angular/core';

@Component({
  selector: 'free-image',
  template: `
    <div class="free-image" [class.free-highlight]="highlight">
      <img [src]="src" [alt]="alt">
    </div>
  `
})
export class ImageComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() highlight: boolean;
  @Input()
  set imageWidth(value: any) {
    this.width = value;
  };
  get imageWidth() {
    return this.width;
  }
  @HostBinding('style.width') width: any;
  constructor(public er: ElementRef) { }
}

@Component({
  selector: 'free-image-group',
  template: `
    <div class="free-image-group">
      <free-image *ngFor="let image of images" [src]="image.src" [alt]="image.alt"
                  [highlight]="image.highlight"></free-image>
    </div>
  `
})

export class ImageGroupComponent {
  @Input() images = [];
  constructor() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ImageComponent, ImageGroupComponent],
  exports: [ImageComponent, ImageGroupComponent]
})

export class ImageModule {}

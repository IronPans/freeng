import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'free-image',
  template: `
    <div class="free-image" [class.free-highlight]="highlight">
      <img [src]="src" [alt]="alt">
    </div>
  `
})
export class ImageComponent implements OnInit {

  @Input() src: string;
  @Input() alt: string;
  @Input() highlight: boolean;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'free-image-group',
  template: `
    <div class="free-image-group">
      <free-image *ngFor="let image of images" 
                  [src]="image.src" [alt]="image.alt" 
                  [highlight]="image.highlight"></free-image>
    </div>
  `,
  styleUrls: ['./image.component.scss']
})

export class ImageGroupComponent implements OnInit {

  @Input() images = [];
  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ImageComponent, ImageGroupComponent],
  exports: [ImageComponent, ImageGroupComponent]
})

export class ImageModule {}

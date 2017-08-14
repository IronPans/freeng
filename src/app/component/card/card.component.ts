import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'free-card-header',
  template: `
    <div class="free-card-header">
      <ng-content></ng-content>
    </div>
  `
})

export class CardHeaderComponent {}

@Component({
  selector: 'free-card-footer',
  template: `
    <div class="free-card-footer">
      <ng-content></ng-content>
    </div>
  `
})

export class CardFooterComponent {}

@Component({
  selector: 'free-card-media',
  template: `
    <div class="free-card-media">
      <ng-content></ng-content>
    </div>
  `
})

export class CardMediaComponent {}

@Component({
  selector: 'free-card-content',
  template: `
    <div class="free-card-content">
      <ng-content></ng-content>
    </div>
  `
})

export class CardContentComponent {}

@Component({
  selector: 'free-card-header-text',
  template: `<div class="free-card-header-text"><ng-content></ng-content></div>`
})

export class CardHeaderTextComponent {}

@Component({
  selector: 'free-card',
  template: `
    <div class="free-card" [ngClass]="cardClass">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent implements OnInit {

  @Input() direction: string;
  @Input() hover: boolean;
  cardClass = {};
  constructor() { }

  ngOnInit() {
    this.cardClass = {
      'free-card-hover': this.hover
    };
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [CardMediaComponent, CardHeaderTextComponent, CardContentComponent,
    CardHeaderComponent, CardFooterComponent, CardComponent],
  exports: [CardMediaComponent, CardHeaderTextComponent,
    CardContentComponent, CardHeaderComponent, CardFooterComponent, CardComponent]
})

export class CardModule {}

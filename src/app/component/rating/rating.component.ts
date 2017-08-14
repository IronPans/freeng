import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit, Input, Output, EventEmitter,
      ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'free-rating',
  template: `
    <div class="free-rating" #container>
      <span class="free-rating-item" *ngFor="let star of starArray;let i = index" (mouseover)="onMouseover($event, i)"
          (click)="onClick($event, i)">
        <i class="fa" [ngClass]="{'fa-star-o': (!value || i >= value), 'fa-star': (i < value)}"></i>
      </span>
    </div>
  `
})
export class RatingComponent implements OnInit, AfterViewInit {

  @Input() stars: number;
  @Input() type: string;
  @Input() value: number;
  @Input() readonly: boolean;
  @Input() theme: string;
  @Input() hover: boolean;
  @ViewChild('container') container: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  starArray: Number[];
  currentValue: number;

  constructor(public renderer2: Renderer2) {
    this.stars = 5;
    this.type = 'star'
  }

  ngOnInit() {
    this.starArray = [];
    for (let i = 0; i < this.stars; i++) {
      this.starArray.push(i);
    }
  }

  ngAfterViewInit() {
    if (this.theme) {
      this.renderer2.addClass(this.container.nativeElement, `free-${this.theme}`);
    }
  }

  onClick($event, value: number) {
    if (!this.readonly) {
      this.value = value + 1;
      this.onChange.emit(this.value);
    }
  }

  onMouseover($event: any, value: number) {
    if (this.hover && !this.readonly) {
      this.value = value + 1;
      this.currentValue = this.value;
    }
  }

  onMouseout() {

  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})

export class RatingModule {}

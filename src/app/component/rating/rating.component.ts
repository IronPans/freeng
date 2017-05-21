import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit, Input, Output, EventEmitter,
      ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'free-rating',
  template: `
    <div class="free-rating" #container>
      <span class="free-rating-item" *ngFor="let star of starArray;let i = index" 
          (click)="onClick($event, i)">
        <i class="fa" [ngClass]="{'fa-star-o': (!value || i >= value), 'fa-star': (i < value)}"></i>
      </span>
    </div>
  `,
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, AfterViewInit {

  @Input() stars = 5;
  @Input() type = 'star';
  @Input() value: number;
  @Input() readonly: boolean;
  @Input() color: string;
  starArray: Number[];
  @ViewChild('container') container: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.starArray = [];
    for (let i = 0; i < this.stars; i++) {
      this.starArray.push(i);
    }
  }

  ngAfterViewInit() {
    if (this.color) {
      this.renderer2.addClass(this.container.nativeElement, `free-${this.color}`);
    }
  }

  onClick($event, value: number) {
    if (!this.readonly) {
      this.value = value + 1;
      this.onChange.emit(this.value);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})

export class RatingModule {}

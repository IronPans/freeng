import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output, EventEmitter,
  ViewChild, ElementRef, Renderer2, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
  selector: 'free-rating',
  template: `
    <div class="free-rating" #container [class.free-rating-readonly]="readonly" (mouseleave)="onMouseleave()">
      <div class="free-rating-item" *ngFor="let star of starArray;let i = index">
        <div *ngIf="half" class="free-rating-half" [style.opacity]="isIn(i)?1:0"
             (mouseover)="onMouseover($event, i, true)" (click)="onClick($event, i, true)">
          <i class="fa" [ngClass]="{'fa-star-o': (!_value || i >= _value), 'fa-star': (i < _value)}"></i>
        </div>
        <div (mouseover)="onMouseover($event, i)" (click)="onClick($event, i)">
          <i class="fa" [ngClass]="{'fa-star-o': (half && isIn(i)) || (!_value || i >= _value),
          'fa-star': (half && !isIn(i)) || (i < _value)}"></i>
        </div>
      </div>
    </div>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RatingComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() stars: number;
  @Input() type: string;
  @Input() readonly: boolean;
  @Input() theme: string;
  @Input() hover: boolean;
  @Input() half: boolean;
  @ViewChild('container') container: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  starArray: Number[];
  _value: number;
  currentValue: number;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};
  @Input()
  set value(value: number) {
    this._value = value;
    this.currentValue = value;
  }
  get value() {
    return this._value;
  }

  constructor(public renderer2: Renderer2) {
    this.stars = 5;
    this.type = 'star';
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

  writeValue(value: number) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  isIn(value: number) {
    const ex = this._value - value;
    return ex > 0 && ex < 1;
  }

  onClick(event: any, value: number, half: boolean) {
    event.stopPropagation();
    if (!this.readonly) {
      this._value = value + 1;
      if (half && this.half) {
        this._value -= 0.5;
      }
      this.currentValue = this._value;
      this.onChange.emit(this._value);
      this.onModelChange(this._value);
    }
  }

  onMouseover(event: any, value: number, half: boolean) {
    event.stopPropagation();
    if (this.hover && !this.readonly) {
      this._value = value + 1;
      if (half && this.half) {
        this._value -= 0.5;
      }
    }
  }

  onMouseleave() {
    this._value = this.currentValue;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})

export class RatingModule {}

import { CommonModule } from '@angular/common';
import {
  NgModule, Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, forwardRef, OnInit
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SpinnerComponent),
  multi: true
};

@Component({
  selector: 'free-spinner',
  template: `
    <div class="free-spinner">
      <button class="free-spinner-minus" #minus (click)="onMinus()" [class.disabled]="min <= value"></button>
      <input type="text" [(ngModel)]="value">
      <button class="free-spinner-add" #add (click)="onAdd()" [class.disabled]="max >= value"></button>
    </div>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SpinnerComponent implements ControlValueAccessor, OnInit {

  @Input() get value() {
    return this._value;
  }
  set value(value: number) {
    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }
    this._value = value;
  }
  @Input() step: number;
  @Input() min: number;
  @Input() max: number;
  @ViewChild('minus') minus: ElementRef;
  @ViewChild('add') add: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  _value: number;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};
  constructor(public renderer2: Renderer2) {
    this.value = 0;
    this.step = 1;
  }

  ngOnInit() {
    if (this.value < this.min) {
      this.value = this.min;
    } else if (this.value > this.max) {
      this.value = this.max;
    }
  }

  writeValue(value: any) {
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

  onAdd() {
    if (this.max && this.max <= this.value) {
      this.value = this.max;
    } else {
      this.value += this.step;
    }
    this.onModelChange(this.value);
    this.onChange.emit(this.value);
  }

  onMinus() {
    if (this.min && this.value <= this.min) {
      this.value = this.min;
    } else {
      this.value -= this.step;
    }
    this.onModelChange(this.value);
    this.onChange.emit(this.value);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})

export class SpinnerModule {}

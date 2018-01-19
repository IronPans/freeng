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
      <button class="free-spinner-minus" #minus
              (click)="spin($event, -1)" [class.disabled]="min <= value"></button>
      <input type="text" [value]="_value" (keydown)="onInputKeydown($event)" (keyup)="onInputKeyup($event)"
             (keypress)="onInputKeyPress($event)" (change)="handleChange($event)">
      <button class="free-spinner-add" #add (click)="spin($event, 1)"
              [class.disabled]="max >= value"></button>
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

  formatNumber(value: any) {
    let v = Number(value);
    v = isNaN(v) ? (this.min ? this.min : 0) : v;
    return v;
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

  spin(event, add) {
    let value = this.min ? Math.max(this.min, this.value) : this.value;
    value = this.max ? Math.min(this.max, value) : value;
    this.value = value + add * this.step;
    this.onModelChange(this.value);
    this.onChange.emit(this.value);
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.which === 38) {
      this.spin(event, 1);
      event.preventDefault();
    } else if (event.which === 40) {
      this.spin(event, -1);
      event.preventDefault();
    }
  }

  onInputKeyPress(event: KeyboardEvent) {
    const keyPattern: RegExp = /[0-9\+\-]/;
    if (!keyPattern.test(String.fromCharCode(event.charCode)) &&
      event.keyCode !== 9 && event.keyCode !== 8 && event.keyCode !== 37 &&
      event.keyCode !== 39 && event.keyCode !== 46) {
      event.preventDefault();
    }
  }

  onInputKeyup(event: Event) {
    this.value = this.formatNumber((<HTMLInputElement>event.target).value);
    this.onModelChange(this.value);
  }

  handleChange(event: any) {
    this.onChange.emit(this.value);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})

export class SpinnerModule {}

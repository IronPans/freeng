import { CommonModule } from '@angular/common';
import {
  NgModule, Component, AfterViewInit, Input, ViewChild,
  ElementRef, Renderer2, Output, EventEmitter, forwardRef
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
      <button class="free-spinner-minus" #minus (click)="onMinus()"></button>
      <input type="text" [(ngModel)]="value">
      <button class="free-spinner-add" #add (click)="onAdd()"></button>
    </div>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SpinnerComponent implements ControlValueAccessor, AfterViewInit {

  @Input() value: number;
  @Input() step: number;
  @Input() min: number;
  @Input() max: number;
  @ViewChild('minus') minus: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};
  constructor(public renderer2: Renderer2) {
    this.value = 0;
    this.step = 1;
  }

  ngAfterViewInit() {
    if ((this.min && this.value <= this.min) || (this.max && this.max <= this.value)) {
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
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
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
    } else {
      this.value += this.step;
      this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
    }
    this.onModelChange(this.value);
    this.onChange.emit(this.value);
  }

  onMinus() {
    if (this.min && this.value <= this.min) {
      this.value = this.min;
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
    } else {
      this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
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

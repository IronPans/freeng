import { CommonModule } from '@angular/common';
import {
  NgModule, Component, AfterViewInit, Input, Output, Renderer2,
  EventEmitter, ElementRef, ViewChild, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'free-checkbox',
  template: `
    <label class="free-checkbox" #container>
      <div class="free-checkbox-inner">
        <input type="checkbox" value="{{value}}"  [disabled]="disabled"
            [checked]="checked" name="{{name}}" (change)="onCheckboxChange($event, label)">
        <div class="free-checkbox-ins"></div>
      </div>
      <div class="free-checkbox-title">{{label}}</div>
    </label>
    `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {

  @Input() name: string;
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() theme: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  checkedValue: any[];
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2) {
    this.checkedValue = [];
    this.theme = 'default';
  }

  ngAfterViewInit() {
    this.renderer2.addClass(this.container.nativeElement, `free-${this.theme}`);
  }

  writeValue(value: any) {
    if (value) {
      this.checkedValue = value;
      this.checked = this.isChecked();
    }
  }

  addValue() {
    if (this.checkedValue) {
      this.checkedValue = [...this.checkedValue, this.value];
    } else {
      this.checkedValue = [this.value];
    }
  }

  isChecked() {
    return this.checkedValue.indexOf(this.value) !== -1;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  onCheckboxChange(e: any, label: string) {
    if (!this.disabled) {
      e = e.target;
      this.checked = e.checked;
      if (this.checked) {
        this.addValue();
      } else {
        this.checkedValue.splice(this.checkedValue.indexOf(this.value), 1);
      }
      this.onChange.emit(this.checkedValue);
      this.onModelChange(this.checkedValue);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})

export class CheckboxModule {}

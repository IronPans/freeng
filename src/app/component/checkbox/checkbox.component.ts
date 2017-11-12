import { CommonModule } from '@angular/common';
import {
  NgModule, Component, Input, Output, Renderer2,
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
    <label [ngClass]="'free-checkbox'" [class]="styleClass"
           [class.free-checkbox-disabled]="disabled" #container>
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
export class CheckboxComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() label: string;
  @Input()
  set checked(value: boolean) {
    this._checked = value;
    if (!this.binary) {
      if (value) {
        this.addValue();
      } else {
        this.removeValue();
      }
    }
  }
  get checked() {
    return this._checked;
  }
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() styleClass: string;
  @Input() binary: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  checkedValue: any[];
  _checked: boolean;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2) {
    this.checkedValue = [];
  }

  writeValue(value: any) {
    if (value) {
      this.checkedValue = value;
      this.checked = this.isChecked();
    }
  }

  isChecked() {
    return this.checkedValue.indexOf(this.value) !== -1;
  }

  removeValue() {
    this.checkedValue = this.checkedValue.filter(val => val !== this.value);
  }

  addValue() {
    if (this.isChecked()) { return; }
    if (this.checkedValue) {
      this.checkedValue = [...this.checkedValue, this.value];
    } else {
      this.checkedValue = [this.value];
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  onCheckboxChange(e: any, label: string) {
    if (!this.disabled) {
      this.checked = e.target.checked;
      if (!this.binary) {
        if (this.checked) {
          this.addValue();
        } else {
          this.removeValue();
        }
        this.onModelChange(this.checkedValue);
      } else {
        this.onModelChange(this.checked);
      }
      this.onChange.emit(this.checked);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})

export class CheckboxModule {}

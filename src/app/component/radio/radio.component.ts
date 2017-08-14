import { CommonModule } from '@angular/common';
import {
  NgModule, Component, Input, Output, ViewChild, AfterViewInit,
  EventEmitter, ElementRef, Renderer2, forwardRef, Inject
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

@Component({
  selector: 'free-radio',
    template: `
    <label class="free-radio" #container>
      <div class="free-radio-inner">
        <input type="radio" value="{{label}}" [disabled]="disabled"
            [checked]="checked" name="{{name}}" (change)="onChange($event)">
        <div class="free-radio-ins"></div>
      </div>
      <div class="free-radio-label">{{label}}</div>
    </label>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RadioComponent implements ControlValueAccessor, AfterViewInit {

  @Input() name: string;
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() theme: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  public onModelChange: Function = () => {};
  public onTouchChange: Function = () => {};

  constructor(public renderer2: Renderer2) {}

  ngAfterViewInit() {
    if (this.theme) {
      this.renderer2.addClass(this.container.nativeElement, `free-${this.theme}`);
    }
  }

  writeValue(value: boolean) {
    if (value) {
      this.checked = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchChange = fn;
  }

  onChange(e: any) {
    if (!this.disabled) {
      e = e.target;
      this.checked = e.checked;
      this.onModelChange(this.checked);
      this.onClick.emit({
        name: e.name,
        value: e.value,
        checked: e.checked
      });
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RadioComponent],
  exports: [RadioComponent]
})

export class RadioModule {}

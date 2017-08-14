import { CommonModule } from '@angular/common';
import {
  NgModule, Component, EventEmitter, Input, AfterViewInit,
  Output, ViewChild, ElementRef, Renderer2, forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'free-switch',
  template: `
    <label class="free-switch" #container>
      <input type="checkbox" #checkbox [disabled]="disabled"
             [checked]="checked" (change)="inputChange($event, checkbox.checked)">
      <div class="free-switch-media">
        <span class="switch-label"></span>
      </div>
      <div class="free-switch-inner">{{label}}</div>
    </label>`,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SwitchComponent implements ControlValueAccessor, AfterViewInit {

  @Input() label: string;
  @Input() checked: boolean;
  @Input() value: any;
  @Input() type: number;
  @Input() disabled: boolean;
  @Input() theme: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  public onModelChange: Function = () => {};
  public onTouchChange: Function = () => {};
  constructor(public renderer2: Renderer2) { }

  ngAfterViewInit() {
    const _container = this.container.nativeElement;
    if (this.type) {
      this.renderer2.addClass(_container, 'free-switch-' + this.type);
    }
    if (this.theme) {
      this.renderer2.addClass(_container, 'free-' + this.theme);
    }
  }

  inputChange(event: any, value: boolean) {
    if (!this.disabled) {
      this.checked = value;
      this.onModelChange(this.checked);
      this.onChange.emit({
        originEvent: event,
        value: this.value,
        checked: this.checked
      });
    }
  }

  writeValue(value: any) {
    if (this.checked !== value) {
      this.checked = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchChange = fn;
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [SwitchComponent],
  exports: [SwitchComponent]
})

export class SwitchModule {}

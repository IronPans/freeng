import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, Input, Renderer2, OnDestroy,
  forwardRef, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit
} from '@angular/core';
import {DomRenderer} from '../common/dom';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputtextComponent),
  multi: true
};

@Component({
  selector: 'free-inputtext',
  template: `
    <div class="free-inputtext" [class.free-inputtext-inline]="inline">
      <label>
        <div class="input-label">
          <ng-content></ng-content>
        </div>
        <div class="input-field {{'free-' + theme}}" [ngClass]="inputClass">
          <span class="free-inputtext-addon" *ngIf="prefix"><i class="fa {{'fa-' + prefix}}"></i></span>
          <input type="{{type}}" #text [(ngModel)]="value"
                 (blur)="onBlur(text.value)" placeholder="{{placeholder}}" (input)="onInput(text)">
          <i *ngIf="icon" class="fa {{'fa-' + icon}} free-inputtext-validator"></i>
          <div class="free-inputtext-tip" #tip [style.display]="showTip ? 'block' : 'none'">
            {{message}}
          </div>
        </div></label>
    </div>
  `,
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputtextComponent  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input()
  set theme(value: string) {
    this._theme = value;
    switch (value) {
      case 'success': this.icon = 'check-circle'; break;
      case 'warning': this.icon = 'exclamation-circle'; break;
      case 'error': this.icon = 'times-circle'; break;
    }
  }
  get theme() {
    return this._theme;
  }
  @Input() icon: string;
  @Input() pattern: string;
  @Input() message: string;
  @Input() placeholder: string;
  @Input() prefix: string;
  @Input() inline: boolean;
  @Input() type: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('tip') tipViewChild: ElementRef;
  inputClass: object;
  tip: HTMLElement;
  showTip: boolean;
  _theme: string;
  public innerValue: any;
  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};
  constructor(public renderer2: Renderer2, public domRenderer: DomRenderer) {
    this.message = '验证错误!';
    this.type = 'text';
  }

  ngOnInit() {
    this.inputClass = {
      'input-field-icon': !!this.icon
    };
  }

  ngAfterViewInit() {
    this.tip = this.tipViewChild.nativeElement;
  }

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onModelChange(v);
    }
  }

  onBlur(value: string) {
    this.onModelTouched();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onModelTouched = fn;
  }

  onInput(target: any) {
    let regexp: any;
    const value = target.value;
    const rect = this.domRenderer.getRect(target);
    switch (this.pattern) {
      case 'tel':
        regexp = /^1[3,5,8]\d{9}/;
        break;
      case 'email':
        regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        break;
      case 'card':
        regexp = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
            break;
      case 'chinese':
        regexp = /^[\u4e00-\u9fa5]+$/;
           break;
      case 'url':
        regexp = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
        break;
      case 'number':
        regexp = /^\d+$/;
        break;
      case 'date':
        regexp = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
        break;
      default:
        regexp = new RegExp(this.pattern, 'i');
    }
    if (regexp.test(value)) {
      this.remove();
    } else {
      const left = rect.left + rect.width + 10;
      const winWidth = window.innerWidth;
      const tipWidth = this.tip.offsetWidth;
      this.domRenderer.removeClass(this.tip, 'free-tip-top free-tip-right');
      let className = 'free-tip-right';
      if ((left + tipWidth) > winWidth) {
        className = 'free-tip-top';
      }
      this.domRenderer.addClass(this.tip, className);
      this.showTip = true;
    }
  }

  remove() {
    if (this.tip) {
      this.showTip = false;
    }
  }

  ngOnDestroy() {
   this.remove();
  }

}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputtextComponent],
  exports: [InputtextComponent]
})

export class InputtextModule {}

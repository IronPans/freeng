import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, Input, Renderer2, OnDestroy,
  forwardRef, EventEmitter, Output} from '@angular/core';
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
    <div class="input-field {{'free-' + theme}}" [ngClass]="inputClass">
      <input type="text" #text [(ngModel)]="value"
             (blur)="onBlur(text.value)" placeholder="{{placeholder}}" (input)="onInput(text)">
      <span></span>
      <i *ngIf="icon" class="fa {{'fa-' + icon}}"></i>
    </div>

  `,
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputtextComponent  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() theme: string;
  @Input() icon: string;
  @Input() pattern: string;
  @Input() message: string;
  @Input() placeholder: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  inputClass: object;
  tip: HTMLElement;
  public innerValue: any;
  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};
  constructor(public renderer2: Renderer2, public domRenderer: DomRenderer) {
    this.message = '验证错误!';
  }

  ngOnInit() {
    this.inputClass = {
      'input-field-icon': !!this.icon
    };
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
    if (regexp.test(value) && this.tip) {
      this.remove();
    } else if (!regexp.test(value) && !this.tip) {
      this.tip = this.renderer2.createElement('div');
      this.tip.className = 'free-tip';
      this.tip.innerHTML = this.message;
      this.domRenderer.appendChild(document.body, this.tip);
      let top = rect.top + (rect.height - this.tip.offsetHeight) / 2;
      let left = rect.left + rect.width + 10;
      const winWidth = window.innerWidth;
      const tipWidth = this.tip.offsetWidth;
      const tipHeight = this.tip.offsetHeight;
      let className = 'free-tip-right';
      if ((left + tipWidth) > winWidth) {
        left = rect.left + (rect.width - tipWidth) / 2;
        top = rect.top - tipHeight - 10;
        className = 'free-tip-top';
      }
      this.domRenderer.addClass(this.tip, className);
      this.domRenderer.css(this.tip, {
        'top': top + 'px',
        'left': left + 'px',
        'opacity': 1,
        'transform': 'translate3d(0,0,0)'
      });
    }
  }

  remove() {
    if (this.tip) {
      this.domRenderer.removeChild(document.body, this.tip);
      this.tip = null;
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

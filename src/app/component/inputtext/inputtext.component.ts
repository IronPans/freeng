import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, Input, Renderer2} from '@angular/core';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-inputtext',
  template: `
    <div class="input-field {{color}}" [ngClass]="inputClass">
      <input type="text" #input placeholder="{{placeholder}}" (blur)="onBlur($event)">
      <span></span>
      <i *ngIf="icon" class="fa {{'fa-' + icon}}"></i>
    </div>

  `,
  styleUrls: ['./inputtext.component.scss'],
  providers: [DomRenderer]
})
export class InputtextComponent implements OnInit {
  @Input() color: string;
  @Input() icon: string;
  @Input() pattern: string;
  @Input() message = '验证错误!';
  @Input() placeholder: string;
  inputClass;
  tip: HTMLElement;
  constructor(private renderer2: Renderer2, private domRenderer: DomRenderer) { }

  ngOnInit() {
    this.inputClass = {
      'input-field-icon': !!this.icon
    }
  }

  onBlur(event: any) {
    let regexp: any;
    const target = event.target;
    const value = target.value;
    const rect = this.domRenderer.getRect(target);
    switch (this.pattern) {
      case 'tel':
        regexp = /1[3,5,8]\d{9}/;
        break;
      case 'email':
        regexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        break;
      case 'card':
        regexp = /^\d{15}|\d{18}$/;
            break;
      case 'chinese':
        regexp = /^[\u4e00-\u9fa5]+$/;
           break;
      default:
        regexp = new RegExp(this.pattern, 'i');
    }

    if (regexp.test(value) && this.tip) {
      this.renderer2.removeChild(document.body, this.tip);
    } else if (!regexp.test(value) && !this.tip) {
      this.tip = this.renderer2.createElement('div');
      this.tip.className = 'free-tip';
      this.tip.innerHTML = this.message;
      this.renderer2.appendChild(document.body, this.tip);
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

      this.renderer2.addClass(this.tip, className);
      this.renderer2.setStyle(this.tip, 'top', top + 'px');
      this.renderer2.setStyle(this.tip, 'left', left + 'px');
      this.renderer2.setStyle(this.tip, 'opacity', '1');
      this.renderer2.setStyle(this.tip, 'transform', 'translate3d(0,0,0)');
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [InputtextComponent],
  exports: [InputtextComponent]
})

export class InputtextModule {}

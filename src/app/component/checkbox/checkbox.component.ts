import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit, Input, Output, Renderer2,
  EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'free-checkbox',
  template: `
    <label class="free-checkbox" #container>
      <div class="free-checkbox-inner">
        <input type="checkbox" value="{{value}}"  [disabled]="disabled"
            [checked]="checked" name="{{name}}" (change)="onChange($event, label)">
        <div class="free-checkbox-ins"></div>
      </div>
      <div class="free-checkbox-title">{{label}}</div>
    </label>
    `,
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() color: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    if (!this.checked) {
      this.checked = false;
    }
  }

  ngAfterViewInit() {
    if (this.color) {
      this.renderer2.addClass(this.container.nativeElement, `free-${this.color}`);
    }
  }

  onChange(e: any, label: string) {
    if (!this.disabled) {
      e = e.target;
      this.checked = e.checked;
      this.onClick.emit({
        label: label,
        value: e.value,
        checked: e.checked
      });
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})

export class CheckboxModule {}

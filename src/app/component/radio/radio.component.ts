import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, Input, Output, ViewChild, AfterViewInit,
  EventEmitter, ElementRef, Renderer2
} from '@angular/core';

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
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() color: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.color) {
      this.renderer2.addClass(this.container.nativeElement, `free-${this.color}`);
    }
  }

  onChange(e: any) {
    if (!this.disabled) {
      e = e.target;
      this.checked = e.checked;
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

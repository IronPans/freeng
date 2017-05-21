import { CommonModule } from '@angular/common';
import { NgModule, Component, EventEmitter, Input, OnInit, AfterViewInit,
  Output, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'free-switch',
  template: `
    <label class="free-switch" #container>
      <input type="checkbox" [disabled]="disabled" [checked]="checked" (change)="inputChange($event)">
      <div class="free-switch-media">
        <span class="switch-label"></span>
      </div>
      <div class="free-switch-inner">{{label}}</div>
    </label>`,
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() checked: boolean;
  @Input() type: number;
  @Input() disabled: boolean;
  @Input() color: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const _container = this.container.nativeElement;
    if (this.type) {
      this.renderer2.addClass(_container, 'free-switch-' + this.type);
    }

    if (this.color) {
      this.renderer2.addClass(_container, 'free-switch-' + this.color);
    }
  }

  inputChange(event: any) {
    this.onChange.emit(event);
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [SwitchComponent],
  exports: [SwitchComponent]
})

export class SwitchModule {}

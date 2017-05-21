import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, AfterViewInit, Input, ViewChild,
ElementRef, Renderer2, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'free-spinner',
  template: `
    <div class="free-spinner">
      <button class="free-spinner-minus" #minus (click)="onMinus($event)"></button>
      <input type="text" [(ngModel)]="value">
      <button class="free-spinner-add" #add (click)="onAdd($event)"></button>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit {

  @Input() value = 0;
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;
  @ViewChild('minus') minus: ElementRef;
  @ViewChild('add') add: ElementRef;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    if ((this.min && this.value <= this.min) || (this.max && this.max <= this.value)) {
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
    }
  }

  onAdd(event: any) {
    if (this.max && this.max <= this.value) {
      this.value = this.max;
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
    } else {
      this.value += this.step;
      this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
    }
    this.onChange.emit(this.value);
  }

  onMinus(event: any) {
    if (this.min && this.value <= this.min) {
      this.value = this.min;
      this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
    } else {
      this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
      this.value -= this.step;
    }
    this.onChange.emit(this.value);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})

export class SpinnerModule {}

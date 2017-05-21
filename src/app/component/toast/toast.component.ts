import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit,
    Input, ElementRef } from '@angular/core';
import { trigger, animate, style, state, transition } from '@angular/animations';

@Component({
  selector: 'free-toast',
  template: `
    <div class="free-toast-group" #container *ngIf="value.length > 0">
      <div class="free-toast" *ngFor="let msg of value; let i = index" [@toastState]>
          <div>{{msg}}</div>
          <span class="fa fa-close free-toast-close" (click)="close(i)"></span>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastState', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [style({  // :enter
        transform: 'translateX(100%)',
        opacity: 0
      }), animate('.3s ease-in-out')]),
      transition('* => void', animate('.3s ease-in-out',
        style({transform: 'translateX(100%)', opacity: 0})))  // :leave
    ])
  ]
})
export class ToastComponent implements OnInit, AfterViewInit {
  @Input() delay: string;
  @Input() value = [];
  container: HTMLDivElement;
  constructor(private er: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.container = this.er.nativeElement;
  }

  close(index) {
    this.value.splice(index, 1);
  }

  removeAll() {
    this.value = [];
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent]
})

export class ToastModule {}

import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit, Renderer2,
  Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'free-progress',
  template: `
    <div class="free-progress" #container>
      <div class="free-progress-bar" #bar>
        <ng-container *ngIf="percent">{{value}}</ng-container>
      </div>
    </div>
  `
})
export class ProgressComponent implements OnInit, AfterViewInit {

  @Input() value: string;
  @Input() theme: string;
  @Input() move: boolean;
  @Input() striped: boolean;
  @Input() percent: boolean;
  @ViewChild('container') container: ElementRef;
  @ViewChild('bar') bar: ElementRef;
  _bar: HTMLElement;
  _container: HTMLElement;
  constructor(public renderer2: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this._container = this.container.nativeElement;
    this._bar = this.bar.nativeElement;

    if (this.move) {
      this.renderer2.addClass(this._container, 'free-active');
    }

    if (this.striped) {
      this.renderer2.addClass(this._container, 'free-progress-striped');
    }

    if (this.value) {
      this.renderer2.setStyle(this._bar, 'width', this.value);
    }

    if (this.theme) {
      this.renderer2.addClass(this._container, 'free-' + this.theme);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressComponent],
  exports: [ProgressComponent]
})

export class ProgressModule {}

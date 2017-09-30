import { CommonModule } from '@angular/common';
import { NgModule, Component, AfterViewInit, Renderer2,
  Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'free-progress',
  template: `
    <div class="free-progress" #container [ngStyle]="style" [style.background]="trackColor">
      <div class="free-progress-bar" #bar [style.background]="barColor">
        <ng-container *ngIf="percent">{{value}}</ng-container>
      </div>
    </div>
  `
})
export class ProgressComponent implements AfterViewInit {

  @Input() value: string;
  @Input() theme: string;
  @Input() move: boolean;
  @Input() striped: boolean;
  @Input() percent: boolean;
  @Input() width: any;
  @Input() height: any;
  @Input() barColor: string;
  @Input() trackColor: string;
  @Input() style: any;
  @ViewChild('container') container: ElementRef;
  @ViewChild('bar') bar: ElementRef;
  _bar: HTMLElement;
  _container: HTMLElement;
  constructor(public renderer2: Renderer2, public er: ElementRef) {
    this.width = '200px';
    this.height = '20px';
  }

  ngAfterViewInit() {
    this._container = this.container.nativeElement;
    this._bar = this.bar.nativeElement;
    this.renderer2.setStyle(this.er.nativeElement, 'width', this.width);
    this.renderer2.setStyle(this.er.nativeElement, 'height', this.height);

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

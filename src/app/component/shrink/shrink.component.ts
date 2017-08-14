import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output, ElementRef,
  ViewChild, ViewChildren, QueryList, Renderer2, HostListener
} from '@angular/core';
import { DomRenderer } from '../common/dom';

@Component({
  selector: 'free-shrink-item',
  template: `
    <a class="suspend-item" [ngStyle]="itemStyle">
      <i class="fa {{'fa-' + icon}}"></i>
    </a>
  `
})

export class ShrinkItemComponent implements OnInit {

  @Input() icon: string;
  @Input() itemStyle: any;
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'free-shrink',
  template: `
    <div class="suspend" #container>
				<span class="suspend-btn burge burge-line" #btn (click)="!hover && toggle()">
				<span></span>
				<span></span>
				<span></span>
				</span>
      <free-shrink-item *ngFor="let item of menus" [icon]="item.icon"></free-shrink-item>
    </div>
  `,
  providers: [DomRenderer]
})
export class ShrinkComponent implements OnInit, AfterViewInit {
  expanded: boolean;
  _items: any;
  btn: HTMLDivElement;
  container: HTMLDivElement;
  @Input()  reverse: boolean;
  @Input() menus: any;
  @Input() type = 'horizontal';
  @Input() direction = 'lt';
  @Input() hover: boolean;
  itemWidth: any;
  distance: number;
  delay: any;
  angle: number;
  @ViewChild('btn') _btn: ElementRef;
  @ViewChild('container') _container: ElementRef;
  @ViewChildren(ShrinkItemComponent) items: QueryList<ShrinkItemComponent>;
  @HostListener('mouseover') onMouseover() {
    if (this.hover) {
      this.toggle();
    }
  };
  @HostListener('mouseout') onMouseout() {
    if (this.hover) {
      this.toggle();
    }
  };
  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) { }

  ngOnInit() {
    this.reverse = false;
    this.distance = 10;
    this.angle = 60;
  }

  ngAfterViewInit() {
    this.btn = this._btn.nativeElement;
    this.container = this._container.nativeElement;
    this._items = this.items.toArray();
    this.itemWidth = this.btn.offsetWidth;
    const type = this.type.split('-');
    if (type[1] && type[1] === 'reverse') {
      this.type = type[0];
      this.reverse = true;
    }

    this.renderer2.addClass(this.container, `suspend-${this.type}`);
  }

  toggle() {
    if (this.expanded) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const op = this.reverse ? '-' : '';
    this.domRenderer.addClass(this.btn, 'burge-open');
    switch (this.type) {
      case 'horizontal':
        for (let i = 0; i < this._items.length; i++) {
          const x = op + ((this.itemWidth + this.distance) * (i + 1)) + 'px';
          this._items[i].itemStyle = {'opacity': 1, 'left': x};
        }
        break;
      case 'vertical':
        for (let i = 0; i < this._items.length; i++) {
          const x = op + ((this.itemWidth + this.distance) * (i + 1)) + 'px';
          this._items[i].itemStyle = { 'opacity': 1, 'top': x};
        }
        break;
      case 'circle':
        const r = this.itemWidth + this.distance;
        const dir = {
          lt: -180,
          lb: 90,
          rt: -90,
          rb: 0
        };
        const rotation = dir[this.direction];
        this.delay = parseInt(this.delay, 10);
        for (let i = 0; i < this._items.length; i++) {
          this.anim(i, rotation, r);
        }
        break;
    }
    this.expanded = true;
    this.domRenderer.addClass(this.container, 'suspend-expanded');
  }

  anim(i, rotation, r) {
    // -180/左上(lt)、 90/左下(lb)、-90/右上(rt)、0/右下(rb)
    const angle = (this.angle * i - rotation) / 180 * Math.PI;
    let x = Math.sin(angle) * r;
    let y = Math.cos(angle) * r;
    x = parseFloat(x.toFixed(3));
    y = parseFloat(y.toFixed(3));
    if (this.delay) {
      this._items[i].itemStyle = { 'transition-delay': this.delay * i + 'ms'};
    }
    const xy = 'translate(' + x + 'px,' + y + 'px)';
    this._items[i].itemStyle = {'opacity': 1, 'top': 0, 'transform': xy};
  }

  close() {
    switch (this.type) {
      case 'horizontal':
      case 'vertical':
      case 'circle':
        for (let i = 0; i < this._items.length; i++) {
          this._items[i].itemStyle = {'left': '0px', 'opacity': 0,
            'top': '0px', 'transform': 'translate(0,0)'};
        }
        break;
    }
    this.expanded = false;
    this.domRenderer.removeClass(this.btn, 'burge-open');
    this.domRenderer.removeClass(this.container, 'suspend-expanded');
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [ShrinkItemComponent, ShrinkComponent],
  exports: [ShrinkItemComponent, ShrinkComponent]
})

export class ShrinkModule {}

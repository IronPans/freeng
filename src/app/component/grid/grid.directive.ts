import { CommonModule } from '@angular/common';
import { NgModule, Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { DomRenderer } from '../common/dom';

@Directive({
  selector: '[fGrid]',
  providers: [DomRenderer]
})
export class GridDirective implements AfterViewInit {

  @Input('fGrid') grid: string;
  container: any;
  span: Array<any> = [
    'col-lg-1 col-md-1 col-sm-1 col-xs-2',
    'col-lg-2 col-md-2 col-sm-3 col-xs-4',
    'col-lg-3 col-md-4 col-sm-6 col-xs-6',
    'col-lg-4 col-md-4 col-sm-6 col-xs-12',
    'col-lg-5 col-md-5 col-sm-8 col-xs-12',
    'col-lg-6 col-md-6 col-sm-12 col-xs-12',
    'col-lg-7 col-md-7 col-sm-12 col-xs-12',
    'col-lg-8 col-md-8 col-sm-12 col-xs-12',
    'col-lg-9 col-md-9 col-sm-12 col-xs-12',
    'col-lg-10 col-md-10 col-sm-12 col-xs-12',
    'col-lg-11 col-md-11 col-sm-12 col-xs-12',
    'col-lg-12 col-md-12 col-sm-12 col-xs-12'
  ];

  constructor(private er: ElementRef,
      private domRenderer: DomRenderer) { }

  ngAfterViewInit() {
    this.container = this.er.nativeElement;
    this.domRenderer.addClass(this.container, this.span[parseInt(this.grid, 10) - 1]);
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [GridDirective],
  exports: [GridDirective]
})

export class GridModule {}

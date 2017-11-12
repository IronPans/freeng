import {CommonModule} from '@angular/common';
import {
  NgModule, Component, ViewContainerRef, EmbeddedViewRef, Input, OnInit, Directive,
  ComponentFactoryResolver, OnDestroy, TemplateRef
} from '@angular/core';

@Component({
  selector: 'f-header',
  template: '<ng-content></ng-content>'
})

export class HeaderComponent {
}

@Component({
  selector: 'f-footer',
  template: '<ng-content></ng-content>'
})

export class FooterComponent {
}

@Component({
  selector: 'free-template',
  template: ``
})

export class TemplateComponent implements OnInit, OnDestroy {

  @Input() template: any;
  @Input() index: any;
  @Input() data: any;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.data,
        'index': this.index
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

@Component({
  selector: 'free-column-template',
  template: ``
})

export class TemplateColumnComponent implements OnInit, OnDestroy {

  @Input() template: any;
  @Input() rowData: any;
  @Input() rowIndex: number;
  @Input() column: any;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.column,
        'rowData': this.rowData,
        'rowIndex': this.rowIndex
      });
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

@Directive({
  selector: '[fHost]'
})

export class FHostDirective implements OnInit {

  @Input() item: any;
  @Input() data: any;

  constructor(public _viewContainerRef: ViewContainerRef,
              public _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.item);

    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).data = this.data;
  }
}

@Directive({
  selector: '[fTemplate]'
})
export class FreeTemplateDirective {
  @Input() type: string;
  @Input('fTemplate') name: string;

  constructor(public template: TemplateRef<any>) {
  }

  getType(): string {
    return this.name;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeaderComponent, FooterComponent, TemplateComponent,
    TemplateColumnComponent, FHostDirective, FreeTemplateDirective],
  exports: [
    HeaderComponent, FooterComponent, TemplateComponent,
    TemplateColumnComponent, FHostDirective, FreeTemplateDirective]
})

export class ShareModule {
}

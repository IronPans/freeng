/**
 * Created by tg on 17-4-3.
 */
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule, Component, ViewContainerRef, EmbeddedViewRef, Input, OnInit, Directive,
  ComponentFactoryResolver
} from '@angular/core';

@Component({
  selector: 'f-header',
  template: '<ng-content></ng-content>'
})

export class HeaderComponent {}

@Component({
  selector: 'f-footer',
  template: '<ng-content></ng-content>'
})

export class FooterComponent {}

@Component({
  selector: 'free-template',
  template: ``
})

export class TemplateComponent implements OnInit {

  @Input() template: any;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.view = this._viewContainerRef.createEmbeddedView(this.template, {});
  }
}

@Directive({
  selector: '[fHost]'
})

export class FHostDirective implements OnInit {

  @Input() item: any;
  @Input() data: any;
  constructor(private _viewContainerRef: ViewContainerRef,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.item);

    const viewContainerRef = this._viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).data = this.data;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ HeaderComponent, FooterComponent, TemplateComponent, FHostDirective ],
  exports: [HeaderComponent, FooterComponent, TemplateComponent, FHostDirective]
})

export class ShareModule {}

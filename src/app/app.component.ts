import {Component, AfterViewInit, ComponentFactoryResolver,
  ViewChild, ViewContainerRef} from '@angular/core';
import {App} from './main/app';

@Component({
  selector: 'free-root',
  template: `
    <div class="free-main">
      <router-outlet></router-outlet>
    </div>
    <div #modalPortal></div>
    <div #overlayPortal></div>
    <div #loadingPortal></div>
    <div #toastPortal></div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('modalPortal', {read: ViewContainerRef}) _modalPortal;
  @ViewChild('overlayPortal', {read: ViewContainerRef}) _overlayPortal;
  @ViewChild('loadingPortal', {read: ViewContainerRef}) _loadingPortal;
  @ViewChild('toastPortal', {read: ViewContainerRef}) _toastPortal;
  viewContainerRef: ViewContainerRef;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private app: App) {
    this.app.intance = this;
  }
  ngAfterViewInit() {

  }

  insertPages(component: any, overlayIndex: number, opt?: any) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef: any;
    if (overlayIndex === 1) {
      viewContainerRef = this._modalPortal;
    } else if (overlayIndex === 2) {
      viewContainerRef = this._overlayPortal;
    } else if (overlayIndex === 3) {
      viewContainerRef = this._loadingPortal;
    } else if (overlayIndex === 4) {
      viewContainerRef = this._toastPortal;
    }
    // viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (opt) {
      (<any>componentRef.instance).data = opt;
    }
    (<any>componentRef.instance).onClose.subscribe(() => {
      componentRef.destroy();
    });

    return (<any>componentRef.instance);
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by tg on 17-4-3.
 */
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'f-header',
            template: '<ng-content></ng-content>'
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'f-footer',
            template: '<ng-content></ng-content>'
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
var TemplateComponent = (function () {
    function TemplateComponent(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        this.view = this._viewContainerRef.createEmbeddedView(this.template, {
            '\$implicit': this.data,
            'index': this.index
        });
    };
    TemplateComponent.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateComponent.prototype, "data", void 0);
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'free-template',
            template: ""
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
var TemplateColumnComponent = (function () {
    function TemplateColumnComponent(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    TemplateColumnComponent.prototype.ngOnInit = function () {
        this.view = this._viewContainerRef.createEmbeddedView(this.template, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    TemplateColumnComponent.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateColumnComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateColumnComponent.prototype, "rowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TemplateColumnComponent.prototype, "rowIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TemplateColumnComponent.prototype, "column", void 0);
    TemplateColumnComponent = __decorate([
        core_1.Component({
            selector: 'free-column-template',
            template: ""
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], TemplateColumnComponent);
    return TemplateColumnComponent;
}());
exports.TemplateColumnComponent = TemplateColumnComponent;
var FHostDirective = (function () {
    function FHostDirective(_viewContainerRef, _componentFactoryResolver) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    FHostDirective.prototype.ngOnInit = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.item);
        var viewContainerRef = this._viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.data;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FHostDirective.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FHostDirective.prototype, "data", void 0);
    FHostDirective = __decorate([
        core_1.Directive({
            selector: '[fHost]'
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            core_1.ComponentFactoryResolver])
    ], FHostDirective);
    return FHostDirective;
}());
exports.FHostDirective = FHostDirective;
var FreeTemplateDirective = (function () {
    function FreeTemplateDirective(template) {
        this.template = template;
    }
    FreeTemplateDirective.prototype.getType = function () {
        return this.name;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FreeTemplateDirective.prototype, "type", void 0);
    __decorate([
        core_1.Input('fTemplate'),
        __metadata("design:type", String)
    ], FreeTemplateDirective.prototype, "name", void 0);
    FreeTemplateDirective = __decorate([
        core_1.Directive({
            selector: '[fTemplate]'
        }),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], FreeTemplateDirective);
    return FreeTemplateDirective;
}());
exports.FreeTemplateDirective = FreeTemplateDirective;
var ShareModule = (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [HeaderComponent, FooterComponent, TemplateComponent, TemplateColumnComponent, FHostDirective, FreeTemplateDirective],
            exports: [HeaderComponent, FooterComponent, TemplateComponent, TemplateColumnComponent, FHostDirective, FreeTemplateDirective]
        })
    ], ShareModule);
    return ShareModule;
}());
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.js.map
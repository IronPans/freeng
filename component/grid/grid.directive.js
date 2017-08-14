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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var dom_1 = require("../common/dom");
var GridDirective = (function () {
    function GridDirective(er, domRenderer) {
        this.er = er;
        this.domRenderer = domRenderer;
        this.span = [
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
    }
    GridDirective.prototype.ngAfterViewInit = function () {
        this.container = this.er.nativeElement;
        this.domRenderer.addClass(this.container, this.span[parseInt(this.grid, 10) - 1]);
    };
    __decorate([
        core_1.Input('fGrid'),
        __metadata("design:type", String)
    ], GridDirective.prototype, "grid", void 0);
    GridDirective = __decorate([
        core_1.Directive({
            selector: '[fGrid]',
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            dom_1.DomRenderer])
    ], GridDirective);
    return GridDirective;
}());
exports.GridDirective = GridDirective;
var GridModule = (function () {
    function GridModule() {
    }
    GridModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [GridDirective],
            exports: [GridDirective]
        })
    ], GridModule);
    return GridModule;
}());
exports.GridModule = GridModule;
//# sourceMappingURL=grid.directive.js.map
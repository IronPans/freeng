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
var core_1 = require("@angular/core");
var animations_1 = require("../../component/common/animations");
var code_component_1 = require("../../component/code/code.component");
var tab_component_1 = require("../../component/tab/tab.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainTypographyComponent = (function () {
    function MainTypographyComponent() {
        this.display = 'block';
    }
    MainTypographyComponent.prototype.ngOnInit = function () {
    };
    return MainTypographyComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainTypographyComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainTypographyComponent.prototype, "display", void 0);
MainTypographyComponent = __decorate([
    core_1.Component({
        selector: 'free-main-typography',
        templateUrl: './main-typography.component.html',
        styleUrls: ['./main-typography.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainTypographyComponent);
exports.MainTypographyComponent = MainTypographyComponent;
var MainTypographyModule = (function () {
    function MainTypographyModule() {
    }
    return MainTypographyModule;
}());
MainTypographyModule = __decorate([
    core_1.NgModule({
        imports: [
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainTypographyComponent]
    })
], MainTypographyModule);
exports.MainTypographyModule = MainTypographyModule;
//# sourceMappingURL=main-typography.component.js.map
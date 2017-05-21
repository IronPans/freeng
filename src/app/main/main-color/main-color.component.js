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
var panel_component_1 = require("../../component/panel/panel.component");
var common_1 = require("@angular/common");
var grid_directive_1 = require("../../component/grid/grid.directive");
var config_1 = require("../../common/config");
var MainColorComponent = (function () {
    function MainColorComponent(renderer2) {
        this.renderer2 = renderer2;
        this.display = 'block';
        this.theme = [];
    }
    MainColorComponent.prototype.ngOnInit = function () {
        this.theme = config_1.config.theme;
    };
    MainColorComponent.prototype.selectTheme = function (value) {
        var className = document.body.className;
        var theme = /free-theme-2/.test(className);
        document.body.className = theme ? 'free-theme-2' : '';
        this.renderer2.addClass(document.body, "free-" + value);
    };
    return MainColorComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainColorComponent.prototype, "state", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainColorComponent.prototype, "display", void 0);
MainColorComponent = __decorate([
    core_1.Component({
        selector: 'free-main-color',
        templateUrl: './main-color.component.html',
        styleUrls: ['./main-color.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], MainColorComponent);
exports.MainColorComponent = MainColorComponent;
var MainColorModule = (function () {
    function MainColorModule() {
    }
    return MainColorModule;
}());
MainColorModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainColorComponent]
    })
], MainColorModule);
exports.MainColorModule = MainColorModule;
//# sourceMappingURL=main-color.component.js.map
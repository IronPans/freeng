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
var common_1 = require("@angular/common");
var share_1 = require("../../component/common/share");
var accordion_component_1 = require("../../component/accordion/accordion.component");
var panel_component_1 = require("../../component/panel/panel.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainComponent = (function () {
    function MainComponent() {
        this.display = 'block';
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    return MainComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainComponent.prototype, "display", void 0);
MainComponent = __decorate([
    core_1.Component({
        selector: 'free-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainComponent);
exports.MainComponent = MainComponent;
var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            share_1.ShareModule,
            accordion_component_1.AccordionModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainComponent]
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.component.js.map
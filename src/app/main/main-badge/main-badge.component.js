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
var table_component_1 = require("../../component/table/table.component");
var code_component_1 = require("../../component/code/code.component");
var tab_component_1 = require("../../component/tab/tab.component");
var common_1 = require("@angular/common");
var grid_directive_1 = require("../../component/grid/grid.directive");
var badge_component_1 = require("../../component/badge/badge.component");
var animations_1 = require("../../component/common/animations");
var MainBadgeComponent = (function () {
    function MainBadgeComponent() {
        this.display = 'block';
    }
    MainBadgeComponent.prototype.ngOnInit = function () {
    };
    return MainBadgeComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainBadgeComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainBadgeComponent.prototype, "display", void 0);
MainBadgeComponent = __decorate([
    core_1.Component({
        selector: 'free-main-badge',
        templateUrl: './main-badge.component.html',
        styleUrls: ['./main-badge.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainBadgeComponent);
exports.MainBadgeComponent = MainBadgeComponent;
var MainBadgeModule = (function () {
    function MainBadgeModule() {
    }
    return MainBadgeModule;
}());
MainBadgeModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            grid_directive_1.GridModule,
            badge_component_1.BadgeModule
        ],
        declarations: [MainBadgeComponent]
    })
], MainBadgeModule);
exports.MainBadgeModule = MainBadgeModule;
//# sourceMappingURL=main-badge.component.js.map
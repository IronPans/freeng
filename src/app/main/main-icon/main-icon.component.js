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
var common_1 = require("@angular/common");
var table_component_1 = require("../../component/table/table.component");
var code_component_1 = require("../../component/code/code.component");
var tab_component_1 = require("../../component/tab/tab.component");
var icon_component_1 = require("../../component/icon/icon.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var animations_1 = require("../../component/common/animations");
var MainIconComponent = (function () {
    function MainIconComponent() {
        this.display = 'block';
    }
    MainIconComponent.prototype.ngOnInit = function () {
    };
    return MainIconComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainIconComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainIconComponent.prototype, "display", void 0);
MainIconComponent = __decorate([
    core_1.Component({
        selector: 'free-main-icon',
        templateUrl: './main-icon.component.html',
        styleUrls: ['./main-icon.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainIconComponent);
exports.MainIconComponent = MainIconComponent;
var MainIconModule = (function () {
    function MainIconModule() {
    }
    return MainIconModule;
}());
MainIconModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            icon_component_1.IconModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainIconComponent]
    })
], MainIconModule);
exports.MainIconModule = MainIconModule;
//# sourceMappingURL=main-icon.component.js.map
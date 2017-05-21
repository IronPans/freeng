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
var table_component_1 = require("../../component/table/table.component");
var code_component_1 = require("../../component/code/code.component");
var tab_component_1 = require("../../component/tab/tab.component");
var common_1 = require("@angular/common");
var checkbox_component_1 = require("../../component/checkbox/checkbox.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var config_1 = require("../../common/config");
var button_directive_1 = require("../../component/button/button.directive");
var MainCheckboxComponent = (function () {
    function MainCheckboxComponent() {
        this.display = 'block';
        this.theme = [];
    }
    MainCheckboxComponent.prototype.ngOnInit = function () {
        this.theme = config_1.config.theme;
    };
    return MainCheckboxComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainCheckboxComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainCheckboxComponent.prototype, "display", void 0);
MainCheckboxComponent = __decorate([
    core_1.Component({
        selector: 'free-main-checkbox',
        templateUrl: './main-checkbox.component.html',
        styleUrls: ['./main-checkbox.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainCheckboxComponent);
exports.MainCheckboxComponent = MainCheckboxComponent;
var MainCheckboxModule = (function () {
    function MainCheckboxModule() {
    }
    return MainCheckboxModule;
}());
MainCheckboxModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            checkbox_component_1.CheckboxModule,
            grid_directive_1.GridModule,
            button_directive_1.ButtonModule
        ],
        declarations: [MainCheckboxComponent]
    })
], MainCheckboxModule);
exports.MainCheckboxModule = MainCheckboxModule;
//# sourceMappingURL=main-checkbox.component.js.map
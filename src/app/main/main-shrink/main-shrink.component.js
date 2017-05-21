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
var shrink_component_1 = require("../../component/shrink/shrink.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainShrinkComponent = (function () {
    function MainShrinkComponent() {
        this.menus = [
            { 'icon': 'user' },
            { 'icon': 'user' },
            { 'icon': 'user' }
        ];
    }
    MainShrinkComponent.prototype.ngOnInit = function () {
    };
    return MainShrinkComponent;
}());
MainShrinkComponent = __decorate([
    core_1.Component({
        selector: 'free-main-shrink',
        templateUrl: './main-shrink.component.html',
        styleUrls: ['./main-shrink.component.scss']
    }),
    __metadata("design:paramtypes", [])
], MainShrinkComponent);
exports.MainShrinkComponent = MainShrinkComponent;
var MainShrinkModule = (function () {
    function MainShrinkModule() {
    }
    return MainShrinkModule;
}());
MainShrinkModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            shrink_component_1.ShrinkModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainShrinkComponent]
    })
], MainShrinkModule);
exports.MainShrinkModule = MainShrinkModule;
//# sourceMappingURL=main-shrink.component.js.map
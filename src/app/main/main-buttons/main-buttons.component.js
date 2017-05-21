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
var button_directive_1 = require("../../component/button/button.directive");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainButtonsComponent = (function () {
    function MainButtonsComponent() {
        this.msg = [];
        this.num = 0;
        this.display = 'block';
        this.pageTitle = 'Components-Button-FreeNG';
    }
    MainButtonsComponent.prototype.ngOnInit = function () {
    };
    MainButtonsComponent.prototype.onClick = function () {
        this.msg.push('描述提示框' + (++this.num));
    };
    return MainButtonsComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainButtonsComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainButtonsComponent.prototype, "display", void 0);
MainButtonsComponent = __decorate([
    core_1.Component({
        selector: 'free-main-buttons',
        templateUrl: './main-buttons.component.html',
        styleUrls: ['./main-buttons.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainButtonsComponent);
exports.MainButtonsComponent = MainButtonsComponent;
var MainButtonsModule = (function () {
    function MainButtonsModule() {
    }
    return MainButtonsModule;
}());
MainButtonsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            button_directive_1.ButtonModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainButtonsComponent]
    })
], MainButtonsModule);
exports.MainButtonsModule = MainButtonsModule;
//# sourceMappingURL=main-buttons.component.js.map
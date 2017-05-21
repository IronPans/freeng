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
var grid_directive_1 = require("../../component/grid/grid.directive");
var code_component_1 = require("../../component/code/code.component");
var tab_component_1 = require("../../component/tab/tab.component");
var spinner_component_1 = require("../../component/spinner/spinner.component");
var table_component_1 = require("../../component/table/table.component");
var MainSpinnerComponent = (function () {
    function MainSpinnerComponent() {
        this.display = 'block';
    }
    MainSpinnerComponent.prototype.ngOnInit = function () {
    };
    return MainSpinnerComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainSpinnerComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainSpinnerComponent.prototype, "display", void 0);
MainSpinnerComponent = __decorate([
    core_1.Component({
        selector: 'free-main-spinner',
        templateUrl: './main-spinner.component.html',
        styleUrls: ['./main-spinner.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainSpinnerComponent);
exports.MainSpinnerComponent = MainSpinnerComponent;
var MainSpinnerModule = (function () {
    function MainSpinnerModule() {
    }
    return MainSpinnerModule;
}());
MainSpinnerModule = __decorate([
    core_1.NgModule({
        imports: [
            tab_component_1.TabGroupModule,
            table_component_1.TableModule,
            code_component_1.CodeModule,
            grid_directive_1.GridModule,
            spinner_component_1.SpinnerModule
        ],
        declarations: [MainSpinnerComponent]
    })
], MainSpinnerModule);
exports.MainSpinnerModule = MainSpinnerModule;
//# sourceMappingURL=main-spinner.component.js.map
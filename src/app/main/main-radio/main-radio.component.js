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
var radio_component_1 = require("../../component/radio/radio.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainRadioComponent = (function () {
    function MainRadioComponent() {
        this.display = 'block';
        this.abc = 'none';
    }
    MainRadioComponent.prototype.ngOnInit = function () {
        console.log(1);
    };
    MainRadioComponent.prototype.ngOnDestroy = function () {
        console.log(2);
    };
    return MainRadioComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainRadioComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainRadioComponent.prototype, "display", void 0);
MainRadioComponent = __decorate([
    core_1.Component({
        selector: 'free-main-radio',
        templateUrl: './main-radio.component.html',
        styleUrls: ['./main-radio.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainRadioComponent);
exports.MainRadioComponent = MainRadioComponent;
var MainRadioModule = (function () {
    function MainRadioModule() {
    }
    return MainRadioModule;
}());
MainRadioModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            radio_component_1.RadioModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainRadioComponent]
    })
], MainRadioModule);
exports.MainRadioModule = MainRadioModule;
//# sourceMappingURL=main-radio.component.js.map
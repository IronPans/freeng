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
var grid_directive_1 = require("../../component/grid/grid.directive");
var common_1 = require("@angular/common");
var table_component_1 = require("../../component/table/table.component");
var MainChangelogComponent = (function () {
    function MainChangelogComponent() {
        this.display = 'block';
    }
    MainChangelogComponent.prototype.ngOnInit = function () {
    };
    return MainChangelogComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainChangelogComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainChangelogComponent.prototype, "display", void 0);
MainChangelogComponent = __decorate([
    core_1.Component({
        selector: 'free-main-changelog',
        templateUrl: './main-changelog.component.html',
        styleUrls: ['./main-changelog.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainChangelogComponent);
exports.MainChangelogComponent = MainChangelogComponent;
var MainChangelogModule = (function () {
    function MainChangelogModule() {
    }
    return MainChangelogModule;
}());
MainChangelogModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule,
            table_component_1.TableModule
        ],
        declarations: [MainChangelogComponent]
    })
], MainChangelogModule);
exports.MainChangelogModule = MainChangelogModule;
//# sourceMappingURL=main-changelog.component.js.map
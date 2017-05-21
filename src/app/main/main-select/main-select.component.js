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
var select_component_1 = require("../../component/select/select.component");
var panel_component_1 = require("../../component/panel/panel.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var forms_1 = require("@angular/forms");
var MainSelectComponent = (function () {
    function MainSelectComponent() {
    }
    MainSelectComponent.prototype.ngOnInit = function () {
        this.options = [
            { label: 'just a city for select!just a city for select', value: '2' },
            { label: 'city2', value: '2' },
            { label: 'city3', value: '2' },
            { label: 'city4', value: '2' },
            { label: 'city5', value: '2' },
            { label: 'city6', value: '2' },
            { label: 'city7', value: '2' },
            { label: 'city8', value: '2' }
        ];
    };
    MainSelectComponent.prototype.onChange = function ($event) {
        console.log($event);
        console.log(this.test);
    };
    return MainSelectComponent;
}());
MainSelectComponent = __decorate([
    core_1.Component({
        selector: 'free-main-select',
        templateUrl: './main-select.component.html',
        styleUrls: ['./main-select.component.scss']
    }),
    __metadata("design:paramtypes", [])
], MainSelectComponent);
exports.MainSelectComponent = MainSelectComponent;
var MainSelectModule = (function () {
    function MainSelectModule() {
    }
    return MainSelectModule;
}());
MainSelectModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            select_component_1.SelectModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainSelectComponent]
    })
], MainSelectModule);
exports.MainSelectModule = MainSelectModule;
//# sourceMappingURL=main-select.component.js.map
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
var rating_component_1 = require("../../component/rating/rating.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainRatingComponent = (function () {
    function MainRatingComponent() {
        this.display = 'block';
    }
    MainRatingComponent.prototype.ngOnInit = function () {
    };
    MainRatingComponent.prototype.ratingChange = function (value) {
        this.ratingValue = value;
    };
    return MainRatingComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainRatingComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainRatingComponent.prototype, "display", void 0);
MainRatingComponent = __decorate([
    core_1.Component({
        selector: 'free-main-rating',
        templateUrl: './main-rating.component.html',
        styleUrls: ['./main-rating.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainRatingComponent);
exports.MainRatingComponent = MainRatingComponent;
var MainRatingModule = (function () {
    function MainRatingModule() {
    }
    return MainRatingModule;
}());
MainRatingModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            tab_component_1.TabGroupModule,
            code_component_1.CodeModule,
            table_component_1.TableModule,
            rating_component_1.RatingModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainRatingComponent]
    })
], MainRatingModule);
exports.MainRatingModule = MainRatingModule;
//# sourceMappingURL=main-rating.component.js.map
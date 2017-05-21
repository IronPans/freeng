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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var PaginationItemComponent = (function () {
    function PaginationItemComponent() {
    }
    PaginationItemComponent.prototype.ngOnInit = function () { };
    return PaginationItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationItemComponent.prototype, "label", void 0);
PaginationItemComponent = __decorate([
    core_1.Component({
        selector: 'free-pagination-item',
        template: "\n    <li class=\"free-pagination-item\">\n      <a>{{label}}</a>\n    </li>\n  "
    })
], PaginationItemComponent);
exports.PaginationItemComponent = PaginationItemComponent;
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.max = 5;
        this.onChange = new core_1.EventEmitter();
        this.lastIndex = this.max;
    }
    PaginationComponent.prototype.ngOnInit = function () {
    };
    PaginationComponent.prototype.sort = function (index, pag) {
        if (this.activeIndex === this.lastIndex) {
        }
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "paginator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "activeIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "max", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginationComponent.prototype, "onChange", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        selector: 'free-pagination',
        template: "\n    <div class=\"free-pagination\">\n      <ul>\n        <free-pagination-item *ngFor=\"let pag of paginator;trackBy: sort\" [label]=\"pag\"></free-pagination-item>\n      </ul>\n    </div>\n  ",
        styleUrls: ['./pagination.component.scss']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
var PaginationModule = (function () {
    function PaginationModule() {
    }
    return PaginationModule;
}());
PaginationModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [PaginationComponent, PaginationItemComponent],
        exports: [PaginationComponent, PaginationItemComponent]
    })
], PaginationModule);
exports.PaginationModule = PaginationModule;
//# sourceMappingURL=pagination.component.js.map
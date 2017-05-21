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
var BreadcrumbComponent = (function () {
    function BreadcrumbComponent() {
        this.separator = '/';
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
    };
    return BreadcrumbComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BreadcrumbComponent.prototype, "menus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BreadcrumbComponent.prototype, "separator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BreadcrumbComponent.prototype, "icon", void 0);
BreadcrumbComponent = __decorate([
    core_1.Component({
        selector: 'free-breadcrumb',
        template: "\n      <ol class=\"free-breadcrumb\" #container>\n        <ng-template ngFor let-item let-end=\"last\" let-i=\"index\" [ngForOf]=\"menus\">\n          <li>\n            <span *ngIf=\"i != 0 && !icon\" class=\"free-breadcrumb-separator\">\n              {{this.separator}}\n            </span>\n            <span *ngIf=\"i != 0 && icon\" class=\"fa fa-{{icon}} free-breadcrumb-separator\"></span>\n            <a>{{item.name}}</a>\n          </li>\n        </ng-template>\n      </ol>\n  ",
        styleUrls: ['./breadcrumb.component.scss']
    }),
    __metadata("design:paramtypes", [])
], BreadcrumbComponent);
exports.BreadcrumbComponent = BreadcrumbComponent;
var BreadcrumbModule = (function () {
    function BreadcrumbModule() {
    }
    return BreadcrumbModule;
}());
BreadcrumbModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [BreadcrumbComponent],
        exports: [BreadcrumbComponent]
    })
], BreadcrumbModule);
exports.BreadcrumbModule = BreadcrumbModule;
//# sourceMappingURL=breadcrumb.component.js.map
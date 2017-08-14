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
var ListComponent = (function () {
    function ListComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    ListComponent.prototype.ngOnInit = function () { };
    ListComponent.prototype.ngAfterViewInit = function () {
        var list = this.list.nativeElement;
        if (this.hover) {
            this.renderer2.addClass(list, 'free-list-hover');
        }
        if (this.line) {
            this.renderer2.addClass(list, 'free-list-line');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListComponent.prototype, "hover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListComponent.prototype, "line", void 0);
    __decorate([
        core_1.ViewChild('list'),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "list", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'free-list',
            template: "<div class=\"free-list\" #list><ng-content></ng-content></div>"
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
var ListItemComponent = (function () {
    function ListItemComponent() {
    }
    ListItemComponent = __decorate([
        core_1.Component({
            selector: 'free-list-item',
            template: "\n    <a class=\"free-list-item\">\n      <ng-content select=\"free-icon\"></ng-content>\n      <ng-content select=\"free-avatar\"></ng-content>\n      <div class=\"free-list-content\"><ng-content></ng-content></div>\n      <ng-content select=\"[fButton]\"></ng-content>\n    </a>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ListItemComponent);
    return ListItemComponent;
}());
exports.ListItemComponent = ListItemComponent;
var ListAvatarComponent = (function () {
    function ListAvatarComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    ListAvatarComponent.prototype.ngAfterViewInit = function () {
        if (this.large) {
            this.renderer2.addClass(this.avatar.nativeElement, 'free-avatar-large');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListAvatarComponent.prototype, "large", void 0);
    __decorate([
        core_1.ViewChild('avatar'),
        __metadata("design:type", core_1.ElementRef)
    ], ListAvatarComponent.prototype, "avatar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListAvatarComponent.prototype, "circle", void 0);
    ListAvatarComponent = __decorate([
        core_1.Component({
            selector: 'free-avatar',
            template: "<div class=\"free-avatar\" #avatar [class.free-avatar-circle]=\"circle\">\n    <ng-content select=\"free-image\"></ng-content>\n  </div>"
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], ListAvatarComponent);
    return ListAvatarComponent;
}());
exports.ListAvatarComponent = ListAvatarComponent;
var ListModule = (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ListAvatarComponent, ListItemComponent, ListComponent],
            exports: [ListAvatarComponent, ListItemComponent, ListComponent]
        })
    ], ListModule);
    return ListModule;
}());
exports.ListModule = ListModule;
//# sourceMappingURL=list.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by tg on 17-4-3.
 */
var common_1 = require("@angular/common");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'f-header',
        template: '<ng-content></ng-content>'
    })
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    core_1.Component({
        selector: 'f-footer',
        template: '<ng-content></ng-content>'
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
var ShareModule = (function () {
    function ShareModule() {
    }
    return ShareModule;
}());
ShareModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, animations_1.BrowserAnimationsModule],
        declarations: [HeaderComponent, FooterComponent],
        exports: [HeaderComponent, FooterComponent]
    })
], ShareModule);
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.js.map
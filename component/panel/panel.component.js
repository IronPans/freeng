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
var PanelComponent = (function () {
    function PanelComponent() {
    }
    PanelComponent.prototype.ngOnInit = function () {
        this.panelClass = {
            'theme-black': (this.theme === 'black' ? true : false)
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PanelComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PanelComponent.prototype, "theme", void 0);
    PanelComponent = __decorate([
        core_1.Component({
            selector: 'free-panel',
            template: "\n    <div class=\"free-panel\" [ngClass]=\"panelClass\">\n      <div class=\"free-panel-header\">\n        <span *ngIf=\"header\">{{header}}</span>\n        <ng-content select=\"f-header\"></ng-content>\n      </div>\n      <div class=\"free-panel-content\">\n        <div class=\"free-panel-inner\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], PanelComponent);
    return PanelComponent;
}());
exports.PanelComponent = PanelComponent;
var PanelModule = (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [PanelComponent],
            exports: [PanelComponent]
        })
    ], PanelModule);
    return PanelModule;
}());
exports.PanelModule = PanelModule;
//# sourceMappingURL=panel.component.js.map
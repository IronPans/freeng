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
var dom_1 = require("../common/dom");
var BadgeComponent = (function () {
    function BadgeComponent(domRenderer, er) {
        this.domRenderer = domRenderer;
        this.er = er;
    }
    BadgeComponent.prototype.ngAfterViewInit = function () {
        var container = this.er.nativeElement;
        var parent = this.domRenderer.parentNode(container);
        var position = this.domRenderer.getStyle(container, 'position');
        if (!position || position === 'static') {
            this.domRenderer.css(parent, { 'position': 'relative' });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BadgeComponent.prototype, "content", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BadgeComponent.prototype, "up", void 0);
    BadgeComponent = __decorate([
        core_1.Component({
            selector: 'free-badge',
            template: "<span class=\"free-badge\" [class.free-badge-up]=\"up\">{{content}}</span>",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer,
            core_1.ElementRef])
    ], BadgeComponent);
    return BadgeComponent;
}());
exports.BadgeComponent = BadgeComponent;
var BadgeModule = (function () {
    function BadgeModule() {
    }
    BadgeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [BadgeComponent],
            exports: [BadgeComponent]
        })
    ], BadgeModule);
    return BadgeModule;
}());
exports.BadgeModule = BadgeModule;
//# sourceMappingURL=badge.component.js.map
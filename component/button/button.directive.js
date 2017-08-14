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
var ButtonDirective = (function () {
    function ButtonDirective(er, domRenderer) {
        this.er = er;
        this.domRenderer = domRenderer;
        this.direction = 'left';
        this.theme = 'default';
    }
    ButtonDirective.prototype.ngAfterViewInit = function () {
        this.button = this.er.nativeElement;
        this.domRenderer.addClass(this.button, 'btn');
        this.domRenderer.addClass(this.button, 'btn-' + this.theme);
        if (this.size) {
            this.domRenderer.addClass(this.button, "btn-" + this.size);
        }
        if (this.icon) {
            var icon = this.domRenderer.createElement('i');
            this.domRenderer.addClass(icon, 'fa');
            this.domRenderer.addClass(icon, 'fa-' + this.icon);
            var firstChild = this.button.firstChild;
            var lastChild = this.button.lastChild;
            if (this.direction === 'left' && firstChild) {
                this.domRenderer.insertBefore(this.button, icon, firstChild);
            }
            else {
                this.domRenderer.appendChild(this.button, icon);
            }
            if (lastChild && lastChild !== icon) {
                this.domRenderer.addClass(icon, 'free-btn-' + this.direction);
            }
        }
        if (this.circle) {
            this.domRenderer.addClass(this.button, 'btn-circle');
        }
        if (this.round) {
            this.domRenderer.addClass(this.button, 'btn-round');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "circle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ButtonDirective.prototype, "round", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ButtonDirective.prototype, "loading", void 0);
    ButtonDirective = __decorate([
        core_1.Directive({
            selector: '[fButton]',
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            dom_1.DomRenderer])
    ], ButtonDirective);
    return ButtonDirective;
}());
exports.ButtonDirective = ButtonDirective;
var BlockDirective = (function () {
    function BlockDirective(domRenderer, er) {
        this.domRenderer = domRenderer;
        this.er = er;
    }
    BlockDirective.prototype.ngAfterViewInit = function () {
        this.domRenderer.addClass(this.er.nativeElement, 'btn-block');
    };
    BlockDirective = __decorate([
        core_1.Directive({
            selector: '[fButton][block]',
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer,
            core_1.ElementRef])
    ], BlockDirective);
    return BlockDirective;
}());
exports.BlockDirective = BlockDirective;
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent() {
    }
    ButtonGroupComponent = __decorate([
        core_1.Component({
            selector: 'free-button-group',
            template: '<div class="btn-group"><ng-content></ng-content></div>'
        })
    ], ButtonGroupComponent);
    return ButtonGroupComponent;
}());
exports.ButtonGroupComponent = ButtonGroupComponent;
var ButtonModule = (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ButtonDirective, BlockDirective, ButtonGroupComponent],
            exports: [ButtonDirective, BlockDirective, ButtonGroupComponent]
        })
    ], ButtonModule);
    return ButtonModule;
}());
exports.ButtonModule = ButtonModule;
//# sourceMappingURL=button.directive.js.map
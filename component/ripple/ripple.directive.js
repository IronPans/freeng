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
var RippleDirective = (function () {
    function RippleDirective(er, domRenderer) {
        this.er = er;
        this.domRenderer = domRenderer;
    }
    RippleDirective.prototype.onClick = function (e) {
        this.ripple(e, this.container);
    };
    RippleDirective.prototype.ngAfterViewInit = function () {
        this.container = this.er.nativeElement;
        this.domRenderer.addClass(this.container, 'ripple-effect');
    };
    RippleDirective.prototype.ripple = function (event, $this) {
        var x = event.pageX || document.documentElement.scrollLeft + document.body.scrollLeft + event.clientX;
        var y = event.pageY || document.documentElement.scrollTop + document.body.scrollTop + event.clientY;
        var wx = $this.offsetWidth;
        var rect = this.domRenderer.getRect(this.container);
        x = x - rect.left - wx / 2;
        y = y - rect.top - wx / 2;
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        var firstChild = $this.firstChild;
        if (this.rippleColor) {
            ripple.style.backgroundColor = this.rippleColor;
        }
        if (firstChild) {
            $this.insertBefore(ripple, firstChild);
        }
        else {
            $this.appendChild(ripple);
        }
        this.domRenderer.css(ripple, {
            width: wx + 'px',
            height: wx + 'px',
            top: y + 'px',
            left: x + 'px'
        });
        this.domRenderer.addClass(ripple, 'rippleEffect');
        this.domRenderer.animationEnd(ripple, function () {
            this.parentNode.removeChild(ripple);
        });
    };
    __decorate([
        core_1.Input('fRipple'),
        __metadata("design:type", String)
    ], RippleDirective.prototype, "rippleColor", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], RippleDirective.prototype, "onClick", null);
    RippleDirective = __decorate([
        core_1.Directive({
            selector: '[fRipple]',
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            dom_1.DomRenderer])
    ], RippleDirective);
    return RippleDirective;
}());
exports.RippleDirective = RippleDirective;
var RippleModule = (function () {
    function RippleModule() {
    }
    RippleModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [RippleDirective],
            exports: [RippleDirective]
        })
    ], RippleModule);
    return RippleModule;
}());
exports.RippleModule = RippleModule;
//# sourceMappingURL=ripple.directive.js.map
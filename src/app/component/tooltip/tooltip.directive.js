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
var TooltipDirective = (function () {
    function TooltipDirective(domRenderer, er, renderer2) {
        this.domRenderer = domRenderer;
        this.er = er;
        this.renderer2 = renderer2;
        this.tooltipPosition = 'right';
    }
    TooltipDirective.prototype.onMouseEnter = function (e) {
        this.create();
    };
    TooltipDirective.prototype.onMouseLeave = function (e) {
        this.destroy();
    };
    TooltipDirective.prototype.ngOnInit = function () { };
    TooltipDirective.prototype.ngAfterViewInit = function () {
    };
    TooltipDirective.prototype.destroy = function () {
        this.renderer2.removeChild(document.body, this.tooltip);
        this.tooltip = null;
    };
    TooltipDirective.prototype.create = function () {
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.innerHTML = this.text;
            this.tooltip.className = 'free-tooltip';
            this.tooltip.style.opacity = '0';
            this.renderer2.appendChild(document.body, this.tooltip);
            var top_1 = 0;
            var left = 0;
            var rect = this.domRenderer.getRect(this.er.nativeElement);
            switch (this.tooltipPosition) {
                case 'left':
                    top_1 = rect.top - this.tooltip.offsetHeight / 2 + rect.height / 2;
                    left = rect.left - this.tooltip.offsetWidth;
                    break;
                case 'right':
                    top_1 = rect.top - this.tooltip.offsetHeight / 2 + rect.height / 2;
                    left = rect.left + rect.width;
                    break;
                case 'top':
                    top_1 = rect.top - this.tooltip.offsetHeight;
                    left = rect.left - this.tooltip.offsetWidth / 2 + rect.width / 2;
                    break;
                case 'bottom':
                    top_1 = rect.top + rect.height;
                    left = rect.left - this.tooltip.offsetWidth / 2 + rect.width / 2;
                    break;
            }
            this.domRenderer.addClass(this.tooltip, this.tooltipPosition);
            this.domRenderer.css(this.tooltip, {
                'top': top_1 + 'px',
                'left': left + 'px',
                'opacity': '1'
            });
        }
    };
    return TooltipDirective;
}());
__decorate([
    core_1.Input('fTooltip'),
    __metadata("design:type", String)
], TooltipDirective.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipPosition", void 0);
__decorate([
    core_1.HostListener('mouseenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseLeave", null);
TooltipDirective = __decorate([
    core_1.Directive({
        selector: '[fTooltip]',
        providers: [dom_1.DomRenderer]
    }),
    __metadata("design:paramtypes", [dom_1.DomRenderer,
        core_1.ElementRef,
        core_1.Renderer2])
], TooltipDirective);
exports.TooltipDirective = TooltipDirective;
var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
TooltipModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [TooltipDirective],
        exports: [TooltipDirective]
    })
], TooltipModule);
exports.TooltipModule = TooltipModule;
//# sourceMappingURL=tooltip.directive.js.map
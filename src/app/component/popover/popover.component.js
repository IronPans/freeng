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
var button_directive_1 = require("../button/button.directive");
var animations_1 = require("../common/animations");
var PopoverComponent = (function () {
    function PopoverComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.direction = 'left';
    }
    PopoverComponent.prototype.ngOnInit = function () {
        this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
    };
    PopoverComponent.prototype.onMouseClick = function ($event) {
        if (!this.isOpen) {
            this.isOpen = !this.isOpen;
            this.modal = this.renderer2.createElement('div');
            this.renderer2.addClass(this.modal, 'free-popover-menu');
            this.renderer2.appendChild(this.modal, this.popoverMenu.nativeElement);
            var menu = this.modal.querySelector('.free-popover-content');
            menu.style.display = 'block';
            this.renderer2.removeClass(menu, 'open');
            var rect = this.domRenderer.getRect(this.button.nativeElement);
            this.renderer2.setStyle(menu, 'top', (rect.top) + 'px');
            this.renderer2.appendChild(document.body, this.modal);
            if (this.direction === 'left') {
                this.renderer2.setStyle(menu, 'left', rect.left + 'px');
            }
            else {
                this.renderer2.setStyle(menu, 'transform-origin', 'top right 0');
                this.renderer2.setStyle(menu, 'left', (rect.right - menu.offsetWidth) + 'px');
            }
            var width = menu.offsetWidth;
            this.renderer2.addClass(menu, 'open');
            if (this.isOpen) {
                this.selfClick = true;
                this.onDocumentClickListener();
            }
            this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
        }
        else {
            this.close();
        }
    };
    PopoverComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            // 给body绑定点击事件
            this.documentClickListener = this.renderer2.listen('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                _this.selfClick = false;
                _this.itemClick = false;
            });
        }
    };
    PopoverComponent.prototype.close = function () {
        this.isOpen = false;
        this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
        this.renderer2.removeChild(document.body, this.modal);
        this.modal = null;
        this.offDocumentClickListener();
    };
    PopoverComponent.prototype.offDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    return PopoverComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PopoverComponent.prototype, "menus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PopoverComponent.prototype, "direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "popoverStateClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PopoverComponent.prototype, "color", void 0);
__decorate([
    core_1.ViewChild('btn'),
    __metadata("design:type", core_1.ElementRef)
], PopoverComponent.prototype, "button", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], PopoverComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild('popoverMenu'),
    __metadata("design:type", core_1.ElementRef)
], PopoverComponent.prototype, "popoverMenu", void 0);
PopoverComponent = __decorate([
    core_1.Component({
        selector: 'free-popover',
        template: "\n    <div class=\"free-popover\" #container>\n      <button #btn class=\"free-popover-header\" fButton [color]=\"color\"\n              [class.active]=\"isOpen\" (click)=\"onMouseClick($event)\">\n        <span class=\"free-popover-header-title\" *ngIf=\"header\">{{name}}</span>\n        <ng-content select=\"f-header\"></ng-content>\n      </button>\n      <div class=\"free-popover-content\" #popoverMenu style=\"display: none;\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
        styleUrls: ['./popover.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [dom_1.DomRenderer,
        core_1.Renderer2])
], PopoverComponent);
exports.PopoverComponent = PopoverComponent;
var PopoverModule = (function () {
    function PopoverModule() {
    }
    return PopoverModule;
}());
PopoverModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_directive_1.ButtonModule],
        declarations: [PopoverComponent],
        exports: [PopoverComponent],
        providers: [dom_1.DomRenderer]
    })
], PopoverModule);
exports.PopoverModule = PopoverModule;
//# sourceMappingURL=popover.component.js.map
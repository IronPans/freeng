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
var animations_1 = require("@angular/animations");
var button_directive_1 = require("../button/button.directive");
var dom_1 = require("../common/dom");
var DropdownComponent = (function () {
    function DropdownComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.direction = 'left';
        this.caret = true;
    }
    DropdownComponent.prototype.ngOnInit = function () {
        this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
    };
    DropdownComponent.prototype.onMouseClick = function ($event) {
        if (!this.isOpen) {
            this.isOpen = !this.isOpen;
            this.modal = this.renderer2.createElement('div');
            this.renderer2.addClass(this.modal, 'free-dropdown-menu');
            this.renderer2.appendChild(this.modal, this.dropdownMenu.nativeElement);
            var menu = this.modal.querySelector('ul');
            menu.style.display = 'block';
            this.renderer2.removeClass(menu, 'open');
            var rect = this.domRenderer.getRect(this.button.nativeElement);
            this.renderer2.setStyle(menu, 'top', (rect.top + rect.height) + 'px');
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
            this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
        }
        else {
            this.close();
        }
    };
    DropdownComponent.prototype.onItemClick = function ($event) {
        this.itemClick = true;
    };
    DropdownComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            // 给body绑定点击事件
            this.documentClickListener = this.renderer2.listen('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                ;
                _this.selfClick = false;
                _this.itemClick = false;
            });
        }
    };
    DropdownComponent.prototype.close = function () {
        this.isOpen = false;
        this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
        this.renderer2.removeChild(document.body, this.modal);
        this.modal = null;
        this.offDocumentClickListener();
    };
    DropdownComponent.prototype.offDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    return DropdownComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "menus", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownComponent.prototype, "dropdownStateClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownComponent.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "caret", void 0);
__decorate([
    core_1.ViewChild('btn'),
    __metadata("design:type", core_1.ElementRef)
], DropdownComponent.prototype, "button", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], DropdownComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChild('dropdownMenu'),
    __metadata("design:type", core_1.ElementRef)
], DropdownComponent.prototype, "dropdownMenu", void 0);
DropdownComponent = __decorate([
    core_1.Component({
        selector: 'free-dropdown',
        template: "\n    <div class=\"free-dropdown\" #container>\n      <button #btn class=\"free-dropdown-header\" fButton [color]=\"color\"\n          [class.active]=\"isOpen\" (click)=\"onMouseClick($event)\">\n        <span class=\"free-dropdown-header-title\" *ngIf=\"header\">{{name}}</span>\n        <ng-content select=\"f-header\"></ng-content>\n        <span class=\"fa fa-caret-down d-caret\" *ngIf=\"caret\"></span>\n      </button>\n      <ul #dropdownMenu style=\"display: none;\">\n        <li *ngFor=\"let menu of menus\" (click)=\"onItemClick($event)\">\n          <i *ngIf=\"menu.icon\" class=\"fa {{'fa-' + menu.icon}}\"></i> {{menu.name}}\n        </li>\n      </ul>\n    </div>\n  ",
        styleUrls: ['./dropdown.component.scss'],
        animations: [
            animations_1.trigger('dropdownState', [
                animations_1.state('active', animations_1.style({
                    transform: 'scaleY(1)',
                    opacity: 1
                })),
                animations_1.state('inactive', animations_1.style({
                    transform: 'scaleY(0)',
                    opacity: 0
                })),
                animations_1.transition('inactive <=> active', animations_1.animate('300ms ease'))
            ])
        ],
        providers: [dom_1.DomRenderer]
    }),
    __metadata("design:paramtypes", [dom_1.DomRenderer,
        core_1.Renderer2])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
var DropdownModule = (function () {
    function DropdownModule() {
    }
    return DropdownModule;
}());
DropdownModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_directive_1.ButtonModule],
        declarations: [DropdownComponent],
        exports: [DropdownComponent]
    })
], DropdownModule);
exports.DropdownModule = DropdownModule;
//# sourceMappingURL=dropdown.component.js.map
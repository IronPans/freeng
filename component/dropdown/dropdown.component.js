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
var router_1 = require("@angular/router");
var DropdownComponent = (function () {
    function DropdownComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.direction = 'bottom-left';
        this.caret = true;
    }
    DropdownComponent.prototype.clickDisabled = function (event, item) {
        if (!item.url) {
            event.preventDefault();
            return false;
        }
    };
    DropdownComponent.prototype.ngAfterViewInit = function () {
        this.domRenderer.addClass(this.dropdownMenu.nativeElement, "free-dropdown-" + this.direction);
    };
    DropdownComponent.prototype.open = function (event) {
        if (!this.hover) {
            this.selfClick = true;
            if (!this.isOpen) {
                this.isOpen = !this.isOpen;
            }
            else {
                this.close();
            }
            this.onDocumentClickListener();
        }
    };
    DropdownComponent.prototype.onMouseover = function () {
        if (this.hover) {
            this.isOpen = true;
        }
    };
    DropdownComponent.prototype.onMouseout = function () {
        if (this.hover) {
            this.isOpen = false;
        }
    };
    DropdownComponent.prototype.onItemClick = function () {
        if (this.hover) {
            this.isOpen = false;
        }
        else {
            this.close();
        }
    };
    DropdownComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer2.listen('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                _this.selfClick = false;
                _this.itemClick = false;
            });
        }
    };
    DropdownComponent.prototype.close = function () {
        this.isOpen = false;
        this.offDocumentClickListener();
    };
    DropdownComponent.prototype.offDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
        this.offDocumentClickListener();
    };
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
    ], DropdownComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "caret", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "hover", void 0);
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
            template: "\n    <div class=\"free-dropdown\" #container (mouseover)=\"onMouseover()\" (mouseout)=\"onMouseout()\">\n      <button #btn class=\"free-dropdown-header\" fButton [theme]=\"theme\"\n              [class.active]=\"isOpen\" (click)=\"open($event)\">\n        <span class=\"free-dropdown-header-title\" *ngIf=\"header\">{{header}}</span>\n        <ng-content select=\"f-header\"></ng-content>\n        <span class=\"fa fa-caret-down d-caret\" *ngIf=\"caret\"></span>\n      </button>\n      <div #dropdownMenu class=\"free-dropdown-menu\" [@dropdownState]=\"isOpen ? 'active' : 'inactive'\">\n        <ul *ngIf=\"menus\">\n          <li *ngFor=\"let menu of menus\" (click)=\"onItemClick()\">\n            <a *ngIf=\"menu.routerLink\" [routerLink]=\"menu.routerLink\" [attr.target]=\"menu.target\">\n              <i *ngIf=\"menu.icon\" class=\"fa {{'fa-' + menu.icon}}\"></i> {{menu.name}}\n            </a>\n            <a *ngIf=\"!menu.routerLink\" [href]=\"menu.url || '#'\" (click)=\"clickDisabled($event, menu)\"\n               [attr.target]=\"menu.target\">\n              <i *ngIf=\"menu.icon\" class=\"fa {{'fa-' + menu.icon}}\"></i> {{menu.name}}\n            </a>\n          </li>\n        </ul>\n        <div *ngIf=\"!menus\" class=\"free-dropdown-wrapper\" (click)=\"onItemClick()\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('dropdownState', [
                    animations_1.state('active', animations_1.style({
                        transform: 'scale(1)',
                        opacity: 1
                    })),
                    animations_1.state('inactive', animations_1.style({
                        transform: 'scale(0)',
                        opacity: 0
                    })),
                    animations_1.transition('inactive <=> active', animations_1.animate('300ms ease'))
                ])
            ],
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.Renderer2])
    ], DropdownComponent);
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
var DropdownModule = (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, button_directive_1.ButtonModule, router_1.RouterModule],
            declarations: [DropdownComponent],
            exports: [DropdownComponent]
        })
    ], DropdownModule);
    return DropdownModule;
}());
exports.DropdownModule = DropdownModule;
//# sourceMappingURL=dropdown.component.js.map
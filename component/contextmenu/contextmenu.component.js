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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var dom_1 = require("../common/dom");
var ContextmenuItemComponent = (function () {
    function ContextmenuItemComponent(contextMenu, location, domRenderer) {
        this.contextMenu = contextMenu;
        this.location = location;
        this.domRenderer = domRenderer;
    }
    ContextmenuItemComponent.prototype.onMouseenter = function (event, child, item) {
        if (child.disabled) {
            return;
        }
        this.activeItem = item;
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var childItem = nextElement.children[0];
            this.position(childItem, item);
        }
    };
    ContextmenuItemComponent.prototype.clickDisabled = function (event, item) {
        if (!item.url) {
            event.preventDefault();
            return false;
        }
    };
    ContextmenuItemComponent.prototype.onMouseleave = function (event) {
        this.activeItem = null;
    };
    ContextmenuItemComponent.prototype.position = function (childItem, item) {
        var rect = this.domRenderer.getRect(item);
        var _a = [window.innerWidth, window.innerHeight], wWidth = _a[0], wHeight = _a[1];
        var left = '100%';
        var top = 0;
        var width = childItem.offsetWidth;
        var height = childItem.offsetHeight;
        if (!width) {
            var w = this.domRenderer.getHiddenElementOuterHeight(childItem);
            width = w.width;
            height = w.height;
        }
        if (rect.left + rect.width + width > wWidth) {
            left = '-100%';
        }
        if (rect.top + height > wHeight) {
            top = height - rect.height;
        }
        childItem.style.left = left;
        childItem.style.top = top;
    };
    ContextmenuItemComponent.prototype.itemClick = function (event, child) {
        this.contextMenu.hide();
        if (child && child.back) {
            this.location.back();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextmenuItemComponent.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextmenuItemComponent.prototype, "root", void 0);
    ContextmenuItemComponent = __decorate([
        core_1.Component({
            selector: 'free-contextmenu-item',
            template: "\n    <ul class=\"free-contextmenu-wrapper\" [ngClass]=\"{'free-contextmenu-child': !root}\">\n      <ng-template ngFor let-child [ngForOf]=\"item\">\n        <li class=\"free-contextmenu-separator\" *ngIf=\"child.separator\"></li>\n        <li *ngIf=\"!child.separator\" class=\"free-contextmenu-item\" #item\n            [ngClass]=\"{'free-contextmenu-active': item == activeItem,\n              'free-contextmenu-disabled': child.disabled}\"\n            (mouseenter)=\"onMouseenter($event, child, item)\" (mouseleave)=\"onMouseleave($event)\">\n          <a *ngIf=\"!child.routerLink && !child.back\" (click)=\"clickDisabled($event, child)\"\n             [href]=\"child.url\" [attr.target]=\"child.target\">\n            <span><i *ngIf=\"child.icon\" class=\"fa fa-{{child.icon}}\"></i>{{child.label}}</span>\n            <span class=\"fa fa-fw fa-caret-right\" *ngIf=\"child.item\"></span>\n          </a>\n          <a *ngIf=\"child.routerLink && !child.back\" [routerLink]=\"child.routerLink\" (click)=\"itemClick($event)\"\n             [href]=\"child.url\" [attr.target]=\"child.target\">\n            <span><i *ngIf=\"child.icon\" class=\"fa fa-{{child.icon}}\"></i>{{child.label}}</span>\n            <span class=\"fa fa-fw fa-caret-right\" *ngIf=\"child.item\"></span>\n          </a>\n          <a *ngIf=\"child.back\" (click)=\"itemClick($event, child)\">\n            <span><i *ngIf=\"child.icon\" class=\"fa fa-{{child.icon}}\"></i>{{child.label}}</span>\n            <span class=\"fa fa-fw fa-caret-right\" *ngIf=\"child.item\"></span>\n          </a>\n          <free-contextmenu-item [item]=\"child.item\" *ngIf=\"child.item\"></free-contextmenu-item>\n        </li>\n      </ng-template>\n    </ul>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ContextmenuComponent; }))),
        __metadata("design:paramtypes", [ContextmenuComponent,
            common_1.Location,
            dom_1.DomRenderer])
    ], ContextmenuItemComponent);
    return ContextmenuItemComponent;
}());
exports.ContextmenuItemComponent = ContextmenuItemComponent;
var ContextmenuComponent = (function () {
    function ContextmenuComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
    }
    ContextmenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerViewChild.nativeElement;
        this.documentClickListener = this.renderer2.listen('document', 'click', function () {
            _this.hide();
        });
        if (this.global) {
            this.documentClickListener = this.renderer2.listen('document', 'contextmenu', function () {
                if (_this.container) {
                    _this.show(event);
                    event.preventDefault();
                }
            });
        }
        else if (this.target) {
            this.childClickListener = this.renderer2.listen(this.target, 'contextmenu', function (event) {
                _this.show(event);
                event.stopPropagation();
                event.preventDefault();
            });
        }
    };
    ContextmenuComponent.prototype.show = function (event) {
        if (this.visible) {
            return;
        }
        this.visible = true;
        this.position(event);
        if (event) {
            event.preventDefault();
        }
    };
    ContextmenuComponent.prototype.position = function (event) {
        if (event) {
            var _a = [event.pageX - document.body.scrollLeft,
                event.pageY - document.body.scrollTop], left = _a[0], top_1 = _a[1];
            var width = this.container.offsetWidth;
            var height = this.container.offsetHeight;
            if (!width) {
                var w = this.domRenderer.getHiddenElementOuterHeight(this.container);
                width = w.width;
                height = w.height;
            }
            var _b = [window.innerWidth, window.innerHeight], wWidth = _b[0], wHeight = _b[1];
            if (width + left > wWidth) {
                left -= width;
            }
            if (height + top_1 > wHeight) {
                top_1 -= height;
            }
            this.container.style.left = left + 'px';
            this.container.style.top = top_1 + 'px';
        }
    };
    ContextmenuComponent.prototype.hide = function () {
        this.visible = false;
    };
    ContextmenuComponent.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
        if (this.childClickListener) {
            this.childClickListener();
            this.childClickListener = null;
        }
        this.container = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextmenuComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextmenuComponent.prototype, "menu", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextmenuComponent.prototype, "global", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ContextmenuComponent.prototype, "containerViewChild", void 0);
    ContextmenuComponent = __decorate([
        core_1.Component({
            selector: 'free-contextmenu',
            template: "\n    <div #container [style.display]=\"visible ? 'block' : 'none'\" class=\"free-contextmenu\">\n      <free-contextmenu-item [root]=\"true\" [item]=\"menu\"></free-contextmenu-item>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.Renderer2])
    ], ContextmenuComponent);
    return ContextmenuComponent;
}());
exports.ContextmenuComponent = ContextmenuComponent;
var ContextmenuModule = (function () {
    function ContextmenuModule() {
    }
    ContextmenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            declarations: [ContextmenuItemComponent, ContextmenuComponent],
            exports: [ContextmenuItemComponent, ContextmenuComponent]
        })
    ], ContextmenuModule);
    return ContextmenuModule;
}());
exports.ContextmenuModule = ContextmenuModule;
//# sourceMappingURL=contextmenu.component.js.map
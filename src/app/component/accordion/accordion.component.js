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
var share_1 = require("../common/share");
var AccordionGroupComponent = (function () {
    function AccordionGroupComponent() {
        this.groups = [];
    }
    AccordionGroupComponent.prototype.closeOther = function (activeItem) {
        if (!this.closeOthers) {
            return;
        }
        this.groups.forEach(function (item) {
            if (item !== activeItem) {
                item.isExpand = false;
            }
        });
    };
    AccordionGroupComponent.prototype.addGroup = function (item) {
        this.groups.push(item);
    };
    return AccordionGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AccordionGroupComponent.prototype, "closeOthers", void 0);
AccordionGroupComponent = __decorate([
    core_1.Component({
        selector: 'free-accordion-group',
        template: '<ng-content></ng-content>'
    }),
    __metadata("design:paramtypes", [])
], AccordionGroupComponent);
exports.AccordionGroupComponent = AccordionGroupComponent;
var AccordionComponent = (function () {
    function AccordionComponent(accordionGroup) {
        this.disabled = false;
        this.toggleable = true;
        this._isExpanded = false;
        this.isActive = 'inactive';
        this.itemClass = {};
        this.accordionGroup = accordionGroup;
    }
    Object.defineProperty(AccordionComponent.prototype, "iconName", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionComponent.prototype, "isExpand", {
        get: function () {
            return this._isExpanded;
        },
        set: function (value) {
            this._isExpanded = value;
            if (this._isExpanded) {
                this.accordionGroup.closeOther(this);
            }
            this.toggleClass();
        },
        enumerable: true,
        configurable: true
    });
    AccordionComponent.prototype.ngOnInit = function () {
        this.accordionGroup.addGroup(this);
        this.toggleClass();
    };
    AccordionComponent.prototype.toggleClass = function () {
        if (!this.isAnimating) {
            this.isActive = this.isExpand ? 'active' : 'inactive';
            this.itemClass = {
                'accordion-item-expand': this.isExpand
            };
        }
    };
    AccordionComponent.prototype.toggle = function () {
        if (!this.disabled) {
            this.isExpand = !this.isExpand;
        }
    };
    AccordionComponent.prototype.transitionStart = function () {
        this.isAnimating = true;
    };
    AccordionComponent.prototype.transitionDone = function () {
        this.isAnimating = false;
    };
    return AccordionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AccordionComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AccordionComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AccordionComponent.prototype, "toggleable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AccordionComponent.prototype, "iconName", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], AccordionComponent.prototype, "isExpand", null);
AccordionComponent = __decorate([
    core_1.Component({
        selector: 'free-accordion',
        template: "\n    <div class=\"accordion-item\">\n      <div (click)=\"toggle()\" class=\"accordion-toggle\" [ngClass]=\"itemClass\">\n        <span class=\"accordion-toggle-inner\">\n          <ng-container *ngIf=\"header\">\n            <i class=\"fa {{'fa-' + _icon}}\" *ngIf=\"!!_icon\"></i> \n            <span class=\"accordion-toggle-title\">{{ header }}</span>\n          </ng-container>\n          <ng-content select=\"f-header\"></ng-content>\n        </span>\n      </div>\n      <div class=\"accordion-content\" [@accordionState]=\"isActive\" (@accordionState.done)=\"transitionDone()\"\n          (@accordionState.start)=\"transitionStart()\">\n        <div class=\"accordion-inner\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
        styleUrls: ['./accordion.component.scss'],
        animations: [animations_1.trigger('accordionState', [
                animations_1.state('active', animations_1.style({
                    height: '*'
                })),
                animations_1.state('inactive', animations_1.style({
                    height: 0
                })),
                animations_1.transition('inactive <=> active', animations_1.animate('300ms ease'))
            ])]
    }),
    __metadata("design:paramtypes", [AccordionGroupComponent])
], AccordionComponent);
exports.AccordionComponent = AccordionComponent;
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
AccordionModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, share_1.ShareModule],
        declarations: [AccordionComponent, AccordionGroupComponent],
        exports: [AccordionComponent, AccordionGroupComponent]
    })
], AccordionModule);
exports.AccordionModule = AccordionModule;
//# sourceMappingURL=accordion.component.js.map
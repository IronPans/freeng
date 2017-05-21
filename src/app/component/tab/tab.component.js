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
/**
 * Created by tg on 17-4-4.
 */
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var TabNavComponent = (function () {
    function TabNavComponent() {
        this.onTabClick = new core_1.EventEmitter();
    }
    TabNavComponent.prototype.tabClick = function (index) {
        this.onTabClick.emit(index);
    };
    return TabNavComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabNavComponent.prototype, "tabs", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabNavComponent.prototype, "direction", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TabNavComponent.prototype, "onTabClick", void 0);
TabNavComponent = __decorate([
    core_1.Component({
        selector: 'free-tab-nav',
        template: "\n       <ul class=\"free-tab-navs\">\n         <li class=\"free-tab-nav\" *ngFor=\"let tab of tabs; let i = index;\"\n             [class.active]=\"tab.selected\">\n           <span (click)=\"tabClick(i)\">{{tab.header}}</span>\n         </li>\n       </ul>\n    "
    }),
    __metadata("design:paramtypes", [])
], TabNavComponent);
exports.TabNavComponent = TabNavComponent;
var TabComponent = (function () {
    function TabComponent() {
    }
    Object.defineProperty(TabComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.toggleClass();
        },
        enumerable: true,
        configurable: true
    });
    TabComponent.prototype.toggleClass = function () {
        this.tabClass = {
            'free-tab': true,
            'active': this._selected
        };
    };
    TabComponent.prototype.ngOnInit = function () {
        this.toggleClass();
    };
    TabComponent.prototype.setActive = function (value) {
        this.selected = value;
    };
    return TabComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TabComponent.prototype, "selected", null);
TabComponent = __decorate([
    core_1.Component({
        selector: 'free-tab',
        template: "\n    <div [ngClass]=\"tabClass\" [@tabState]=\"selected ? 'active' : 'inactive'\">\n      <ng-content></ng-content>\n    </div>",
        animations: [
            animations_1.trigger('tabState', [
                animations_1.state('active', animations_1.style({
                    transform: 'translateX(0)',
                    opacity: 1
                })),
                animations_1.state('inactive', animations_1.style({
                    transform: 'translateX(100%)',
                    opacity: 0
                })),
                animations_1.transition('active <=> inactive', animations_1.animate('300ms ease'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [])
], TabComponent);
exports.TabComponent = TabComponent;
var TabGroupComponent = (function () {
    function TabGroupComponent(renderer2) {
        this.renderer2 = renderer2;
        this.activeIndex = 0;
    }
    TabGroupComponent.prototype.ngOnInit = function () { };
    TabGroupComponent.prototype.ngAfterContentInit = function () {
        this.tabInit();
        if (this.theme) {
            this.renderer2.addClass(this.groups.nativeElement, 'theme-' + this.theme);
        }
        ;
        if (this.direction) {
            this.renderer2.addClass(this.groups.nativeElement, 'free-tab-' + this.direction);
        }
        ;
    };
    TabGroupComponent.prototype.tabInit = function () {
        this.tabs = this.tabGroup.toArray();
        this.open(this.activeIndex);
    };
    TabGroupComponent.prototype.open = function (index) {
        if (index === void 0) { index = 0; }
        if (this.activeIndex >= 0 && this.activeIndex < this.tabs.length) {
            var tabs = this.tabs;
            for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
                var tab = tabs_1[_i];
                tab.setActive(false);
            }
            this.activeIndex = index;
            this.tabs[this.activeIndex].setActive(true);
        }
    };
    TabGroupComponent.prototype.tabClick = function (index) {
        this.open(index);
    };
    return TabGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabGroupComponent.prototype, "theme", void 0);
__decorate([
    core_1.ViewChild('group'),
    __metadata("design:type", core_1.ElementRef)
], TabGroupComponent.prototype, "groups", void 0);
__decorate([
    core_1.ViewChild('nav'),
    __metadata("design:type", core_1.ElementRef)
], TabGroupComponent.prototype, "nav", void 0);
__decorate([
    core_1.ContentChildren(TabComponent),
    __metadata("design:type", core_1.QueryList)
], TabGroupComponent.prototype, "tabGroup", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabGroupComponent.prototype, "direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TabGroupComponent.prototype, "activeIndex", void 0);
TabGroupComponent = __decorate([
    core_1.Component({
        selector: 'free-tab-group',
        template: "\n    <div class=\"free-tab-group\" #group>\n      <free-tab-nav [tabs]=\"tabs\" (onTabClick)=\"tabClick($event)\"></free-tab-nav>\n      <div class=\"free-tab-box\">\n        <ng-content></ng-content>\n      </div>\n    </div> \n  ",
        styleUrls: ['./tab.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], TabGroupComponent);
exports.TabGroupComponent = TabGroupComponent;
var TabGroupModule = (function () {
    function TabGroupModule() {
    }
    return TabGroupModule;
}());
TabGroupModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [TabNavComponent, TabComponent, TabGroupComponent],
        exports: [TabNavComponent, TabComponent, TabGroupComponent]
    })
], TabGroupModule);
exports.TabGroupModule = TabGroupModule;
//# sourceMappingURL=tab.component.js.map
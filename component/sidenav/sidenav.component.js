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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/animations");
var SidenavComponent = (function () {
    function SidenavComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.direction = 'left';
    }
    Object.defineProperty(SidenavComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this.toggle(value);
        },
        enumerable: true,
        configurable: true
    });
    SidenavComponent.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        this.renderer2.addClass(this.container, "free-sidebar-" + this.direction);
    };
    SidenavComponent.prototype.toggle = function (visible) {
        if (this.container) {
            this._visible = visible;
            if (visible) {
                this.renderer2.addClass(this.container, 'free-sidenav-active');
            }
            else {
                this.renderer2.removeClass(this.container, 'free-sidenav-active');
            }
        }
        this.onChange.emit({
            open: visible
        });
    };
    SidenavComponent.prototype.transitionStart = function () {
        this.renderer2.setStyle(this.container, 'display', 'block');
    };
    SidenavComponent.prototype.transitionEnd = function () {
        if (!this.visible) {
            this.renderer2.setStyle(this.container, 'display', 'none');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidenavComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SidenavComponent.prototype, "overlay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SidenavComponent.prototype, "style", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SidenavComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], SidenavComponent.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SidenavComponent.prototype, "visible", null);
    SidenavComponent = __decorate([
        core_1.Component({
            selector: 'free-sidenav',
            template: "\n    <div class=\"free-sidebar\" #container [ngStyle]=\"style\">\n      <div class=\"free-sidebar-overlay\" *ngIf=\"overlay\" (click)=\"toggle(false)\"></div>\n      <div class=\"free-sidebar-wrapper\" *ngIf=\"_visible\" [@slideState]=\"direction + 'In'\"\n           (@slideState.start)=\"transitionStart()\" (@slideState.done)=\"transitionEnd()\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('slideState', [
                    animations_1.state('leftIn rightIn', animations_1.style({
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.transition('void => leftIn', [
                        animations_1.style({ transform: 'translate3d(-100%, 0, 0)' }),
                        animations_1.animate('300ms linear', animations_1.style({
                            transform: 'translate3d(0, 0, 0)'
                        }))
                    ]),
                    animations_1.transition('void => rightIn', [
                        animations_1.style({ transform: 'translate3d(100%, 0, 0)' }),
                        animations_1.animate('300ms linear', animations_1.style({
                            transform: 'translate3d(0, 0, 0)'
                        }))
                    ]),
                    animations_1.transition('leftIn => void', [
                        animations_1.animate('300ms linear', animations_1.style({
                            transform: 'translate3d(-100%, 0, 0)'
                        }))
                    ]),
                    animations_1.transition('rightIn => void', [
                        animations_1.animate('300ms linear', animations_1.style({
                            transform: 'translate3d(100%, 0, 0)'
                        }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], SidenavComponent);
    return SidenavComponent;
}());
exports.SidenavComponent = SidenavComponent;
var SidenavModule = (function () {
    function SidenavModule() {
    }
    SidenavModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [SidenavComponent],
            exports: [SidenavComponent]
        })
    ], SidenavModule);
    return SidenavModule;
}());
exports.SidenavModule = SidenavModule;
//# sourceMappingURL=sidenav.component.js.map
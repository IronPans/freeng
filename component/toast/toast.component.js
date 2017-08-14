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
var dom_1 = require("../common/dom");
var ToastComponent = (function () {
    function ToastComponent(domRenderer, differs) {
        this.domRenderer = domRenderer;
        this.differs = differs;
        this.onClose = new core_1.EventEmitter();
        this.maxMessage = 10;
        this.delay = 1500;
        this.theme = 'default';
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(ToastComponent.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        set: function (value) {
            if (value) {
                this._messages = value;
                var length_1 = this._messages.length;
                if (length_1 > 10) {
                    this._messages = this._messages.slice(length_1 - 10);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ToastComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.messages);
        if (changes) {
            this.zIndex = ++dom_1.DomRenderer.zIndex;
        }
    };
    ToastComponent.prototype.remove = function (item, index) {
        this._messages.splice(index, 1);
        this.onClose.emit({
            message: item,
            index: index
        });
    };
    ToastComponent.prototype.onMoveInDone = function (item, index) {
        var _this = this;
        if (this.delay) {
            setTimeout(function (msg) {
                _this._messages.forEach(function (m, i) {
                    if (msg === m) {
                        _this.remove(m, i);
                    }
                });
            }, item.delay || this.delay, item);
        }
    };
    ToastComponent.prototype.setIcon = function (value) {
        switch (value) {
            case 'danger':
                this.icon = 'times-circle';
                break;
            case 'info':
                this.icon = 'info-circle';
                break;
            case 'warning':
                this.icon = 'exclamation-circle';
                break;
            case 'success':
                this.icon = 'check-circle';
                break;
        }
        return this.icon;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], ToastComponent.prototype, "messages", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ToastComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ToastComponent.prototype, "maxMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ToastComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ToastComponent.prototype, "onClose", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: 'free-toast',
            template: "\n    <div class=\"free-toast\" [style.zIndex]=\"zIndex\">\n      <div class=\"free-toast-item free-{{message.theme || theme}}\"\n           *ngFor=\"let message of messages;index as i\"\n           [@moveInState]=\"'in'\" (@moveInState.done)=\"onMoveInDone(message, i)\">\n        <div class=\"free-notification-avatar\" *ngIf=\"theme || message.icon\">\n          <i class=\"fa fa-{{setIcon(theme || message.icon)}}\"></i>\n        </div>\n        <div class=\"free-toast-item-content\">\n          <div class=\"free-toast-message\">{{message.content}}</div>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('moveInState', [
                    animations_1.state('in', animations_1.style({
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.transition(':enter', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'translate3d(0, -100%, 0)'
                        }),
                        animations_1.animate('.25s cubic-bezier(.25,.8,.25,1)')
                    ]),
                    animations_1.transition(':leave', animations_1.animate('.1s', animations_1.style({
                        opacity: 0,
                        transform: 'translate3d(0, -100%, 0)'
                    })))
                ])
            ],
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.IterableDiffers])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
var ToastModule = (function () {
    function ToastModule() {
    }
    ToastModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ToastComponent],
            exports: [ToastComponent]
        })
    ], ToastModule);
    return ToastModule;
}());
exports.ToastModule = ToastModule;
//# sourceMappingURL=toast.component.js.map
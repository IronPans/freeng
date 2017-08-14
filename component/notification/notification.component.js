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
var dom_1 = require("../common/dom");
var NotificationComponent = (function () {
    function NotificationComponent(domRenderer, differs) {
        this.domRenderer = domRenderer;
        this.differs = differs;
        this.onClose = new core_1.EventEmitter();
        this.direction = 'topRight';
        this.maxMessage = 10;
        this.progress = true;
        this.theme = 'default';
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(NotificationComponent.prototype, "messages", {
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
    Object.defineProperty(NotificationComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            if (value) {
                this._direction = value;
                this.moveState = value + 'In';
            }
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.ngOnInit = function () {
        this.moveState = this.direction + 'In';
    };
    NotificationComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.messages);
        if (changes) {
            this.handleValueChange();
        }
    };
    NotificationComponent.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
    };
    NotificationComponent.prototype.handleValueChange = function () {
        this.zIndex = ++dom_1.DomRenderer.zIndex;
    };
    NotificationComponent.prototype.remove = function (item, index) {
        this._messages.splice(index, 1);
        this.onClose.emit({
            message: item,
            index: index
        });
    };
    NotificationComponent.prototype.onMoveInDone = function (item, index) {
        if (this.delay) {
            if (this.progress) {
                var bar = item.querySelector('.free-notification-progress-bar');
                this.domRenderer.css(bar, {
                    transitionDuration: this.delay + 'ms'
                });
                this.domRenderer.addClass(bar, 'free-notification-progress-hide');
            }
        }
    };
    NotificationComponent.prototype.onTransitionEnd = function (item, index) {
        var _this = this;
        this.messages.forEach(function (msg, i) {
            if (msg === item) {
                _this._messages.splice(i, 1);
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], NotificationComponent.prototype, "messages", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [String])
    ], NotificationComponent.prototype, "direction", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "maxMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "progress", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NotificationComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], NotificationComponent.prototype, "containerViewChild", void 0);
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'free-notification',
            template: "\n    <div #container class=\"free-notification free-notification-{{direction}}\" [style.zIndex]=\"zIndex\">\n      <div class=\"free-notification-item free-notification-{{message.theme || theme}}\"\n           #item *ngFor=\"let message of messages;index as i\"\n           [@moveInState]=\"moveState\" (@moveInState.done)=\"onMoveInDone(item, i)\">\n        <div class=\"free-notification-avatar\" *ngIf=\"message.icon\">\n          <i class=\"fa fa-{{message.icon}}\"></i>\n        </div>\n        <div class=\"free-notification-avatar\" *ngIf=\"message.avatar\">\n          <img [src]=\"message.avatar\">\n        </div>\n        <div class=\"free-notification-item-content\">\n          <div class=\"free-notification-title\">{{message.title}}</div>\n          <div class=\"free-notification-message\">{{message.content}}</div>\n        </div>\n        <a class=\"free-notification-close\" (click)=\"remove(message, i)\">\n          <i class=\"fa fa-close\"></i>\n        </a>\n        <div class=\"free-notification-progress\" *ngIf=\"delay && progress\">\n          <div class=\"free-notification-progress-bar\" (transitionend)=\"onTransitionEnd(message, index)\"></div>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('moveInState', [
                    animations_1.state('topRightIn, topLeftIn, bottomRightIn, bottomLeftIn', animations_1.style({
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.transition('void => topRightIn, void => bottomRightIn', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'translate3d(100%, 0, 0)'
                        }),
                        animations_1.animate('.25s cubic-bezier(.25,.8,.25,1)')
                    ]),
                    animations_1.transition('void => topLeftIn, void => bottomLeftIn', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'translate3d(-100%, 0, 0)'
                        }),
                        animations_1.animate('.25s cubic-bezier(.25,.8,.25,1)')
                    ]),
                    animations_1.transition(':leave', animations_1.animate('.1s', animations_1.style({
                        opacity: 0
                    })))
                ])
            ],
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer,
            core_1.IterableDiffers])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
var NotificationModule = (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [NotificationComponent],
            exports: [NotificationComponent]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.component.js.map
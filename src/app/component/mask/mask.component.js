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
var animations_1 = require("../common/animations");
var MaskComponent = (function () {
    function MaskComponent() {
        this.visibleChange = new core_1.EventEmitter();
    }
    Object.defineProperty(MaskComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.visibleChange.emit(this._visible);
        },
        enumerable: true,
        configurable: true
    });
    MaskComponent.prototype.ngOnInit = function () { };
    MaskComponent.prototype.transitionEnd = function () {
        var _this = this;
        if (!!this.delay && !this.timeoutId) {
            this.timeoutId = setTimeout(function () {
                _this.visible = false;
            }, this.delay);
        }
        else if (this.timeoutId) {
            this.timeoutId = null;
        }
    };
    return MaskComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MaskComponent.prototype, "visibleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MaskComponent.prototype, "close", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MaskComponent.prototype, "delay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MaskComponent.prototype, "visible", null);
MaskComponent = __decorate([
    core_1.Component({
        selector: 'free-mask',
        template: "\n    <div class=\"free-mask\" *ngIf=\"visible\" [@fadeInState] \n       (@fadeInState.done)=\"transitionEnd()\">\n      <ng-content></ng-content>\n      <span *ngIf=\"close\" class=\"fa fa-close\"></span>\n    </div>",
        styleUrls: ['./mask.component.scss'],
        animations: [animations_1.fadeIn]
    }),
    __metadata("design:paramtypes", [])
], MaskComponent);
exports.MaskComponent = MaskComponent;
var MaskModule = (function () {
    function MaskModule() {
    }
    return MaskModule;
}());
MaskModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [MaskComponent],
        exports: [MaskComponent]
    })
], MaskModule);
exports.MaskModule = MaskModule;
//# sourceMappingURL=mask.component.js.map
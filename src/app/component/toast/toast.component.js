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
var ToastComponent = (function () {
    function ToastComponent(er) {
        this.er = er;
        this.value = [];
    }
    ToastComponent.prototype.ngOnInit = function () { };
    ToastComponent.prototype.ngAfterViewInit = function () {
        this.container = this.er.nativeElement;
    };
    ToastComponent.prototype.close = function (index) {
        this.value.splice(index, 1);
    };
    ToastComponent.prototype.removeAll = function () {
        this.value = [];
    };
    return ToastComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ToastComponent.prototype, "delay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ToastComponent.prototype, "value", void 0);
ToastComponent = __decorate([
    core_1.Component({
        selector: 'free-toast',
        template: "\n    <div class=\"free-toast-group\" #container *ngIf=\"value.length > 0\">\n      <div class=\"free-toast\" *ngFor=\"let msg of value; let i = index\" [@toastState]>\n          <div>{{msg}}</div>\n          <span class=\"fa fa-close free-toast-close\" (click)=\"close(i)\"></span>\n      </div>\n    </div>\n  ",
        styleUrls: ['./toast.component.scss'],
        animations: [
            animations_1.trigger('toastState', [
                animations_1.state('in', animations_1.style({
                    transform: 'translateX(0)',
                    opacity: 1
                })),
                animations_1.transition('void => *', [animations_1.style({
                        transform: 'translateX(100%)',
                        opacity: 0
                    }), animations_1.animate('.3s ease-in-out')]),
                animations_1.transition('* => void', animations_1.animate('.3s ease-in-out', animations_1.style({ transform: 'translateX(100%)', opacity: 0 }))) // :leave
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ToastComponent);
exports.ToastComponent = ToastComponent;
var ToastModule = (function () {
    function ToastModule() {
    }
    return ToastModule;
}());
ToastModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ToastComponent],
        exports: [ToastComponent]
    })
], ToastModule);
exports.ToastModule = ToastModule;
//# sourceMappingURL=toast.component.js.map
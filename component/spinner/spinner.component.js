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
var forms_1 = require("@angular/forms");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SpinnerComponent; }),
    multi: true
};
var SpinnerComponent = (function () {
    function SpinnerComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchedChange = function () { };
        this.value = 0;
        this.step = 1;
    }
    SpinnerComponent.prototype.ngAfterViewInit = function () {
        if ((this.min && this.value <= this.min) || (this.max && this.max <= this.value)) {
            this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
        }
    };
    SpinnerComponent.prototype.writeValue = function (value) {
        if (value) {
            this.value = value;
        }
    };
    SpinnerComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SpinnerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    SpinnerComponent.prototype.onAdd = function () {
        if (this.max && this.max <= this.value) {
            this.value = this.max;
            this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
        }
        else {
            this.value += this.step;
            this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
        }
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    };
    SpinnerComponent.prototype.onMinus = function () {
        if (this.min && this.value <= this.min) {
            this.value = this.min;
            this.renderer2.setAttribute(this.minus.nativeElement, 'disabled', 'true');
        }
        else {
            this.renderer2.removeAttribute(this.minus.nativeElement, 'disabled');
            this.value -= this.step;
        }
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SpinnerComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SpinnerComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SpinnerComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SpinnerComponent.prototype, "max", void 0);
    __decorate([
        core_1.ViewChild('minus'),
        __metadata("design:type", core_1.ElementRef)
    ], SpinnerComponent.prototype, "minus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SpinnerComponent.prototype, "onChange", void 0);
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'free-spinner',
            template: "\n    <div class=\"free-spinner\">\n      <button class=\"free-spinner-minus\" #minus (click)=\"onMinus()\"></button>\n      <input type=\"text\" [(ngModel)]=\"value\">\n      <button class=\"free-spinner-add\" #add (click)=\"onAdd()\"></button>\n    </div>\n  ",
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
var SpinnerModule = (function () {
    function SpinnerModule() {
    }
    SpinnerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [SpinnerComponent],
            exports: [SpinnerComponent]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());
exports.SpinnerModule = SpinnerModule;
//# sourceMappingURL=spinner.component.js.map
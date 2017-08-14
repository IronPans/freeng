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
    useExisting: core_1.forwardRef(function () { return RadioComponent; }),
    multi: true
};
var RadioComponent = (function () {
    function RadioComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchChange = function () { };
    }
    RadioComponent.prototype.ngAfterViewInit = function () {
        if (this.theme) {
            this.renderer2.addClass(this.container.nativeElement, "free-" + this.theme);
        }
    };
    RadioComponent.prototype.writeValue = function (value) {
        if (value) {
            this.checked = value;
        }
    };
    RadioComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchChange = fn;
    };
    RadioComponent.prototype.onChange = function (e) {
        if (!this.disabled) {
            e = e.target;
            this.checked = e.checked;
            this.onModelChange(this.checked);
            this.onClick.emit({
                name: e.name,
                value: e.value,
                checked: e.checked
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RadioComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RadioComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RadioComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RadioComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RadioComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadioComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], RadioComponent.prototype, "container", void 0);
    RadioComponent = __decorate([
        core_1.Component({
            selector: 'free-radio',
            template: "\n    <label class=\"free-radio\" #container>\n      <div class=\"free-radio-inner\">\n        <input type=\"radio\" value=\"{{label}}\" [disabled]=\"disabled\"\n            [checked]=\"checked\" name=\"{{name}}\" (change)=\"onChange($event)\">\n        <div class=\"free-radio-ins\"></div>\n      </div>\n      <div class=\"free-radio-label\">{{label}}</div>\n    </label>\n  ",
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], RadioComponent);
    return RadioComponent;
}());
exports.RadioComponent = RadioComponent;
var RadioModule = (function () {
    function RadioModule() {
    }
    RadioModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [RadioComponent],
            exports: [RadioComponent]
        })
    ], RadioModule);
    return RadioModule;
}());
exports.RadioModule = RadioModule;
//# sourceMappingURL=radio.component.js.map
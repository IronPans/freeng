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
    useExisting: core_1.forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var CheckboxComponent = (function () {
    function CheckboxComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchedChange = function () { };
        this.checkedValue = [];
        this.theme = 'default';
    }
    CheckboxComponent.prototype.ngAfterViewInit = function () {
        this.renderer2.addClass(this.container.nativeElement, "free-" + this.theme);
    };
    CheckboxComponent.prototype.writeValue = function (value) {
        if (value) {
            this.checkedValue = value;
            this.checked = this.isChecked();
        }
    };
    CheckboxComponent.prototype.addValue = function () {
        if (this.checkedValue) {
            this.checkedValue = this.checkedValue.concat([this.value]);
        }
        else {
            this.checkedValue = [this.value];
        }
    };
    CheckboxComponent.prototype.isChecked = function () {
        return this.checkedValue.indexOf(this.value) !== -1;
    };
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    CheckboxComponent.prototype.onCheckboxChange = function (e) {
        if (!this.disabled) {
            e = e.target;
            this.checked = e.checked;
            if (this.checked) {
                this.addValue();
            }
            else {
                this.checkedValue.splice(this.checkedValue.indexOf(this.value), 1);
            }
            this.onChange.emit(this.checkedValue);
            this.onModelChange(this.checkedValue);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CheckboxComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CheckboxComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CheckboxComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], CheckboxComponent.prototype, "container", void 0);
    CheckboxComponent = __decorate([
        core_1.Component({
            selector: 'free-checkbox',
            template: "\n    <label class=\"free-checkbox\" #container>\n      <div class=\"free-checkbox-inner\">\n        <input type=\"checkbox\" value=\"{{value}}\"  [disabled]=\"disabled\"\n            [checked]=\"checked\" name=\"{{name}}\" (change)=\"onCheckboxChange($event, label)\">\n        <div class=\"free-checkbox-ins\"></div>\n      </div>\n      <div class=\"free-checkbox-title\">{{label}}</div>\n    </label>\n    ",
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], CheckboxComponent);
    return CheckboxComponent;
}());
exports.CheckboxComponent = CheckboxComponent;
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    CheckboxModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [CheckboxComponent],
            exports: [CheckboxComponent]
        })
    ], CheckboxModule);
    return CheckboxModule;
}());
exports.CheckboxModule = CheckboxModule;
//# sourceMappingURL=checkbox.component.js.map
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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var checkbox_component_1 = require("../checkbox/checkbox.component");
var util_1 = require("../common/util");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent(renderer2, objUtil) {
        this.renderer2 = renderer2;
        this.objUtil = objUtil;
        this.onChange = new core_1.EventEmitter();
        this.items = [];
        this.onModelChange = function () {
        };
        this.onTouchedChange = function () {
        };
        this.onDocumentClickListener();
    }
    Object.defineProperty(SelectComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
        if (this.multiple) {
            this.selected = [];
        }
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        if (this.pholder) {
            this.value = this.pholder;
        }
    };
    SelectComponent.prototype.writeValue = function (value) {
        if (value) {
            this.selected = value;
            this.getValue();
        }
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    SelectComponent.prototype.onMultipleTotal = function (event) {
        this.multipleTotal = event.checked;
        if (this.multipleTotal) {
            this.selected = Array.from(this.options);
        }
        else {
            this.selected = [];
        }
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            option['checked'] = event.checked;
        }
        this.getSelectedValue();
    };
    SelectComponent.prototype.onCheckboxSelect = function (event, option) {
        this.multipleTotal = false;
        if (event.checked) {
            option.checked = true;
            this.selected.push(option);
        }
        else {
            var selected = this.selected;
            var i = selected.length;
            while (i) {
                if (selected[i - 1].value === event.value) {
                    this.selected.splice(i - 1, 1);
                    this.options[i - 1].checked = false;
                }
                i--;
            }
        }
        this.getSelectedValue();
    };
    SelectComponent.prototype.compareWith = function (value) {
        var isEqual = false;
        if (value && this.selected) {
            if (Array.isArray(this.selected)) {
                for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
                    var o = _a[_i];
                    isEqual = this.objUtil.equals(value, o['value']);
                    break;
                }
            }
            else {
                isEqual = this.objUtil.equals(value, this.selected.value);
            }
        }
        return isEqual;
    };
    SelectComponent.prototype.onItemClick = function ($event) {
        this.itemClick = $event;
        this.selected = $event;
        this.value = $event.label;
        this.getSelectedValue();
        this.close();
    };
    SelectComponent.prototype.getValue = function () {
        this.value = '';
        var selectedValue = [];
        if (Array.isArray(this.selected)) {
            for (var _i = 0, _a = this.selected; _i < _a.length; _i++) {
                var s = _a[_i];
                selectedValue.push(s.label);
            }
            this.value = selectedValue.join(',');
        }
        else if (this.selected) {
            this.value = this.selected.label;
        }
    };
    SelectComponent.prototype.getSelectedValue = function () {
        this.getValue();
        this.onModelChange(this.selected);
        this.onChange.emit(this.selected);
    };
    SelectComponent.prototype.onFilterChange = function (event) {
    };
    SelectComponent.prototype.addGroup = function (value) {
        this.items.push(value);
    };
    SelectComponent.prototype.onMenuClick = function () {
        this.itemClick = true;
    };
    SelectComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.bindDocumentClickListener) {
            this.bindDocumentClickListener = this.renderer2.listen('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                _this.itemClick = false;
                _this.selfClick = false;
            });
        }
    };
    SelectComponent.prototype.offDocumentClickListener = function () {
        if (this.bindDocumentClickListener) {
            this.bindDocumentClickListener();
            this.bindDocumentClickListener = null;
        }
    };
    SelectComponent.prototype.onClick = function () {
        if (!this.editable) {
            if (!this.opened) {
                this.open();
            }
            else {
                this.close();
            }
        }
    };
    SelectComponent.prototype.filterValue = function (options, value) {
        var _this = this;
        if (this.filter && options && Array.isArray(options)) {
            return options.filter(function (v, k, arr) {
                var regexp = new RegExp(_this._filterValue, 'ig');
                if (regexp.test(v[value])) {
                    return true;
                }
            });
        }
        return options;
    };
    SelectComponent.prototype.open = function () {
        this.selfClick = true;
        this.opened = true;
    };
    SelectComponent.prototype.close = function () {
        this.opened = false;
        this.selfClick = false;
    };
    SelectComponent.prototype.ngOnDestroy = function () {
        this.offDocumentClickListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "pholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "multipleTotal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], SelectComponent.prototype, "input", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SelectComponent.prototype, "options", null);
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'free-select',
            template: "\n    <div class=\"free-select\">\n      <div class=\"free-select-input\" (click)=\"onClick()\">\n        <label *ngIf=\"value\">{{value}}</label>\n        <label *ngIf=\"!value\">{{pholder}}</label>\n      </div>\n      <div class=\"free-select-menu\" *ngIf=\"opened\" [@selectState]=\"'in'\" (click)=\"onMenuClick()\">\n        <div class=\"free-select-filter\" *ngIf=\"filter\">\n          <free-checkbox *ngIf=\"multiple\" [checked]=\"multipleTotal\" (onChange)=\"onMultipleTotal($event)\">\n          </free-checkbox>\n          <div class=\"free-select-inner\">\n            <i class=\"fa fa-search\"></i>\n            <input type=\"text\" [(ngModel)]=\"_filterValue\" (input)=\"onFilterChange($event)\">\n          </div>\n        </div>\n        <div class=\"free-select-wrapper free-iscroll\">\n          <ul *ngIf=\"!multiple\">\n            <free-select-item\n              *ngFor=\"let option of filterValue(options, 'label'); index as i\"\n              (onClick)=\"onItemClick($event)\" [option]=\"option\"></free-select-item>\n          </ul>\n          <ul *ngIf=\"multiple\">\n            <li *ngFor=\"let option of filterValue(options, 'label')\">\n              <free-checkbox (onChange)=\"onCheckboxSelect($event, option)\" [checked]=\"option.checked\"\n                             [label]=\"option.label\" [value]=\"option.value\"></free-checkbox>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('selectState', [
                    animations_1.state('in', animations_1.style({
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.transition(':enter', [
                        animations_1.style({
                            opacity: 0,
                            transform: 'translate3d(0, 80px, 0)'
                        }), animations_1.animate('.4s cubic-bezier(.25,.8,.25,1)')
                    ]),
                    animations_1.transition(':leave', animations_1.animate('.1s', animations_1.style({
                        opacity: 0
                    })))
                ])
            ],
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, util_1.ObjectUtils]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, util_1.ObjectUtils])
    ], SelectComponent);
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
var SelectItemComponent = (function () {
    function SelectItemComponent(selector) {
        this.onClick = new core_1.EventEmitter();
        this.selector = selector;
    }
    SelectItemComponent.prototype.ngOnInit = function () {
        this.selector.addGroup(this);
    };
    SelectItemComponent.prototype.itemClick = function () {
        this.onClick.emit(this.option);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectItemComponent.prototype, "option", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectItemComponent.prototype, "onClick", void 0);
    SelectItemComponent = __decorate([
        core_1.Component({
            selector: 'free-select-item',
            template: "\n    <li class=\"free-select-item\" [class.free-select-active]=\"selector.compareWith(option.value)\"\n        (click)=\"itemClick()\">\n      <div class=\"free-select-item-content\">\n        <span>{{option.label}}</span>\n      </div>\n    </li>\n  "
        }),
        __metadata("design:paramtypes", [SelectComponent])
    ], SelectItemComponent);
    return SelectItemComponent;
}());
exports.SelectItemComponent = SelectItemComponent;
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, checkbox_component_1.CheckboxModule],
            declarations: [SelectComponent, SelectItemComponent],
            exports: [SelectComponent, SelectItemComponent]
        })
    ], SelectModule);
    return SelectModule;
}());
exports.SelectModule = SelectModule;
//# sourceMappingURL=select.component.js.map
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
var dom_1 = require("../common/dom");
var forms_1 = require("@angular/forms");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputtextComponent; }),
    multi: true
};
var InputtextComponent = (function () {
    function InputtextComponent(renderer2, domRenderer) {
        this.renderer2 = renderer2;
        this.domRenderer = domRenderer;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.message = '验证错误!';
    }
    InputtextComponent.prototype.ngOnInit = function () {
        this.inputClass = {
            'input-field-icon': !!this.icon
        };
    };
    Object.defineProperty(InputtextComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onModelChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    InputtextComponent.prototype.onBlur = function (value) {
        this.onModelTouched();
    };
    InputtextComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    InputtextComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputtextComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputtextComponent.prototype.onInput = function (target) {
        var regexp;
        var value = target.value;
        var rect = this.domRenderer.getRect(target);
        switch (this.pattern) {
            case 'tel':
                regexp = /^1[3,5,8]\d{9}/;
                break;
            case 'email':
                regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                break;
            case 'card':
                regexp = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
                break;
            case 'chinese':
                regexp = /^[\u4e00-\u9fa5]+$/;
                break;
            case 'url':
                regexp = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
                break;
            case 'number':
                regexp = /^\d+$/;
                break;
            case 'date':
                regexp = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
                break;
            default:
                regexp = new RegExp(this.pattern, 'i');
        }
        if (regexp.test(value) && this.tip) {
            this.remove();
        }
        else if (!regexp.test(value) && !this.tip) {
            this.tip = this.renderer2.createElement('div');
            this.tip.className = 'free-tip';
            this.tip.innerHTML = this.message;
            this.domRenderer.appendChild(document.body, this.tip);
            var top_1 = rect.top + (rect.height - this.tip.offsetHeight) / 2;
            var left = rect.left + rect.width + 10;
            var winWidth = window.innerWidth;
            var tipWidth = this.tip.offsetWidth;
            var tipHeight = this.tip.offsetHeight;
            var className = 'free-tip-right';
            if ((left + tipWidth) > winWidth) {
                left = rect.left + (rect.width - tipWidth) / 2;
                top_1 = rect.top - tipHeight - 10;
                className = 'free-tip-top';
            }
            this.domRenderer.addClass(this.tip, className);
            this.domRenderer.css(this.tip, {
                'top': top_1 + 'px',
                'left': left + 'px',
                'opacity': 1,
                'transform': 'translate3d(0,0,0)'
            });
        }
    };
    InputtextComponent.prototype.remove = function () {
        if (this.tip) {
            this.domRenderer.removeChild(document.body, this.tip);
            this.tip = null;
        }
    };
    InputtextComponent.prototype.ngOnDestroy = function () {
        this.remove();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputtextComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputtextComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputtextComponent.prototype, "pattern", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputtextComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputtextComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputtextComponent.prototype, "onChange", void 0);
    InputtextComponent = __decorate([
        core_1.Component({
            selector: 'free-inputtext',
            template: "\n    <div class=\"input-field {{'free-' + theme}}\" [ngClass]=\"inputClass\">\n      <input type=\"text\" #text [(ngModel)]=\"value\"\n             (blur)=\"onBlur(text.value)\" placeholder=\"{{placeholder}}\" (input)=\"onInput(text)\">\n      <span></span>\n      <i *ngIf=\"icon\" class=\"fa {{'fa-' + icon}}\"></i>\n    </div>\n\n  ",
            providers: [dom_1.DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, dom_1.DomRenderer])
    ], InputtextComponent);
    return InputtextComponent;
}());
exports.InputtextComponent = InputtextComponent;
var InputtextModule = (function () {
    function InputtextModule() {
    }
    InputtextModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [InputtextComponent],
            exports: [InputtextComponent]
        })
    ], InputtextModule);
    return InputtextModule;
}());
exports.InputtextModule = InputtextModule;
//# sourceMappingURL=inputtext.component.js.map
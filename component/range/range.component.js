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
var dom_1 = require("../common/dom");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return RangeComponent; }),
    multi: true
};
var RangeComponent = (function () {
    function RangeComponent(renderer2, domRenderer) {
        this.renderer2 = renderer2;
        this.domRenderer = domRenderer;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchedChange = function () { };
        this.maxPercent = 100;
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.width = 150;
    }
    RangeComponent.prototype.ngOnInit = function () {
        this.touch = this.domRenderer.getTouchEvent();
    };
    RangeComponent.prototype.ngAfterViewInit = function () {
        this.tooltip = this._tooltip.nativeElement;
        this.range = this._range.nativeElement;
        this.thumb = this._thumb.nativeElement;
        this.track = this._track.nativeElement;
        if (this.theme) {
            this.renderer2.addClass(this.range, "free-" + this.theme);
        }
        this.pageInit();
    };
    RangeComponent.prototype.writeValue = function (value) {
        if (value) {
            this.value = value;
        }
    };
    RangeComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RangeComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    RangeComponent.prototype.pageInit = function () {
        var t = this.max - this.min;
        var p = (this.value - this.min) / t;
        var current = Math.floor(p * this.range.offsetWidth);
        if (!isNaN(current)) {
            this.setValue(current);
        }
    };
    RangeComponent.prototype.getPoint = function (element, event) {
        event = event || window.event;
        var touchEvent = this.touch.mobile ? event.changedTouches[0] : event;
        var rect = this.domRenderer.getRect(element);
        var x = (touchEvent.pageX ||
            touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= rect.left;
        var y = (touchEvent.pageY ||
            touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= rect.top;
        return {
            x: x,
            y: y
        };
    };
    RangeComponent.prototype.setValue = function (value) {
        var percent = value / this.range.offsetWidth * this.maxPercent;
        if (percent >= this.maxPercent) {
            percent = this.maxPercent;
        }
        else if (percent <= 0) {
            percent = 0;
        }
        percent = parseFloat(percent.toFixed(4));
        var t = this.max - this.min;
        var cp = Math.ceil(t * percent / 100) + this.min;
        this.thumb['style'].left = percent + '%';
        this.track['style'].right = (this.maxPercent - percent) + '%';
        this.value = cp;
        this.percent = percent;
        var currentPercent = percent / this.maxPercent;
        var left = Math.floor(this.range.offsetWidth * currentPercent - this.tooltip.offsetWidth / 2);
        this.tooltip.textContent = this.value;
        this.domRenderer.setTransform(this.tooltip, 'translate3d(' + left + 'px,-100%,0)');
    };
    RangeComponent.prototype.getValue = function (e) {
        var v = this.getPoint(this.range, e);
        this.setValue(v.x);
        this.onChange.emit({ 'value': this.value });
        this.onModelChange(this.value);
    };
    RangeComponent.prototype.onTouchstart = function (e) {
        var _this = this;
        if (e.button) {
            return;
        }
        clearTimeout(this.timeoutID);
        this.getValue(e);
        this.show(this.tooltip);
        this.isPressed = true;
        this.documentTouchmoveListener = this.renderer2.listen('body', this.touch.touchmove, function ($event) {
            _this.onTouchmove($event);
        });
        this.documentTouchendListener = this.renderer2.listen('body', this.touch.touchend, function () {
            _this.onTouchend();
        });
    };
    RangeComponent.prototype.onTouchmove = function (event) {
        if (this.isPressed) {
            this.show(this.tooltip);
            this.getValue(event);
        }
    };
    RangeComponent.prototype.onTouchend = function () {
        this.isPressed = false;
        this.hide(this.tooltip);
        this.unbindDocumentClickListener();
    };
    RangeComponent.prototype.hide = function (elem) {
        this.timeoutID = setTimeout(function () {
            elem.style.display = 'none';
        }, 200);
    };
    RangeComponent.prototype.show = function (elem) {
        elem.style.display = 'block';
    };
    RangeComponent.prototype.unbindDocumentClickListener = function () {
        if (this.documentTouchmoveListener) {
            this.documentTouchmoveListener();
            this.documentTouchmoveListener = null;
        }
        if (this.documentTouchendListener) {
            this.documentTouchendListener();
            this.documentTouchendListener = null;
        }
    };
    RangeComponent.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RangeComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RangeComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RangeComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RangeComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RangeComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RangeComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('range'),
        __metadata("design:type", core_1.ElementRef)
    ], RangeComponent.prototype, "_range", void 0);
    __decorate([
        core_1.ViewChild('tooltip'),
        __metadata("design:type", core_1.ElementRef)
    ], RangeComponent.prototype, "_tooltip", void 0);
    __decorate([
        core_1.ViewChild('thumb'),
        __metadata("design:type", core_1.ElementRef)
    ], RangeComponent.prototype, "_thumb", void 0);
    __decorate([
        core_1.ViewChild('track'),
        __metadata("design:type", core_1.ElementRef)
    ], RangeComponent.prototype, "_track", void 0);
    RangeComponent = __decorate([
        core_1.Component({
            selector: 'free-range',
            template: "\n    <div #range class=\"free-range\" (mousedown)=\"onTouchstart($event)\">\n      <div class=\"range-bar\"></div>\n      <div class=\"range-bar range-bar-active\" #track></div>\n      <div class=\"range-knob-handle\" #thumb>\n        <div class=\"range-knob\"></div>\n      </div>\n      <span class=\"range-slider-tooltip\" #tooltip></span>\n    </div>\n  ",
            providers: [dom_1.DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            dom_1.DomRenderer])
    ], RangeComponent);
    return RangeComponent;
}());
exports.RangeComponent = RangeComponent;
var RangeModule = (function () {
    function RangeModule() {
    }
    RangeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [RangeComponent],
            exports: [RangeComponent]
        })
    ], RangeModule);
    return RangeModule;
}());
exports.RangeModule = RangeModule;
//# sourceMappingURL=range.component.js.map
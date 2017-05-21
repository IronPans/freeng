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
var RangeComponent = (function () {
    function RangeComponent(renderer2, domRenderer) {
        this.renderer2 = renderer2;
        this.domRenderer = domRenderer;
        this.touchstart = null;
        this.touchmove = null;
        this.touchend = null;
        this.timeoutID = null;
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.width = 150;
        this.onChange = new core_1.EventEmitter();
        this.maxPercent = 100;
    }
    RangeComponent.prototype.ngOnInit = function () {
        this.isTouch = ('ontouchend' in document);
        if (this.isTouch) {
            this.touchstart = 'touchstart';
            this.touchmove = 'touchmove';
            this.touchend = 'touchend';
        }
        else {
            this.touchstart = 'mousedown';
            this.touchmove = 'mousemove';
            this.touchend = 'mouseup';
        }
    };
    RangeComponent.prototype.ngAfterViewInit = function () {
        this.tooltip = this._tooltip.nativeElement;
        this.range = this._range.nativeElement;
        this.thumb = this._thumb.nativeElement;
        this.track = this._track.nativeElement;
        if (this.color) {
            this.renderer2.addClass(this.range, "free-" + this.color);
        }
        this.pageInit();
    };
    RangeComponent.prototype.pageInit = function () {
        // 计算当前值的百分比
        var t = this.max - this.min;
        var p = (this.value - this.min) / t;
        var current = Math.floor(p * this.range.offsetWidth);
        if (!isNaN(current)) {
            this.setValue(current);
        }
    };
    RangeComponent.prototype.getPoint = function (element, event) {
        /*将当前的触摸点坐标值减去元素的偏移位置，返回触摸点相对于element的坐标值*/
        event = event || window.event;
        var touchEvent = this.isTouch ? event.changedTouches[0] : event;
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
        ;
        percent = parseFloat(percent.toFixed(4));
        // 计算真实百分比
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
        this.documentTouchmoveListener = this.renderer2.listen('body', this.touchmove, function ($event) {
            _this.onTouchmove($event);
        });
        this.documentTouchendListener = this.renderer2.listen('body', this.touchend, function ($event) {
            _this.onTouchend($event);
        });
    };
    RangeComponent.prototype.onTouchmove = function (e) {
        if (this.isPressed) {
            this.show(this.tooltip);
            this.getValue(e);
        }
    };
    RangeComponent.prototype.onTouchend = function (e) {
        this.isPressed = false;
        this.hide(this.tooltip);
        this.documentTouchmoveListener();
        this.documentTouchendListener();
        this.documentTouchmoveListener = null;
        this.documentTouchendListener = null;
    };
    RangeComponent.prototype.hide = function (dom) {
        this.timeoutID = setTimeout(function () {
            dom.style.display = 'none';
        }, 200);
    };
    RangeComponent.prototype.show = function (dom) {
        dom.style.display = 'block';
    };
    return RangeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RangeComponent.prototype, "min", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RangeComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RangeComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RangeComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RangeComponent.prototype, "color", void 0);
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
        template: "\n    <div #range class=\"range-slider free-range\" (mousedown)=\"onTouchstart($event)\">\n      <div class=\"range-bar\"></div>\n      <div class=\"range-bar range-bar-active\" #track></div>\n      <div class=\"range-knob-handle\" #thumb>\n        <div class=\"range-knob\"></div>\n      </div>\n      <span class=\"range-slider-tooltip\" #tooltip></span>\n    </div>\n  ",
        styleUrls: ['./range.component.scss'],
        providers: [dom_1.DomRenderer]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        dom_1.DomRenderer])
], RangeComponent);
exports.RangeComponent = RangeComponent;
var RangeModule = (function () {
    function RangeModule() {
    }
    return RangeModule;
}());
RangeModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [RangeComponent],
        exports: [RangeComponent]
    })
], RangeModule);
exports.RangeModule = RangeModule;
//# sourceMappingURL=range.component.js.map
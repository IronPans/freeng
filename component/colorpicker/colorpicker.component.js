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
var dom_1 = require("../common/dom");
var forms_1 = require("@angular/forms");
var color_1 = require("./color");
var CUSTOME_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ColorpickerComponent; }),
    multi: true
};
var ColorpickerComponent = (function () {
    function ColorpickerComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchedChange = function () { };
        this.touch = this.domRenderer.getTouchEvent();
        this.color = new color_1.Color();
        this.colorValue = '#000';
        this.picker_mode = 'HSL';
        this.topic = 'picker';
        this.color.setFormat(this.picker_mode);
        this.color.setHSL(0, 51, 51);
        this.color.a = 1;
    }
    Object.defineProperty(ColorpickerComponent.prototype, "value", {
        get: function () {
            return this.colorValue;
        },
        set: function (value) {
            this.colorValue = value;
            this.changeHexa(value);
        },
        enumerable: true,
        configurable: true
    });
    ColorpickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.pickerArea = this.pickerAreaViewChild.nativeElement;
        this.colorPicker = this.colorPickerViewChild.nativeElement;
        this.hueArea = this.hueAreaViewChild.nativeElement;
        this.huePicker = this.huePickerViewChild.nativeElement;
        this.picker = this.pickerViewChild.nativeElement;
        this.createPickingArea();
        this.createHueArea();
        this.changeHexa(this.colorValue);
        this.documentClickListener = this.renderer2.listen('document', 'click', function () {
            if (!_this.selfClick && !_this.inline) {
                _this.visible = false;
            }
            _this.selfClick = false;
        });
        if (this.inline) {
            this.domRenderer.css(this.picker, {
                'position': 'relative',
                'top': '0',
                'left': '0'
            });
        }
    };
    ColorpickerComponent.prototype.writeValue = function (value) {
        if (value) {
            this.value = value;
        }
    };
    ColorpickerComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ColorpickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    ColorpickerComponent.prototype.onBlockClick = function (event) {
        this.visible = !this.visible;
        event.stopPropagation();
    };
    ColorpickerComponent.prototype.areaClick = function (event) {
        this.selfClick = true;
    };
    ColorpickerComponent.prototype.update = function (event) {
        if (this.hueDragging) {
            this.updateHueSlider(event);
        }
        else {
            this.updateColor(event);
        }
    };
    ColorpickerComponent.prototype.createPickingArea = function () {
        var _this = this;
        this.pickerClickListener = this.renderer2.listen(this.pickerArea, this.touch.touchstart, function (e) {
            _this.isDown = true;
            _this.pickerDragging = true;
            _this.update(e);
            if (_this.clickable) {
                _this.onClick.emit(true);
            }
            else {
                _this.bindDocumentTouchmoveListener();
            }
            _this.bindDocumentTouchendListener();
        });
    };
    ColorpickerComponent.prototype.createHueArea = function () {
        var _this = this;
        this.hueClickListener = this.renderer2.listen(this.hueArea, this.touch.touchstart, function (e) {
            _this.isDown = true;
            _this.hueDragging = true;
            _this.update(e);
            _this.bindDocumentTouchmoveListener();
            _this.bindDocumentTouchendListener();
        });
    };
    ColorpickerComponent.prototype.updateColor = function (e) {
        var rect = this.domRenderer.getRect(this.pickerArea);
        var x = e.pageX - document.body.scrollLeft - rect.left;
        var y = e.pageY - document.body.scrollTop - rect.top;
        var picker_offset = 5;
        var size = this.pickerArea.clientWidth;
        if (x > size) {
            x = size;
        }
        if (y > size) {
            y = size;
        }
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        var value = 100 - (y * 100 / size) | 0;
        var saturation = x * 100 / size | 0;
        if (this.picker_mode === 'HSV') {
            this.color.setHSV(this.color.hue, saturation, value);
        }
        if (this.picker_mode === 'HSL') {
            this.color.setHSL(this.color.hue, saturation, value);
        }
        this.colorPicker.style.left = x - picker_offset + 'px';
        this.colorPicker.style.top = y - picker_offset + 'px';
        this.updatePreviewColor();
    };
    ColorpickerComponent.prototype.updateHueSlider = function (e) {
        var rect = this.domRenderer.getRect(this.hueArea);
        var x = e.pageX - document.body.scrollLeft - rect.left;
        var width = this.hueArea.clientWidth;
        if (x < 0) {
            x = 0;
        }
        if (x > width) {
            x = width;
        }
        var hue = ((359 * x) / width) | 0;
        this.updateSliderPosition(this.huePicker, x);
        this.setHue(hue);
    };
    ColorpickerComponent.prototype.setColor = function (color) {
        if (color instanceof color_1.Color !== true) {
            console.log('Typeof parameter not Color');
            return;
        }
        if (color.format !== this.picker_mode) {
            color.setFormat(this.picker_mode);
            color.updateHSX();
        }
        this.color.copy(color);
        this.updateHuePicker();
        this.updatePickerPosition();
        this.updatePickerBackground();
        this.updatePreviewColor();
    };
    ColorpickerComponent.prototype.updateHuePicker = function () {
        var size = this.domRenderer.getHiddenElementClient(this.picker, this.hueArea, 'clientWidth');
        var offset = 1;
        var pos = (this.color.hue * size / 360) | 0;
        this.huePicker.style.left = pos - offset + 'px';
    };
    ColorpickerComponent.prototype.updatePickerPosition = function () {
        var size = this.domRenderer.getHiddenElementClient(this.picker, this.pickerArea, 'clientWidth');
        var value = 0;
        var offset = 5;
        if (this.picker_mode === 'HSV') {
            value = this.color.value;
        }
        if (this.picker_mode === 'HSL') {
            value = this.color.lightness;
        }
        var x = (this.color.saturation * size / 100) | 0;
        var y = size - (value * size / 100) | 0;
        this.colorPicker.style.left = x - offset + 'px';
        this.colorPicker.style.top = y - offset + 'px';
    };
    ColorpickerComponent.prototype.updatePickerBackground = function () {
        var nc = new color_1.Color(this.color);
        nc.setHSV(nc.hue, 100, 100);
        this.pickerArea.style.backgroundColor = nc.getHexa();
    };
    ColorpickerComponent.prototype.setHue = function (value) {
        this.color.setHue(value);
        this.updatePickerBackground();
        this.updatePreviewColor();
    };
    ColorpickerComponent.prototype.updateSliderPosition = function (elem, pos) {
        elem.style.left = Math.max(pos - 3, -2) + 'px';
    };
    ColorpickerComponent.prototype.updatePreviewColor = function () {
        this.colorValue = this.color.getColor();
    };
    ColorpickerComponent.prototype.HEXToRGBA = function (value) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 1;
        canvas.height = 1;
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, 1, 1);
        var data = ctx.getImageData(0, 0, 1, 1).data;
        this.color.setRGBA(data[0], data[1], data[2], data[3]);
        canvas = null;
    };
    ColorpickerComponent.prototype.changeHexa = function (value) {
        this.HEXToRGBA(value);
        var hex = this.color.getHexa();
        this.color.setHexa(hex);
        this.setColor(this.color);
    };
    ColorpickerComponent.prototype.bindDocumentTouchmoveListener = function () {
        var _this = this;
        if (!this.documentTouchmoveListener) {
            this.documentTouchmoveListener = this.renderer2.listen('document', this.touch.touchmove, function (event) {
                if (_this.isDown && !_this.inline) {
                    _this.update(event);
                }
            });
        }
    };
    ColorpickerComponent.prototype.bindDocumentTouchendListener = function () {
        var _this = this;
        if (!this.documentTouchendListener) {
            this.documentTouchendListener = this.renderer2.listen('document', this.touch.touchend, function (event) {
                _this.isDown = false;
                _this.hueDragging = false;
                _this.pickerDragging = false;
                _this.onModelChange(_this.colorValue);
                _this.onChange.emit({
                    value: _this.color.getHexa(),
                    rgb: _this.color.getRGBA(),
                    hsl: _this.color.getHSLA()
                });
                console.log(123);
                _this.unbindDocumentTouchmoveListener();
                _this.unbindDocumentTouchendListener();
            });
        }
    };
    ColorpickerComponent.prototype.unbindDocumentTouchmoveListener = function () {
        if (this.documentTouchmoveListener) {
            this.documentTouchmoveListener();
            this.documentTouchmoveListener = null;
        }
    };
    ColorpickerComponent.prototype.unbindDocumentTouchendListener = function () {
        if (this.documentTouchendListener) {
            this.documentTouchendListener();
            this.documentTouchendListener = null;
        }
    };
    ColorpickerComponent.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
        if (this.pickerClickListener) {
            this.pickerClickListener();
            this.pickerClickListener = null;
        }
        if (this.hueClickListener) {
            this.hueClickListener();
            this.hueClickListener = null;
        }
        this.unbindDocumentTouchmoveListener();
        this.unbindDocumentTouchendListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ColorpickerComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ColorpickerComponent.prototype, "inline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ColorpickerComponent.prototype, "clickable", void 0);
    __decorate([
        core_1.ViewChild('pickerArea'),
        __metadata("design:type", core_1.ElementRef)
    ], ColorpickerComponent.prototype, "pickerAreaViewChild", void 0);
    __decorate([
        core_1.ViewChild('colorPicker'),
        __metadata("design:type", core_1.ElementRef)
    ], ColorpickerComponent.prototype, "colorPickerViewChild", void 0);
    __decorate([
        core_1.ViewChild('hueArea'),
        __metadata("design:type", core_1.ElementRef)
    ], ColorpickerComponent.prototype, "hueAreaViewChild", void 0);
    __decorate([
        core_1.ViewChild('huePicker'),
        __metadata("design:type", core_1.ElementRef)
    ], ColorpickerComponent.prototype, "huePickerViewChild", void 0);
    __decorate([
        core_1.ViewChild('picker'),
        __metadata("design:type", core_1.ElementRef)
    ], ColorpickerComponent.prototype, "pickerViewChild", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ColorpickerComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ColorpickerComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ColorpickerComponent.prototype, "colorInput", void 0);
    ColorpickerComponent = __decorate([
        core_1.Component({
            selector: 'free-color-picker',
            template: "\n    <div class=\"free-picker\">\n      <div class=\"free-color-picker-block\" (click)=\"onBlockClick($event)\" *ngIf=\"!inline && !colorInput\"\n           [style.background-color]=\"colorValue\"></div>\n      <div class=\"free-color-input\" *ngIf=\"!inline && colorInput\" (click)=\"onBlockClick($event)\">\n        <input type=\"text\" readonly value=\"{{colorValue}}\" [style.color]=\"colorValue\">\n        <div class=\"free-color-block\" [style.background-color]=\"colorValue\"></div>\n      </div>\n      <div class=\"free-color-picker\" #picker (click)=\"areaClick($event)\"\n           data-mode='HSL' [style.display]=\"(inline || visible) ? 'block' : 'none'\">\n        <div class=\"free-picking-area\" #pickerArea style=\"background-color: rgb(255, 0, 0);\">\n          <div class=\"picker\" #colorPicker style=\"left: 94px; top: 94px;\"></div>\n        </div>\n        <div class=\"free-hue-area\" #hueArea>\n          <div class=\"slider-picker\" #huePicker style=\"left: -1px;\"></div>\n        </div>\n      </div>\n    </div>",
            providers: [dom_1.DomRenderer, CUSTOME_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.Renderer2])
    ], ColorpickerComponent);
    return ColorpickerComponent;
}());
exports.ColorpickerComponent = ColorpickerComponent;
var ColorPickerModule = (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ColorpickerComponent],
            exports: [ColorpickerComponent]
        })
    ], ColorPickerModule);
    return ColorPickerModule;
}());
exports.ColorPickerModule = ColorPickerModule;
//# sourceMappingURL=colorpicker.component.js.map
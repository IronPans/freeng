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
var ImageComponent = (function () {
    function ImageComponent(er) {
        this.er = er;
    }
    Object.defineProperty(ImageComponent.prototype, "imageWidth", {
        get: function () {
            return this.width;
        },
        set: function (value) {
            this.width = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ImageComponent.prototype.ngOnInit = function () {
    };
    ImageComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ImageComponent.prototype, "src", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ImageComponent.prototype, "alt", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ImageComponent.prototype, "highlight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageComponent.prototype, "imageWidth", null);
    __decorate([
        core_1.HostBinding('style.width'),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "width", void 0);
    ImageComponent = __decorate([
        core_1.Component({
            selector: 'free-image',
            template: "\n    <div class=\"free-image\" [class.free-highlight]=\"highlight\">\n      <img [src]=\"src\" [alt]=\"alt\">\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ImageComponent);
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
var ImageGroupComponent = (function () {
    function ImageGroupComponent() {
        this.images = [];
    }
    ImageGroupComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageGroupComponent.prototype, "images", void 0);
    ImageGroupComponent = __decorate([
        core_1.Component({
            selector: 'free-image-group',
            template: "\n    <div class=\"free-image-group\">\n      <free-image *ngFor=\"let image of images\"\n                  [src]=\"image.src\" [alt]=\"image.alt\"\n                  [highlight]=\"image.highlight\"></free-image>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ImageGroupComponent);
    return ImageGroupComponent;
}());
exports.ImageGroupComponent = ImageGroupComponent;
var ImageModule = (function () {
    function ImageModule() {
    }
    ImageModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ImageComponent, ImageGroupComponent],
            exports: [ImageComponent, ImageGroupComponent]
        })
    ], ImageModule);
    return ImageModule;
}());
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.component.js.map
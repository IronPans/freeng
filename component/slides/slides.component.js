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
var SlidesComponent = (function () {
    function SlidesComponent(er, domRender) {
        this.er = er;
        this.domRender = domRender;
        this.speed = 300;
        this.direction = 'horizontal';
        this.autoplayDisableOnInteraction = true;
        this.slideChange = new core_1.EventEmitter();
        this.activeIndex = 0;
        this.slides = [];
        this.loopActiveIndex = 0;
        this.loopAdditionalSlides = 2;
    }
    SlidesComponent.prototype.ngOnInit = function () {
        this.bullets = [];
        this.reset();
        this.isMobile = 'ontouchstart' in document;
    };
    SlidesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._er = this.er.nativeElement;
        this.itemWidth = this._er.offsetWidth;
        this._wrapper = this.wrapper.nativeElement;
        this._container = this.container.nativeElement;
        this.slidesLength = this.slides.length;
        for (var i = 0; i < this.slidesLength; i++) {
            var slide = this.slides[i];
            slide.width = this.itemWidth;
            slide.index = i;
        }
        this.domRender.addClass(this._container, "free-container-" + this.direction);
        this.domRender.transitionEnd(this._wrapper, function () {
            _this.domRender.setTransitionDuration(_this._wrapper, 0);
            if (_this.loop) {
                if (_this.loopActiveIndex === 0) {
                    _this.loopActiveIndex = _this.loopSlidesLength - _this.loopAdditionalSlides;
                    _this.slideTo(_this.loopActiveIndex, 0);
                    _this.activeIndex = _this.slidesLength - 1;
                }
                else if (_this.loopActiveIndex >= _this.loopSlidesLength - 1) {
                    _this.loopActiveIndex = 1;
                    _this.slideTo(_this.loopActiveIndex, 0);
                    _this.activeIndex = 0;
                }
                else {
                    _this.activeIndex = _this.loopActiveIndex - 1;
                }
            }
            else {
                _this.activeIndex = _this.loopActiveIndex;
            }
            _this.slideChange.emit({ activeIndex: _this.activeIndex });
        });
        if (this.loop) {
            this._autoplaying = true;
            this.createLoop();
        }
        if (this.autoplay) {
            this.startAutoplay();
        }
    };
    SlidesComponent.prototype.ngAfterContentInit = function () {
    };
    SlidesComponent.prototype.reset = function () {
        this.startXY = {
            x: 0,
            y: 0
        };
        this.moveXY = {
            x: 0,
            y: 0
        };
    };
    SlidesComponent.prototype.add = function (slide) {
        if (this.pagination) {
            this.bullets.push(this.slides.length);
        }
        this.slides.push(slide);
    };
    SlidesComponent.prototype.startAutoplay = function () {
        var _this = this;
        if (typeof this.autoplayTimeoutId !== 'undefined') {
            return false;
        }
        this.autoplayTimeoutId = setInterval(function () {
            _this.slideNext(false);
        }, this.autoplay);
    };
    SlidesComponent.prototype.stopAutoplay = function () {
        clearInterval(this.autoplayTimeoutId);
        this.autoplayTimeoutId = undefined;
        this._autoplaying = false;
    };
    SlidesComponent.prototype.getPoint = function (e) {
        var touchEvent = this.isMobile ? e.changedTouches[0] : e;
        return {
            x: touchEvent.pageX,
            y: touchEvent.pageY
        };
    };
    SlidesComponent.prototype.createLoop = function () {
        var slides = this._wrapper.querySelectorAll('free-slide');
        this.loopSlidesLength = slides.length + 2;
        var prevSlide = slides[0].cloneNode(true);
        var lastSlide = slides[slides.length - 1].cloneNode(true);
        this._wrapper.insertBefore(lastSlide, slides[0]);
        this._wrapper.appendChild(prevSlide);
        this.slideTo(1, 0);
        this.loopActiveIndex = 1;
    };
    SlidesComponent.prototype.paginationClick = function (index) {
        if (this.paginationClickable) {
            if (this.loop) {
                this.loopActiveIndex = index + 1;
            }
            else {
                this.loopActiveIndex = index;
            }
            this.slideTo(this.loopActiveIndex);
        }
    };
    SlidesComponent.prototype.onMousedown = function (event) {
        this.reset();
        this.startXY = this.getPoint(event);
        this.isDowned = true;
        if (this.autoplay && this.autoplayTimeoutId) {
            this.stopAutoplay();
        }
    };
    SlidesComponent.prototype.onMousemove = function (event) {
        if (this.isDowned) {
            var _a = this.getPoint(event), x = _a.x, y = _a.y;
            this.moveXY = { x: x - this.startXY.x, y: y - this.startXY.y };
            var tx = 'translate3d(' + (-this.itemWidth * this.loopActiveIndex + this.moveXY.x) + 'px, 0, 0)';
            this.domRender.setTransform(this._wrapper, tx);
        }
    };
    SlidesComponent.prototype.onMouseup = function (event) {
        this.isDowned = false;
        var halfWidth = this.itemWidth / 2;
        if (this.moveXY.x < 0 && (this.loopActiveIndex !== this.slides.length - 1)
            && -this.moveXY.x > halfWidth) {
            this.loopActiveIndex++;
        }
        else if (this.moveXY.x > 0 && this.loopActiveIndex !== 0 && this.moveXY.x > halfWidth) {
            this.loopActiveIndex--;
        }
        this.slideTo(this.loopActiveIndex);
        if (this.loop) {
            this.activeIndex = this.loopActiveIndex - 1;
        }
        else {
            this.activeIndex = this.loopActiveIndex;
        }
        this._autoplaying = false;
        if (!this.autoplayDisableOnInteraction) {
            this.startAutoplay();
        }
    };
    SlidesComponent.prototype.slidePrev = function (canSlide) {
        if (canSlide) {
            return;
        }
        this.loopActiveIndex--;
        this.slideTo(this.loopActiveIndex);
    };
    SlidesComponent.prototype.slideNext = function (canSlide) {
        if (canSlide) {
            return;
        }
        this.loopActiveIndex++;
        this.slideTo(this.loopActiveIndex);
    };
    SlidesComponent.prototype.slideTo = function (index, speed) {
        if (speed === void 0) { speed = this.speed; }
        this.domRender.setTransitionDuration(this._wrapper, speed);
        this.domRender.setTransform(this._wrapper, 'translate3d(-' + this.itemWidth * index + 'px, 0, 0)');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlidesComponent.prototype, "speed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlidesComponent.prototype, "styles", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlidesComponent.prototype, "loop", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlidesComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlidesComponent.prototype, "paginationClickable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlidesComponent.prototype, "arrow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlidesComponent.prototype, "prev", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlidesComponent.prototype, "next", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlidesComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlidesComponent.prototype, "autoplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlidesComponent.prototype, "autoplayDisableOnInteraction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SlidesComponent.prototype, "slideChange", void 0);
    __decorate([
        core_1.ViewChild('wrapper'),
        __metadata("design:type", core_1.ElementRef)
    ], SlidesComponent.prototype, "wrapper", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], SlidesComponent.prototype, "container", void 0);
    SlidesComponent = __decorate([
        core_1.Component({
            selector: 'free-slides',
            template: "\n    <div class=\"free-slides\" [ngStyle]=\"styles\" #container>\n      <div class=\"free-slides-wrapper\" #wrapper (mousedown)=\"onMousedown($event)\"\n           (mousemove)=\"onMousemove($event)\" (mouseup)=\"onMouseup($event)\">\n        <ng-content></ng-content>\n      </div>\n      <div class=\"free-slides-pagination free-pagination-bullets\"\n           [class.free-pagination-clickable]=\"paginationClickable\" *ngIf=\"pagination\">\n        <span class=\"free-pagination-bullet\"\n              *ngFor=\"let bullet of bullets; index as i\"\n              [ngClass]=\"{'free-pagination-bullet-active': i == activeIndex}\"\n              (click)=\"paginationClick(i)\"></span>\n      </div>\n      <div class=\"free-slides-prev\" [ngClass]=\"{'free-slides-disabled': (!loop && activeIndex == 0)}\"\n           *ngIf=\"prev || arrow\" (click)=\"slidePrev(!loop && activeIndex == 0)\">\n        <i class=\"fa fa-angle-left\"></i>\n      </div>\n      <div class=\"free-slides-next\"\n           [ngClass]=\"{'free-slides-disabled': (!loop &&  activeIndex == slides.length - 1)}\"\n           *ngIf=\"next || arrow\" (click)=\"slideNext(!loop &&  activeIndex == slides.length - 1)\">\n        <i class=\"fa fa-angle-right\"></i>\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, dom_1.DomRenderer])
    ], SlidesComponent);
    return SlidesComponent;
}());
exports.SlidesComponent = SlidesComponent;
var SlideComponent = (function () {
    function SlideComponent(group) {
        this.group = group;
    }
    SlideComponent.prototype.ngOnInit = function () {
        this.group.add(this);
    };
    SlideComponent = __decorate([
        core_1.Component({
            selector: 'free-slide',
            template: "\n    <div class=\"free-slide\" [attr.index]=\"index\" [style.width.px]=\"width\">\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [SlidesComponent])
    ], SlideComponent);
    return SlideComponent;
}());
exports.SlideComponent = SlideComponent;
var SlideModule = (function () {
    function SlideModule() {
    }
    SlideModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [SlideComponent, SlidesComponent],
            exports: [SlideComponent, SlidesComponent]
        })
    ], SlideModule);
    return SlideModule;
}());
exports.SlideModule = SlideModule;
//# sourceMappingURL=slides.component.js.map
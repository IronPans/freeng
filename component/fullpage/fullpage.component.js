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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dom_1 = require("../common/dom");
var common_1 = require("@angular/common");
var FullpageSlideComponent = (function () {
    function FullpageSlideComponent(group) {
        this.group = group;
        this.group.addSlide(this);
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FullpageSlideComponent.prototype, "index", void 0);
    FullpageSlideComponent = __decorate([
        core_1.Component({
            selector: 'free-fullpage-slide',
            template: "\n    <div class=\"free-fullpage-slide\" [ngClass]=\"{'free-fullpage-slide-active': active}\"\n         [style.height.px]=\"height\">\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return FullpageComponent; }))),
        __metadata("design:paramtypes", [FullpageComponent])
    ], FullpageSlideComponent);
    return FullpageSlideComponent;
}());
exports.FullpageSlideComponent = FullpageSlideComponent;
var FullpageBulletComponent = (function () {
    function FullpageBulletComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FullpageBulletComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FullpageBulletComponent.prototype, "active", void 0);
    FullpageBulletComponent = __decorate([
        core_1.Component({
            selector: 'free-pagination-bullet',
            template: "\n    <div class=\"free-pagination-bullet\"\n         [ngClass]=\"{'free-pagination-bullet-active': active}\"></div>\n  "
        })
    ], FullpageBulletComponent);
    return FullpageBulletComponent;
}());
exports.FullpageBulletComponent = FullpageBulletComponent;
var FullpageComponent = (function () {
    function FullpageComponent(domRenderer) {
        this.domRenderer = domRenderer;
        this.slideStart = new core_1.EventEmitter();
        this.slideEnd = new core_1.EventEmitter();
        this.activeIndex = 0;
        this.win = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.slides = [];
    }
    FullpageComponent.prototype.onResize = function () {
        this.win = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
    FullpageComponent.prototype.onWheel = function (e) {
        e = e || window.event;
        if (!this.isScroll) {
            if (e.wheelDelta) {
                if (e.wheelDelta > 0) {
                    this.scrollPrev();
                }
                else if (e.wheelDelta < 0) {
                    this.scrollNext();
                }
            }
            else if (e.detail) {
                if (e.detail < 0) {
                    this.scrollPrev();
                }
                else if (e.detail > 0) {
                    this.scrollNext();
                }
            }
        }
    };
    FullpageComponent.prototype.addSlide = function (slide) {
        this.slides.push(slide);
    };
    FullpageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerViewChild.nativeElement;
        this.wrapper = this.wrapperViewChild.nativeElement;
        if (this.pagination) {
            this.paginationElem = this.paginationViewChild.nativeElement;
        }
        this.refreshView();
        this.transitionstartListener = this.domRenderer.listen(this.wrapper, 'transitionstart', function () {
            if (_this.container) {
                _this.isScroll = true;
                _this.slideStart.emit({
                    activeIndex: _this.activeIndex
                });
            }
        });
        this.transitionendListerner = this.domRenderer.listen(this.wrapper, 'transitionend', function () {
            if (_this.container) {
                _this.isScroll = false;
                _this.slideEnd.emit({
                    activeIndex: _this.activeIndex
                });
            }
        });
    };
    FullpageComponent.prototype.onPaginationClick = function (index) {
        if (this.paginationClickable) {
            this.scrollTo(index);
        }
    };
    FullpageComponent.prototype.refreshView = function () {
        var wHeight = this.win['height'];
        this.totalSlides = this.slides.length;
        this.wrapper.style.height = wHeight * this.totalSlides + 'px';
        for (var _i = 0, _a = this.slides; _i < _a.length; _i++) {
            var slide = _a[_i];
            slide.height = wHeight;
        }
    };
    FullpageComponent.prototype.scrollPrev = function () {
        if (this.activeIndex > 0) {
            this.activeIndex--;
            this.scrollTo(this.activeIndex);
        }
    };
    FullpageComponent.prototype.scrollNext = function () {
        if (this.activeIndex < this.totalSlides - 1) {
            this.activeIndex++;
            this.scrollTo(this.activeIndex);
        }
    };
    FullpageComponent.prototype.scrollTo = function (index) {
        if (index < this.totalSlides) {
            this.isScroll = true;
            this.wrapper.style.transform = 'translate3d(0,-' + this.win['height'] * index + 'px,0)';
            this.activeIndex = index;
        }
    };
    FullpageComponent.prototype.ngOnDestroy = function () {
        if (this.transitionstartListener) {
            this.transitionstartListener();
        }
        if (this.transitionendListerner) {
            this.transitionendListerner();
        }
        this.container = null;
    };
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], FullpageComponent.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('wrapper'),
        __metadata("design:type", core_1.ElementRef)
    ], FullpageComponent.prototype, "wrapperViewChild", void 0);
    __decorate([
        core_1.ViewChild('pagination'),
        __metadata("design:type", core_1.ElementRef)
    ], FullpageComponent.prototype, "paginationViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FullpageComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FullpageComponent.prototype, "paginationClickable", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FullpageComponent.prototype, "slideStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FullpageComponent.prototype, "slideEnd", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FullpageComponent.prototype, "onResize", null);
    __decorate([
        core_1.HostListener('document:wheel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FullpageComponent.prototype, "onWheel", null);
    FullpageComponent = __decorate([
        core_1.Component({
            selector: 'free-fullpage',
            template: "\n    <div class=\"free-fullpage-container\" #container>\n      <div class=\"free-fullpage-wrapper\" #wrapper>\n        <ng-content></ng-content>\n      </div>\n      <div class=\"free-fullpage-pagination\" *ngIf=\"pagination\" #pagination>\n        <free-pagination-bullet *ngFor=\"let slide of slides;index as i\" [index]=\"i\"\n                                [active]=\"activeIndex === i\" (click)=\"onPaginationClick(i)\">\n        </free-pagination-bullet>\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer])
    ], FullpageComponent);
    return FullpageComponent;
}());
exports.FullpageComponent = FullpageComponent;
var FullpageModule = (function () {
    function FullpageModule() {
    }
    FullpageModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [FullpageSlideComponent, FullpageBulletComponent, FullpageComponent],
            exports: [FullpageSlideComponent, FullpageBulletComponent, FullpageComponent]
        })
    ], FullpageModule);
    return FullpageModule;
}());
exports.FullpageModule = FullpageModule;
//# sourceMappingURL=fullpage.component.js.map
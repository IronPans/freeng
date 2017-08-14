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
var ScrollComponent = (function () {
    function ScrollComponent(domRenderer, er) {
        this.domRenderer = domRenderer;
        this.er = er;
    }
    ScrollComponent.prototype.ngOnInit = function () {
        this.isMoz = 'MoztTransform' in document.createElement('div').style;
        this.WHEEL_EV = this.isMoz ? 'DOMMouseScroll' : 'mousewheel';
    };
    ScrollComponent.prototype.ngAfterViewInit = function () {
        this.container = this._container.nativeElement;
        this.thumb = this._thumb.nativeElement;
        this.scrollbar = this._scrollbar.nativeElement;
        this.wrapper = this.container.querySelector('.free-scroll-wrapper');
        if (this.scrollClass) {
            this.domRenderer.addClass(this.container, this.scrollClass);
        }
        this.scrollInit();
    };
    ScrollComponent.prototype.onMouseEnter = function () {
        if (this.scrollTop > 0) {
            this.scrollbar.style.opacity = 1;
        }
        this.isTouch = true;
    };
    ScrollComponent.prototype.onMouseLeave = function () {
        this.scrollbar.style.opacity = 0;
        this.isTouch = false;
    };
    ScrollComponent.prototype.refresh = function () {
        this.scrollHeight = this.wrapper.offsetHeight;
        this.offsetHeight = this.container.offsetHeight;
        this.offsetTop = 0;
        this.scrollTop = this.scrollHeight - this.offsetHeight;
        this.scrollBarHeight = this.scrollbar.offsetHeight;
        this.scrollBarHeight = Math.max(Math.round(this.scrollBarHeight *
            this.scrollBarHeight / this.wrapper.offsetHeight), 8);
        this.thumb.style.height = (this.scrollBarHeight) + 'px';
        if (this.scrollTop > 0 && this.isTouch) {
            this.scrollbar.style.opacity = 1;
        }
        else if (this.scrollTop <= 0) {
            this.scrollbar.style.opacity = 0;
            this.reset();
        }
    };
    ScrollComponent.prototype.reset = function () {
        this.moveY = 0;
        this.domRenderer.setTransform(this.thumb, 'translate3d(0, 0px, 0');
        this.domRenderer.setTransform(this.wrapper, 'translate3d(0, ' + this.moveY + 'px, 0');
    };
    ScrollComponent.prototype.move = function (y) {
        if (this.scrollTop > 0) {
            this.moveY += y;
            // 计算滚动条滚动的高度
            if (this.moveY >= 0) {
                this.moveY = 0;
            }
            else if (Math.abs(this.moveY) >= this.scrollTop) {
                this.moveY = -this.scrollTop;
            }
            else {
                this.moveY = this.moveY;
            }
            ;
            var sv = this.moveY / this.scrollTop * (this.scrollbar.offsetHeight - this.scrollBarHeight);
            sv = -Math.floor(sv);
            this.domRenderer.setTransform(this.thumb, 'translate3d(0, ' + sv + 'px, 0');
            this.domRenderer.setTransform(this.wrapper, 'translate3d(0, ' + this.moveY + 'px, 0');
        }
    };
    ScrollComponent.prototype.onWheel = function (e) {
        var wheelDeltaX;
        var wheelDeltaY;
        if ('wheelDeltaX' in e) {
            wheelDeltaX = e.wheelDeltaX / 12;
            wheelDeltaY = e.wheelDeltaY / 12;
        }
        else if ('wheelDelta' in e) {
            wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
        }
        else if ('detail' in e) {
            wheelDeltaX = wheelDeltaY = -e.detail * 3;
        }
        else {
            return;
        }
        ;
        if (!this.isLoading) {
            this.isRunning = true;
            this.move(wheelDeltaY);
        }
    };
    ScrollComponent.prototype.scrollInit = function () {
        this.moveY = 0;
        // this.domHandler.css(this.thumb, {
        //   background: 'rgba(102,128,153,.2)',
        // });
        this.domRenderer.setTransitionDuration(this.thumb, 300);
        this.domRenderer.addPrefix(this.thumb, 'transition', 'transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)');
        this.domRenderer.addPrefix(this.scrollbar, 'transition', 'all 350ms cubic-bezier(0.33, 0.66, 0.66, 1)');
        this.refresh();
        this.intervalId = setInterval(function ($this) {
            $this.refresh();
        }, 10, this);
    };
    ScrollComponent.prototype.onMousedown = function () {
    };
    ScrollComponent.prototype.onMousemove = function () { };
    ScrollComponent.prototype.onMouseup = function () { };
    __decorate([
        core_1.ViewChild('scroll'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollComponent.prototype, "_container", void 0);
    __decorate([
        core_1.ViewChild('thumb'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollComponent.prototype, "_thumb", void 0);
    __decorate([
        core_1.ViewChild('scrollbar'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollComponent.prototype, "_scrollbar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ScrollComponent.prototype, "scrollClass", void 0);
    ScrollComponent = __decorate([
        core_1.Component({
            selector: 'free-scroll',
            template: "\n     <div class=\"free-scroll\" #scroll (wheel)=\"onWheel($event)\" \n         (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\">\n      <div class=\"free-scroll-wrapper\">\n        <div class=\"free-scroll-inner\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n      <div class=\"free-scroll-scrollbar\" #scrollbar>\n        <div class=\"free-scroll-thumb\" #thumb (mousedown)=\"onMousedown()\"></div>\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer,
            core_1.ElementRef])
    ], ScrollComponent);
    return ScrollComponent;
}());
exports.ScrollComponent = ScrollComponent;
var ScrollModule = (function () {
    function ScrollModule() {
    }
    ScrollModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ScrollComponent],
            exports: [ScrollComponent]
        })
    ], ScrollModule);
    return ScrollModule;
}());
exports.ScrollModule = ScrollModule;
//# sourceMappingURL=scroll.component.js.map
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
/**
 * Created by root on 17-5-12.
 */
var core_1 = require("@angular/core");
var DomRenderer = (function () {
    function DomRenderer(renderer2) {
        this.renderer2 = renderer2;
    }
    DomRenderer.prototype.addClass = function (dom, className) {
        var classes = className.split(/\s+/);
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var cName = classes_1[_i];
            this.renderer2.addClass(dom, cName);
        }
    };
    DomRenderer.prototype.removeClass = function (dom, className) {
        var classes = className.split(/\s+/);
        for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
            var cName = classes_2[_i];
            this.renderer2.removeClass(dom, cName);
        }
    };
    DomRenderer.prototype.addPrefix = function (element, attr, value) {
        var prefix = ['webkit', 'moz', 'o', 'ms'];
        var uattr = attr.split('');
        uattr[0] = uattr[0].toUpperCase();
        uattr = uattr.join('');
        prefix.forEach(function (x) {
            element.style[x + uattr] = value;
        });
        element.style[attr] = value;
    };
    DomRenderer.prototype.toggleFullScreen = function (elem) {
        if (elem === void 0) { elem = document.documentElement; }
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            var docElm = elem;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            ;
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
        ;
    };
    ;
    DomRenderer.prototype.getStyle = function (dom, attr) {
        return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, 'false')[attr];
    };
    DomRenderer.prototype.getRandom = function (max, min) {
        min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    DomRenderer.prototype.getWebType = function () {
        var type = ['webkit', 'moz', 'o', 'ms'];
        var cur = '';
        type.forEach(function (t) {
            var mo = t + 'Transform';
            if (mo in document.createElement('div').style) {
                cur = t;
            }
        });
        return cur;
    };
    DomRenderer.prototype.getRect = function (dom) {
        return dom.getBoundingClientRect();
    };
    DomRenderer.prototype.fadeIn = function (element, duration) {
        element.style.opacity = 0;
        var last = +new Date();
        var opacity = 0;
        var tick = function () {
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    };
    DomRenderer.prototype.fadeOut = function (element, ms) {
        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
        var fading = setInterval(function () {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    };
    DomRenderer.prototype.css = function (dom, styles) {
        var style = Array.from(styles);
        for (var s in styles) {
            dom.style[s] = styles[s];
        }
    };
    DomRenderer.prototype.animationEnd = function (elem, handler) {
        elem.addEventListener('animationend', handler, false);
        elem.addEventListener('webkitAnimationEnd', handler, false);
        elem.addEventListener('mozAnimationEnd', handler, false);
        elem.addEventListener('OAnimationEnd', handler, false);
    };
    DomRenderer.prototype.setTransform = function (element, animation) {
        element.style.webkitTransform = animation;
        element.style.mozTransform = animation;
        element.style.oTransform = animation;
        element.style.msTransform = animation;
        element.style.transform = animation;
    };
    DomRenderer.prototype.setTransitionDuration = function (element, times) {
        element.style.webkitTransitionDuration = times + 'ms';
        element.style.mozTransitionDuration = times + 'ms';
        element.style.oTransitionDuration = times + 'ms';
        element.style.transitionDuration = times + 'ms';
    };
    DomRenderer.prototype.transitionEnd = function (elem, handler) {
        elem.addEventListener('transitionend', handler, false);
        elem.addEventListener('webkitTransitionEnd', handler, false);
        elem.addEventListener('mozTransitionEnd', handler, false);
        elem.addEventListener('oTransitionEnd', handler, false);
    };
    DomRenderer.prototype.deleteTransitionEnd = function (elem, handler) {
        elem.removeEventListener('transitionend', handler, false);
        elem.removeEventListener('webkitTransitionEnd', handler, false);
        elem.removeEventListener('mozTransitionEnd', handler, false);
        elem.removeEventListener('oTransitionEnd', handler, false);
    };
    DomRenderer.prototype.checkPlatform = function () {
        var userAngent = '', isMobile = false;
        var mobile = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/;
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
            (mobile.test(navigator.userAgent))) {
            try {
                if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    userAngent = 'mobile';
                }
                else if (/iPad/i.test(navigator.userAgent)) {
                    userAngent = 'ipad';
                }
                isMobile = true;
            }
            catch (e) { }
        }
        else {
            isMobile = false;
            userAngent = 'window';
        }
        ;
        return {
            platform: userAngent,
            isMobile: isMobile
        };
    };
    return DomRenderer;
}());
DomRenderer = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Renderer2])
], DomRenderer);
exports.DomRenderer = DomRenderer;
//# sourceMappingURL=dom.js.map
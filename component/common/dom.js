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
var DomRenderer = (function () {
    function DomRenderer(renderer2) {
        this.renderer2 = renderer2;
    }
    DomRenderer.prototype.addClass = function (elem, className) {
        var classes = className.split(/\s+/);
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var cName = classes_1[_i];
            this.renderer2.addClass(elem, cName);
        }
    };
    DomRenderer.prototype.hasClass = function (elem, className) {
        return elem.className.indexOf(className) !== -1;
    };
    DomRenderer.prototype.removeClass = function (elem, className) {
        var classes = className.split(/\s+/);
        for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
            var cName = classes_2[_i];
            this.renderer2.removeClass(elem, cName);
        }
    };
    DomRenderer.prototype.getHiddenElementOuterHeight = function (elem) {
        if (elem.style.display !== 'none') {
            return {
                width: elem.offsetWidth,
                height: elem.offsetHeight
            };
        }
        elem.style.visibility = 'hidden';
        elem.style.display = 'block';
        var height = elem.offsetHeight;
        var width = elem.offsetWidth;
        elem.style.display = 'none';
        elem.style.visibility = 'visible';
        return {
            width: width,
            height: height
        };
    };
    DomRenderer.prototype.getHiddenElementClient = function (parent, elem, property) {
        if (parent.style.display !== 'none') {
            return parseFloat(elem[property]);
        }
        parent.style.display = 'block';
        parent.style.visibility = 'hidden';
        var p = elem[property];
        parent.style.display = 'none';
        parent.style.visibility = 'visible';
        return parseFloat(p);
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
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    };
    ;
    DomRenderer.prototype.getStyle = function (elem, attr) {
        return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, 'false')[attr];
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
    DomRenderer.prototype.getRect = function (elem) {
        return elem.getBoundingClientRect();
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
                if (window.requestAnimationFrame) {
                    requestAnimationFrame(tick);
                }
                else {
                    setTimeout(tick, 16);
                }
            }
        };
        tick();
    };
    DomRenderer.prototype.fadeOut = function (element, ms) {
        var opacity = 1;
        var interval = 50, duration = ms, gap = interval / duration;
        var fading = setInterval(function () {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    };
    DomRenderer.prototype.css = function (elem, style) {
        for (var s in style) {
            if (style.hasOwnProperty(s)) {
                elem.style[s] = style[s];
            }
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
    DomRenderer.prototype.transitionStart = function (elem, handler) {
        elem.addEventListener('transitionstart', handler, false);
        elem.addEventListener('webkitTransitionStart', handler, false);
        elem.addEventListener('mozTransitionStart', handler, false);
        elem.addEventListener('oTransitionStart', handler, false);
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
            catch (e) {
            }
        }
        else {
            isMobile = false;
            userAngent = 'window';
        }
        return {
            platform: userAngent,
            isMobile: isMobile
        };
    };
    DomRenderer.prototype.isIE = function () {
        return 'ActiveXObject' in window;
    };
    DomRenderer.prototype.listen = function (elem, type, handler) {
        this.renderer2.listen(elem, type, handler);
    };
    DomRenderer.prototype.parentNode = function (elem) {
        return this.renderer2.parentNode(elem);
    };
    DomRenderer.prototype.createElement = function (elem) {
        return this.renderer2.createElement(elem);
    };
    DomRenderer.prototype.appendChild = function (parent, newDom) {
        this.renderer2.appendChild(parent, newDom);
    };
    DomRenderer.prototype.insertBefore = function (parent, newDom, oldDom) {
        parent.insertBefore(newDom, oldDom);
    };
    DomRenderer.prototype.insertAfter = function (parent, newDom, oldChild) {
        var nextDom = oldChild.nextElementSibling;
        if (nextDom) {
            parent.insertBefore(newDom, nextDom);
        }
        else {
            parent.appendChild(newDom);
        }
    };
    DomRenderer.prototype.removeChild = function (parent, oldChild) {
        this.renderer2.removeChild(parent, oldChild);
    };
    DomRenderer.prototype.getOffsetTop = function (elem) {
        var tmp = elem.offsetTop;
        var val = elem.offsetParent;
        while (val != null) {
            tmp += val.offsetTop;
            val = val.offsetParent;
        }
        return tmp;
    };
    DomRenderer.prototype.getOffsetLeft = function (elem) {
        var tmp = elem.offsetLeft;
        var val = elem.offsetParent;
        while (val != null) {
            tmp += val.offsetLeft;
            val = val.offsetParent;
        }
        return tmp;
    };
    DomRenderer.prototype.getTouchEvent = function () {
        var isMobile = 'ontouchstart' in document;
        var event;
        if (isMobile) {
            event = {
                touchstart: 'touchstart',
                touchmove: 'touchmove',
                touchend: 'touchend',
                mobile: true
            };
        }
        else {
            event = {
                touchstart: 'mousedown',
                touchmove: 'mousemove',
                touchend: 'mouseup',
                mobile: false
            };
        }
        return event;
    };
    DomRenderer.prototype.setProperty = function (elem, name, value) {
        return this.renderer2.setProperty(elem, name, value);
    };
    DomRenderer.prototype.getScrollbarWidth = function () {
        var div = document.createElement('div');
        this.addClass(div, 'free-iscroll');
        this.css(div, {
            width: '100%',
            height: '100%',
            opacity: 0,
            overflow: 'scroll'
        });
        document.body.appendChild(div);
        var scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollbarWidth;
    };
    DomRenderer.prototype.dateFormat = function (date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                var regExp = new RegExp('(' + k + ')');
                if (regExp.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) :
                        (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
        }
        return fmt;
    };
    DomRenderer.prototype.forEach = function (arr, callback) {
        if (arr) {
            if (Array.isArray(arr)) {
                arr.forEach(function (value, index, arrs) {
                    callback(value, index, arrs);
                });
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    callback(arr[i], i, arr);
                }
            }
        }
    };
    DomRenderer.prototype.createEvent = function (type, detail) {
        if (detail === void 0) { detail = {}; }
        return new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail: detail
        });
    };
    DomRenderer.prototype.triggerEvent = function (dom, event) {
        dom.dispatchEvent(event);
    };
    DomRenderer.prototype.parentsUntil = function (dom, parent) {
        var parentNode = [];
        if (typeof parent === 'string') {
            var target = dom;
            while (target) {
                if (this.hasClass(target, parent)) {
                    break;
                }
                parentNode.push(target);
                target = target.parentNode;
            }
        }
        else {
            var target = dom;
            while (target) {
                if (target === parent) {
                    break;
                }
                parentNode.push(target);
                target = target.parentNode;
            }
        }
        return parentNode;
    };
    DomRenderer.prototype.preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else if (event.returnValue) {
            event.returnValue = false;
        }
    };
    DomRenderer.prototype.stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else if (event.cancelBubble) {
            event.cancelBubble = false;
        }
    };
    DomRenderer.zIndex = 9990;
    DomRenderer = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], DomRenderer);
    return DomRenderer;
}());
exports.DomRenderer = DomRenderer;
//# sourceMappingURL=dom.js.map
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
var partical_1 = require("./partical");
var dom_1 = require("../common/dom");
var ParticleDirective = (function () {
    function ParticleDirective(er, domRenderer, renderer2) {
        this.er = er;
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.size = 8;
        this.distance = 100;
        this.total = 100;
        this.backgroundColor = 'linear-gradient(to bottom,#115d8e 0, #347eff 100%)';
        this.defaultColor = 'rgba(255,255,255,.2)';
    }
    ParticleDirective.prototype.onResize = function () {
        this.reset();
    };
    ;
    ParticleDirective.prototype.ngOnInit = function () {
        this.container = this.renderer2.createElement('canvas');
        this.ctx = this.container.getContext('2d');
        this.ctx.globalAlpha = .5;
    };
    ParticleDirective.prototype.ngAfterViewInit = function () {
        this.canvas = this.er.nativeElement;
        this.reset();
        this.renderer2.appendChild(this.canvas, this.container);
        var overlay = this.renderer2.createElement('div');
        this.domRenderer.css(overlay, {
            'position': 'absolute',
            'left': '0',
            'top': 0,
            'width': '100%',
            'height': '100%'
        });
        this.renderer2.appendChild(this.canvas, overlay);
        this.addParticle();
        this.drawParticle();
    };
    ParticleDirective.prototype.drawBackground = function () {
        this.ctx.save();
        var _a = [this.container.width, this.container.height], width = _a[0], height = _a[1];
        var linearGradient = this.ctx.createLinearGradient(0, 0, width, height);
        linearGradient.addColorStop(0, '#115d8e');
        linearGradient.addColorStop(1, '#347eff');
        this.ctx.fillStyle = linearGradient;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.restore();
    };
    ParticleDirective.prototype.addParticle = function () {
        this.particles = [];
        for (var i = 0; i < this.total; i++) {
            var data = this.setParticleData();
            var vx = parseFloat((this.getRandom(-5, 5) / 20).toFixed(2));
            var vy = parseFloat((this.getRandom(-5, 5) / 20).toFixed(2));
            var arr = [data.x, data.y, data.r, vx, vy, this.selectColor()];
            var particle = new (partical_1.Particle.bind.apply(partical_1.Particle, [void 0].concat(arr)))();
            this.particles.push(particle);
        }
    };
    ParticleDirective.prototype.reset = function () {
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        var _a = { w: this.width, h: this.height }, w = _a.w, h = _a.h;
        this.container.width = w;
        this.container.height = h;
        this.addParticle();
    };
    ParticleDirective.prototype.selectColor = function () {
        if (Array.isArray(this.color)) {
            return this.color[Math.floor(Math.random() * this.color.length)];
        }
        return this.defaultColor;
    };
    ParticleDirective.prototype.setParticleData = function () {
        return {
            x: Math.floor(Math.random() * this.width),
            y: Math.floor(Math.random() * this.height),
            r: Math.floor(this.size / 2)
        };
    };
    ParticleDirective.prototype.getRandom = function (max, min) {
        if (min === void 0) { min = 0; }
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    ParticleDirective.prototype.drawParticle = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackground();
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            this.ctx.beginPath();
            this.ctx.fillStyle = p['color'];
            if (this.isRunning) {
                this.checkInView(p);
                p['x'] += p['vx'];
                p['y'] += p['vy'];
            }
            this.ctx.arc(p['x'], p['y'], p['r'], 0, 2 * Math.PI, true);
            this.ctx.closePath();
            this.ctx.fill();
            for (var _b = 0, _c = this.particles; _b < _c.length; _b++) {
                var p2 = _c[_b];
                var x = p['x'] - p2['x'];
                var y = p['y'] - p2['y'];
                var dist = Math.sqrt(x * x + y * y);
                if (p2 !== p && dist < this.distance) {
                    this.drawLine(p, p2);
                }
            }
        }
        this.isRunning = true;
        if (window.requestAnimationFrame) {
            requestAnimationFrame(function () {
                _this.drawParticle();
            });
        }
    };
    ParticleDirective.prototype.drawLine = function (p1, p2) {
        this.ctx.strokeStyle = this.lineColor(p1, p2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1['x'], p1['y']);
        this.ctx.lineTo(p2['x'], p2['y']);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    ParticleDirective.prototype.lineColor = function (p1, p2) {
        var linear = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        linear.addColorStop(0, p1.color);
        linear.addColorStop(1, p2.color);
        return linear;
    };
    ParticleDirective.prototype.checkInView = function (p) {
        if (p['x'] <= 0 || p['x'] >= this.width) {
            p['vx'] = -p['vx'];
        }
        if (p['y'] <= 0 || p['y'] >= this.height) {
            p['vy'] = -p['vy'];
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticleDirective.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticleDirective.prototype, "distance", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticleDirective.prototype, "color", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticleDirective.prototype, "total", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ParticleDirective.prototype, "backgroundColor", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ParticleDirective.prototype, "onResize", null);
    ParticleDirective = __decorate([
        core_1.Directive({
            selector: '[fParticle]',
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            dom_1.DomRenderer,
            core_1.Renderer2])
    ], ParticleDirective);
    return ParticleDirective;
}());
exports.ParticleDirective = ParticleDirective;
var ParticleModule = (function () {
    function ParticleModule() {
    }
    ParticleModule = __decorate([
        core_1.NgModule({
            declarations: [ParticleDirective],
            exports: [ParticleDirective]
        })
    ], ParticleModule);
    return ParticleModule;
}());
exports.ParticleModule = ParticleModule;
//# sourceMappingURL=particle.directive.js.map
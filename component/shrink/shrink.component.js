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
var ShrinkItemComponent = (function () {
    function ShrinkItemComponent() {
    }
    ShrinkItemComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ShrinkItemComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShrinkItemComponent.prototype, "itemStyle", void 0);
    ShrinkItemComponent = __decorate([
        core_1.Component({
            selector: 'free-shrink-item',
            template: "\n    <a class=\"suspend-item\" [ngStyle]=\"itemStyle\">\n      <i class=\"fa {{'fa-' + icon}}\"></i>\n    </a>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ShrinkItemComponent);
    return ShrinkItemComponent;
}());
exports.ShrinkItemComponent = ShrinkItemComponent;
var ShrinkComponent = (function () {
    function ShrinkComponent(domRenderer, renderer2) {
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.type = 'horizontal';
        this.direction = 'lt';
    }
    ShrinkComponent.prototype.onMouseover = function () {
        if (this.hover) {
            this.toggle();
        }
    };
    ;
    ShrinkComponent.prototype.onMouseout = function () {
        if (this.hover) {
            this.toggle();
        }
    };
    ;
    ShrinkComponent.prototype.ngOnInit = function () {
        this.reverse = false;
        this.distance = 10;
        this.angle = 60;
    };
    ShrinkComponent.prototype.ngAfterViewInit = function () {
        this.btn = this._btn.nativeElement;
        this.container = this._container.nativeElement;
        this._items = this.items.toArray();
        this.itemWidth = this.btn.offsetWidth;
        var type = this.type.split('-');
        if (type[1] && type[1] === 'reverse') {
            this.type = type[0];
            this.reverse = true;
        }
        this.renderer2.addClass(this.container, "suspend-" + this.type);
    };
    ShrinkComponent.prototype.toggle = function () {
        if (this.expanded) {
            this.close();
        }
        else {
            this.open();
        }
    };
    ShrinkComponent.prototype.open = function () {
        var op = this.reverse ? '-' : '';
        this.domRenderer.addClass(this.btn, 'burge-open');
        switch (this.type) {
            case 'horizontal':
                for (var i = 0; i < this._items.length; i++) {
                    var x = op + ((this.itemWidth + this.distance) * (i + 1)) + 'px';
                    this._items[i].itemStyle = { 'opacity': 1, 'left': x };
                }
                break;
            case 'vertical':
                for (var i = 0; i < this._items.length; i++) {
                    var x = op + ((this.itemWidth + this.distance) * (i + 1)) + 'px';
                    this._items[i].itemStyle = { 'opacity': 1, 'top': x };
                }
                break;
            case 'circle':
                var r = this.itemWidth + this.distance;
                var dir = {
                    lt: -180,
                    lb: 90,
                    rt: -90,
                    rb: 0
                };
                var rotation = dir[this.direction];
                this.delay = parseInt(this.delay, 10);
                for (var i = 0; i < this._items.length; i++) {
                    this.anim(i, rotation, r);
                }
                break;
        }
        this.expanded = true;
        this.domRenderer.addClass(this.container, 'suspend-expanded');
    };
    ShrinkComponent.prototype.anim = function (i, rotation, r) {
        // -180/左上(lt)、 90/左下(lb)、-90/右上(rt)、0/右下(rb)
        var angle = (this.angle * i - rotation) / 180 * Math.PI;
        var x = Math.sin(angle) * r;
        var y = Math.cos(angle) * r;
        x = parseFloat(x.toFixed(3));
        y = parseFloat(y.toFixed(3));
        if (this.delay) {
            this._items[i].itemStyle = { 'transition-delay': this.delay * i + 'ms' };
        }
        var xy = 'translate(' + x + 'px,' + y + 'px)';
        this._items[i].itemStyle = { 'opacity': 1, 'top': 0, 'transform': xy };
    };
    ShrinkComponent.prototype.close = function () {
        switch (this.type) {
            case 'horizontal':
            case 'vertical':
            case 'circle':
                for (var i = 0; i < this._items.length; i++) {
                    this._items[i].itemStyle = { 'left': '0px', 'opacity': 0,
                        'top': '0px', 'transform': 'translate(0,0)' };
                }
                break;
        }
        this.expanded = false;
        this.domRenderer.removeClass(this.btn, 'burge-open');
        this.domRenderer.removeClass(this.container, 'suspend-expanded');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ShrinkComponent.prototype, "reverse", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShrinkComponent.prototype, "menus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShrinkComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShrinkComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ShrinkComponent.prototype, "hover", void 0);
    __decorate([
        core_1.ViewChild('btn'),
        __metadata("design:type", core_1.ElementRef)
    ], ShrinkComponent.prototype, "_btn", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ShrinkComponent.prototype, "_container", void 0);
    __decorate([
        core_1.ViewChildren(ShrinkItemComponent),
        __metadata("design:type", core_1.QueryList)
    ], ShrinkComponent.prototype, "items", void 0);
    __decorate([
        core_1.HostListener('mouseover'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ShrinkComponent.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ShrinkComponent.prototype, "onMouseout", null);
    ShrinkComponent = __decorate([
        core_1.Component({
            selector: 'free-shrink',
            template: "\n    <div class=\"suspend\" #container>\n\t\t\t\t<span class=\"suspend-btn burge burge-line\" #btn (click)=\"!hover && toggle()\">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t</span>\n      <free-shrink-item *ngFor=\"let item of menus\" [icon]=\"item.icon\"></free-shrink-item>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.Renderer2])
    ], ShrinkComponent);
    return ShrinkComponent;
}());
exports.ShrinkComponent = ShrinkComponent;
var ShrinkModule = (function () {
    function ShrinkModule() {
    }
    ShrinkModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ShrinkItemComponent, ShrinkComponent],
            exports: [ShrinkItemComponent, ShrinkComponent]
        })
    ], ShrinkModule);
    return ShrinkModule;
}());
exports.ShrinkModule = ShrinkModule;
//# sourceMappingURL=shrink.component.js.map
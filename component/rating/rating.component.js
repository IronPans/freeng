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
var RatingComponent = (function () {
    function RatingComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.stars = 5;
        this.type = 'star';
    }
    RatingComponent.prototype.ngOnInit = function () {
        this.starArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starArray.push(i);
        }
    };
    RatingComponent.prototype.ngAfterViewInit = function () {
        if (this.theme) {
            this.renderer2.addClass(this.container.nativeElement, "free-" + this.theme);
        }
    };
    RatingComponent.prototype.onClick = function ($event, value) {
        if (!this.readonly) {
            this.value = value + 1;
            this.onChange.emit(this.value);
        }
    };
    RatingComponent.prototype.onMouseover = function ($event, value) {
        if (this.hover && !this.readonly) {
            this.value = value + 1;
            this.currentValue = this.value;
        }
    };
    RatingComponent.prototype.onMouseout = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "stars", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RatingComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RatingComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RatingComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RatingComponent.prototype, "hover", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], RatingComponent.prototype, "container", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RatingComponent.prototype, "onChange", void 0);
    RatingComponent = __decorate([
        core_1.Component({
            selector: 'free-rating',
            template: "\n    <div class=\"free-rating\" #container>\n      <span class=\"free-rating-item\" *ngFor=\"let star of starArray;let i = index\" (mouseover)=\"onMouseover($event, i)\"\n          (click)=\"onClick($event, i)\">\n        <i class=\"fa\" [ngClass]=\"{'fa-star-o': (!value || i >= value), 'fa-star': (i < value)}\"></i>\n      </span>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], RatingComponent);
    return RatingComponent;
}());
exports.RatingComponent = RatingComponent;
var RatingModule = (function () {
    function RatingModule() {
    }
    RatingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [RatingComponent],
            exports: [RatingComponent]
        })
    ], RatingModule);
    return RatingModule;
}());
exports.RatingModule = RatingModule;
//# sourceMappingURL=rating.component.js.map
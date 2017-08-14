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
var ProgressComponent = (function () {
    function ProgressComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    ProgressComponent.prototype.ngOnInit = function () { };
    ProgressComponent.prototype.ngAfterViewInit = function () {
        this._container = this.container.nativeElement;
        this._bar = this.bar.nativeElement;
        if (this.move) {
            this.renderer2.addClass(this._container, 'free-active');
        }
        if (this.striped) {
            this.renderer2.addClass(this._container, 'free-progress-striped');
        }
        if (this.value) {
            this.renderer2.setStyle(this._bar, 'width', this.value);
        }
        if (this.theme) {
            this.renderer2.addClass(this._container, 'free-' + this.theme);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "move", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "striped", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProgressComponent.prototype, "percent", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ProgressComponent.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild('bar'),
        __metadata("design:type", core_1.ElementRef)
    ], ProgressComponent.prototype, "bar", void 0);
    ProgressComponent = __decorate([
        core_1.Component({
            selector: 'free-progress',
            template: "\n    <div class=\"free-progress\" #container>\n      <div class=\"free-progress-bar\" #bar>\n        <ng-container *ngIf=\"percent\">{{value}}</ng-container>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], ProgressComponent);
    return ProgressComponent;
}());
exports.ProgressComponent = ProgressComponent;
var ProgressModule = (function () {
    function ProgressModule() {
    }
    ProgressModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ProgressComponent],
            exports: [ProgressComponent]
        })
    ], ProgressModule);
    return ProgressModule;
}());
exports.ProgressModule = ProgressModule;
//# sourceMappingURL=progress.component.js.map
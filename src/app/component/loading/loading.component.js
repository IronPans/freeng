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
var LoadingComponent = (function () {
    function LoadingComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    LoadingComponent.prototype.ngOnInit = function () { };
    LoadingComponent.prototype.ngAfterViewInit = function () {
        if (this.color) {
            this.renderer2.addClass(this.container.nativeElement, "free-" + this.color);
        }
    };
    return LoadingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LoadingComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LoadingComponent.prototype, "color", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], LoadingComponent.prototype, "container", void 0);
LoadingComponent = __decorate([
    core_1.Component({
        selector: 'free-loading',
        templateUrl: './loading.component.html',
        styleUrls: ['./loading.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;
var LoadingModule = (function () {
    function LoadingModule() {
    }
    return LoadingModule;
}());
LoadingModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [LoadingComponent],
        exports: [LoadingComponent]
    })
], LoadingModule);
exports.LoadingModule = LoadingModule;
//# sourceMappingURL=loading.component.js.map
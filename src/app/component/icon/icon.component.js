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
var IconComponent = (function () {
    function IconComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    IconComponent.prototype.ngOnInit = function () {
        this.iconClass = {
            'fa-spin': this.spin
        };
    };
    IconComponent.prototype.ngAfterViewInit = function () {
        var _container = this.container.nativeElement;
        if (this.size) {
            this.renderer2.addClass(_container, 'fa-' + this.size + 'x');
        }
    };
    return IconComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], IconComponent.prototype, "spin", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], IconComponent.prototype, "size", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], IconComponent.prototype, "container", void 0);
IconComponent = __decorate([
    core_1.Component({
        selector: 'free-icon',
        template: "<i #container class=\"free-icon fa fa-{{icon}}\" [ngClass]=\"iconClass\"></i>",
        styleUrls: ['./icon.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], IconComponent);
exports.IconComponent = IconComponent;
var IconModule = (function () {
    function IconModule() {
    }
    return IconModule;
}());
IconModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [IconComponent],
        exports: [IconComponent]
    })
], IconModule);
exports.IconModule = IconModule;
//# sourceMappingURL=icon.component.js.map
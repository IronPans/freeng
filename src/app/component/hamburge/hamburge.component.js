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
var HamburgeComponent = (function () {
    function HamburgeComponent(renderer2) {
        this.renderer2 = renderer2;
    }
    HamburgeComponent.prototype.onClick = function () {
        console.log(123);
        var con = this.container.nativeElement;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.renderer2.addClass(con, 'hamburge-open');
        }
        else {
            this.renderer2.removeClass(con, 'hamburge-open');
        }
    };
    ;
    HamburgeComponent.prototype.ngOnInit = function () { };
    return HamburgeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HamburgeComponent.prototype, "type", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], HamburgeComponent.prototype, "container", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HamburgeComponent.prototype, "onClick", null);
HamburgeComponent = __decorate([
    core_1.Component({
        selector: 'free-hamburge',
        template: "\n    <i class=\"hamburge hamburge-{{type}}\" #container>\n      <span></span>\n      <span></span>\n      <span></span>\n    </i>\n  ",
        styleUrls: ['./hamburge.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], HamburgeComponent);
exports.HamburgeComponent = HamburgeComponent;
var HamburgeModule = (function () {
    function HamburgeModule() {
    }
    return HamburgeModule;
}());
HamburgeModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [HamburgeComponent],
        exports: [HamburgeComponent]
    })
], HamburgeModule);
exports.HamburgeModule = HamburgeModule;
//# sourceMappingURL=hamburge.component.js.map
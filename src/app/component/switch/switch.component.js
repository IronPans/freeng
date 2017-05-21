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
var SwitchComponent = (function () {
    function SwitchComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
    }
    SwitchComponent.prototype.ngOnInit = function () {
    };
    SwitchComponent.prototype.ngAfterViewInit = function () {
        var _container = this.container.nativeElement;
        if (this.type) {
            this.renderer2.addClass(_container, 'free-switch-' + this.type);
        }
        if (this.color) {
            this.renderer2.addClass(_container, 'free-switch-' + this.color);
        }
    };
    SwitchComponent.prototype.inputChange = function (event) {
        this.onChange.emit(event);
    };
    return SwitchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SwitchComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SwitchComponent.prototype, "checked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SwitchComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SwitchComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SwitchComponent.prototype, "color", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SwitchComponent.prototype, "onChange", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], SwitchComponent.prototype, "container", void 0);
SwitchComponent = __decorate([
    core_1.Component({
        selector: 'free-switch',
        template: "\n    <label class=\"free-switch\" #container>\n      <input type=\"checkbox\" [disabled]=\"disabled\" [checked]=\"checked\" (change)=\"inputChange($event)\">\n      <div class=\"free-switch-media\">\n        <span class=\"switch-label\"></span>\n      </div>\n      <div class=\"free-switch-inner\">{{label}}</div>\n    </label>",
        styleUrls: ['./switch.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], SwitchComponent);
exports.SwitchComponent = SwitchComponent;
var SwitchModule = (function () {
    function SwitchModule() {
    }
    return SwitchModule;
}());
SwitchModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [SwitchComponent],
        exports: [SwitchComponent]
    })
], SwitchModule);
exports.SwitchModule = SwitchModule;
//# sourceMappingURL=switch.component.js.map
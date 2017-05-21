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
var CheckboxComponent = (function () {
    function CheckboxComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onClick = new core_1.EventEmitter();
    }
    CheckboxComponent.prototype.ngOnInit = function () {
        if (!this.checked) {
            this.checked = false;
        }
    };
    CheckboxComponent.prototype.ngAfterViewInit = function () {
        if (this.color) {
            this.renderer2.addClass(this.container.nativeElement, "free-" + this.color);
        }
    };
    CheckboxComponent.prototype.onChange = function (e) {
        if (!this.disabled) {
            e = e.target;
            this.checked = e.checked;
            this.onClick.emit({
                name: e.name,
                value: e.value,
                checked: e.checked
            });
        }
    };
    return CheckboxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "checked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "color", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CheckboxComponent.prototype, "onClick", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], CheckboxComponent.prototype, "container", void 0);
CheckboxComponent = __decorate([
    core_1.Component({
        selector: 'free-checkbox',
        template: "\n    <label class=\"free-checkbox\" #container>\n      <div class=\"free-checkbox-inner\">\n        <input type=\"checkbox\" value=\"{{value}}\"  [disabled]=\"disabled\"\n            [checked]=\"checked\" name=\"{{name}}\" (change)=\"onChange($event)\">\n        <div class=\"free-checkbox-ins\"></div>\n      </div>\n      <div class=\"free-checkbox-title\">{{label}}</div>\n    </label>\n    ",
        styleUrls: ['./checkbox.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], CheckboxComponent);
exports.CheckboxComponent = CheckboxComponent;
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    return CheckboxModule;
}());
CheckboxModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [CheckboxComponent],
        exports: [CheckboxComponent]
    })
], CheckboxModule);
exports.CheckboxModule = CheckboxModule;
//# sourceMappingURL=checkbox.component.js.map
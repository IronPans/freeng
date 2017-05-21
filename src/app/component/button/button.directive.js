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
/**
 * Created by root on 17-4-6.
 */
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ButtonDirective = (function () {
    function ButtonDirective(er, renderer2) {
        this.er = er;
        this.renderer2 = renderer2;
        // @Input() block: boolean;
        this.direction = 'left';
    }
    ButtonDirective.prototype.ngOnInit = function () {
        if (!this.color) {
            this.color = 'default';
        }
    };
    ButtonDirective.prototype.ngAfterViewInit = function () {
        this.button = this.er.nativeElement;
        this.renderer2.addClass(this.button, 'btn');
        this.renderer2.addClass(this.button, 'btn-' + this.color);
        if (this.size) {
            this.renderer2.addClass(this.button, "btn-" + this.size);
        }
        ;
        if (this.icon) {
            var icon = this.renderer2.createElement('i');
            this.renderer2.addClass(icon, 'fa');
            this.renderer2.addClass(icon, 'fa-' + this.icon);
            var firstChild = this.button.firstChild;
            var lastChild = this.button.lastChild;
            if (this.direction === 'left' && firstChild) {
                this.renderer2.insertBefore(this.button, icon, firstChild);
            }
            else {
                this.renderer2.appendChild(this.button, icon);
            }
            if (lastChild && lastChild !== icon) {
                this.renderer2.addClass(icon, 'free-btn-' + this.direction);
            }
        }
        ;
        if (this.circle) {
            this.renderer2.addClass(this.button, 'btn-circle');
        }
        // if (this.block) {
        //   this.renderer2.addClass(this.button, 'btn-block');
        // }
        if (this.round) {
            this.renderer2.addClass(this.button, 'btn-round');
        }
    };
    return ButtonDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonDirective.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonDirective.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ButtonDirective.prototype, "direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonDirective.prototype, "circle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ButtonDirective.prototype, "round", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonDirective.prototype, "size", void 0);
ButtonDirective = __decorate([
    core_1.Directive({
        selector: '[fButton]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2])
], ButtonDirective);
exports.ButtonDirective = ButtonDirective;
var BlockDirective = (function () {
    function BlockDirective(renderer2, er) {
        this.renderer2 = renderer2;
        this.er = er;
    }
    BlockDirective.prototype.ngAfterViewInit = function () {
        this.renderer2.addClass(this.er.nativeElement, 'btn-block');
    };
    return BlockDirective;
}());
BlockDirective = __decorate([
    core_1.Directive({
        selector: '[fButton][block]'
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        core_1.ElementRef])
], BlockDirective);
exports.BlockDirective = BlockDirective;
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent() {
    }
    return ButtonGroupComponent;
}());
ButtonGroupComponent = __decorate([
    core_1.Component({
        selector: 'free-button-group',
        template: '<div class="btn-group"><ng-content></ng-content></div>'
    })
], ButtonGroupComponent);
exports.ButtonGroupComponent = ButtonGroupComponent;
var ButtonModule = (function () {
    function ButtonModule() {
    }
    return ButtonModule;
}());
ButtonModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ButtonDirective, BlockDirective, ButtonGroupComponent],
        exports: [ButtonDirective, BlockDirective, ButtonGroupComponent]
    })
], ButtonModule);
exports.ButtonModule = ButtonModule;
//# sourceMappingURL=button.directive.js.map
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
var CardHeaderComponent = (function () {
    function CardHeaderComponent() {
    }
    CardHeaderComponent = __decorate([
        core_1.Component({
            selector: 'free-card-header',
            template: "\n    <div class=\"free-card-header\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], CardHeaderComponent);
    return CardHeaderComponent;
}());
exports.CardHeaderComponent = CardHeaderComponent;
var CardFooterComponent = (function () {
    function CardFooterComponent() {
    }
    CardFooterComponent = __decorate([
        core_1.Component({
            selector: 'free-card-footer',
            template: "\n    <div class=\"free-card-footer\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], CardFooterComponent);
    return CardFooterComponent;
}());
exports.CardFooterComponent = CardFooterComponent;
var CardMediaComponent = (function () {
    function CardMediaComponent() {
    }
    CardMediaComponent = __decorate([
        core_1.Component({
            selector: 'free-card-media',
            template: "\n    <div class=\"free-card-media\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], CardMediaComponent);
    return CardMediaComponent;
}());
exports.CardMediaComponent = CardMediaComponent;
var CardContentComponent = (function () {
    function CardContentComponent() {
    }
    CardContentComponent = __decorate([
        core_1.Component({
            selector: 'free-card-content',
            template: "\n    <div class=\"free-card-content\">\n      <ng-content></ng-content>\n    </div>\n  "
        })
    ], CardContentComponent);
    return CardContentComponent;
}());
exports.CardContentComponent = CardContentComponent;
var CardHeaderTextComponent = (function () {
    function CardHeaderTextComponent() {
    }
    CardHeaderTextComponent = __decorate([
        core_1.Component({
            selector: 'free-card-header-text',
            template: "<div class=\"free-card-header-text\"><ng-content></ng-content></div>"
        })
    ], CardHeaderTextComponent);
    return CardHeaderTextComponent;
}());
exports.CardHeaderTextComponent = CardHeaderTextComponent;
var CardComponent = (function () {
    function CardComponent() {
        this.cardClass = {};
    }
    CardComponent.prototype.ngOnInit = function () {
        this.cardClass = {
            'free-card-hover': this.hover
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CardComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CardComponent.prototype, "hover", void 0);
    CardComponent = __decorate([
        core_1.Component({
            selector: 'free-card',
            template: "\n    <div class=\"free-card\" [ngClass]=\"cardClass\">\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
var CardModule = (function () {
    function CardModule() {
    }
    CardModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [CardMediaComponent, CardHeaderTextComponent, CardContentComponent,
                CardHeaderComponent, CardFooterComponent, CardComponent],
            exports: [CardMediaComponent, CardHeaderTextComponent,
                CardContentComponent, CardHeaderComponent, CardFooterComponent, CardComponent]
        })
    ], CardModule);
    return CardModule;
}());
exports.CardModule = CardModule;
//# sourceMappingURL=card.component.js.map
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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var NotificationComponent = (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () {
    };
    return NotificationComponent;
}());
NotificationComponent = __decorate([
    core_1.Component({
        selector: 'free-notification',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.scss']
    }),
    __metadata("design:paramtypes", [])
], NotificationComponent);
exports.NotificationComponent = NotificationComponent;
var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
NotificationModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [NotificationComponent],
        exports: [NotificationComponent]
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.component.js.map
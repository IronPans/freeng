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
var ColumnComponent = (function () {
    function ColumnComponent() {
    }
    ColumnComponent.prototype.ngOnInit = function () {
    };
    ColumnComponent.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
        if (this.columns && typeof this.columns === 'object') {
            for (var name_1 in this.columns) {
                if (this.columns.hasOwnProperty(name_1)) {
                    this.addPrefix(this.container, name_1, this.columns[name_1]);
                }
            }
        }
    };
    ColumnComponent.prototype.addPrefix = function (element, attr, value) {
        var prefix = ['Webkit', 'Moz'];
        var uattr = attr.split('');
        uattr[0] = uattr[0].toUpperCase();
        uattr = uattr.join('');
        prefix.forEach(function (x) {
            element.style[x + uattr] = value;
        });
        element.style[attr] = value;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ColumnComponent.prototype, "columns", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ColumnComponent.prototype, "containerViewChild", void 0);
    ColumnComponent = __decorate([
        core_1.Component({
            selector: 'free-column',
            template: "\n    <div class=\"free-column\" #container>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ColumnComponent);
    return ColumnComponent;
}());
exports.ColumnComponent = ColumnComponent;
var ColumnModule = (function () {
    function ColumnModule() {
    }
    ColumnModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ColumnComponent],
            exports: [ColumnComponent]
        })
    ], ColumnModule);
    return ColumnModule;
}());
exports.ColumnModule = ColumnModule;
//# sourceMappingURL=column.component.js.map
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
var ChipGroupComponent = (function () {
    function ChipGroupComponent() {
        this.chipsChange = new core_1.EventEmitter();
        this.chipClass = {};
        this.groups = [];
    }
    ChipGroupComponent.prototype.ngOnInit = function () {
        this.setChipClass();
    };
    ChipGroupComponent.prototype.setChipClass = function () {
        this.chipClass = {
            'free-chip-input': this.placeholder,
            'free-chip-focus': this.focus
        };
    };
    ChipGroupComponent.prototype.addGroup = function (value) {
        this.groups.push(value);
    };
    ChipGroupComponent.prototype.removeGroup = function (value) {
        var i = this.groups.length;
        while (i--) {
            if (this.groups[i] === value) {
                this.groups.splice(i, 1);
            }
        }
    };
    ChipGroupComponent.prototype.onFocus = function () {
        this.focus = !this.focus;
        this.setChipClass();
    };
    ChipGroupComponent.prototype.onEnter = function (event) {
        this.chips.push({
            value: event.target.value,
            delete: true
        });
    };
    return ChipGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChipGroupComponent.prototype, "chips", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChipGroupComponent.prototype, "chipsChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ChipGroupComponent.prototype, "placeholder", void 0);
ChipGroupComponent = __decorate([
    core_1.Component({
        selector: 'free-chip-group',
        template: "\n    <div class=\"free-chip-group\" [ngClass]=\"chipClass\">\n      <free-chip *ngFor=\"let chip of chips\" [value]=\"chip.value\" \n        [delete]=\"chip.delete\"></free-chip>\n      <input type=\"text\" *ngIf=\"placeholder\" placeholder=\"placeholder\"\n             (focus)=\"onFocus()\" (blur)=\"onFocus()\" (keyup.enter)=\"onEnter($event)\">\n    </div>\n  ",
        styleUrls: ['./chip.component.scss']
    }),
    __metadata("design:paramtypes", [])
], ChipGroupComponent);
exports.ChipGroupComponent = ChipGroupComponent;
var ChipComponent = (function () {
    function ChipComponent(renderer2, er, group) {
        this.renderer2 = renderer2;
        this.er = er;
        this.group = group;
    }
    ChipComponent.prototype.ngOnInit = function () {
        if (this.group && this.group.chips.indexOf(this.value) > 0) {
            this.group.addGroup(this);
        }
    };
    ChipComponent.prototype.ngAfterViewInit = function () {
        if (this.delete) {
            this.renderer2.addClass(this.container.nativeElement, 'free-chip-delete');
        }
        else {
            this.renderer2.removeClass(this.container.nativeElement, 'free-chip-delete');
        }
    };
    ChipComponent.prototype.onDelete = function () {
        var chips = this.group.groups;
        var index = chips.indexOf(this);
        if (index >= 0) {
            chips.splice(index, 1);
        }
        console.log(index);
    };
    ChipComponent.prototype.ngOnDestroy = function () {
        if (this.group) {
            this.group.removeGroup(this);
        }
    };
    return ChipComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChipComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ChipComponent.prototype, "delete", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], ChipComponent.prototype, "container", void 0);
ChipComponent = __decorate([
    core_1.Component({
        selector: 'free-chip',
        template: "\n    <div class=\"free-chip\" tabindex=\"0\" #container>\n      {{value}}  <i class=\"fa fa-times-circle delete-btn\" *ngIf=\"delete\" (click)=\"onDelete()\"></i>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        core_1.ElementRef,
        ChipGroupComponent])
], ChipComponent);
exports.ChipComponent = ChipComponent;
var ChipModule = (function () {
    function ChipModule() {
    }
    return ChipModule;
}());
ChipModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ChipComponent, ChipGroupComponent],
        exports: [ChipComponent, ChipGroupComponent]
    })
], ChipModule);
exports.ChipModule = ChipModule;
//# sourceMappingURL=chip.component.js.map
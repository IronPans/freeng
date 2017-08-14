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
        this.onChange = new core_1.EventEmitter();
        this.chipClass = {};
        this.groups = [];
        this.value = [];
    }
    Object.defineProperty(ChipGroupComponent.prototype, "chips", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = [];
            var _loop_1 = function (v) {
                var isExited = this_1.value.find(function (elem) {
                    return elem.value === v.value;
                });
                if (!isExited) {
                    this_1.value.push(v);
                }
            };
            var this_1 = this;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var v = value_1[_i];
                _loop_1(v);
            }
        },
        enumerable: true,
        configurable: true
    });
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
        if (this.placeholder) {
            this.onChange.emit(this.value);
        }
    };
    ChipGroupComponent.prototype.removeGroup = function (value) {
        var index = this.value.findIndex(function (elem) {
            return elem.value === value.value;
        });
        if (index !== -1) {
            this.groups.splice(index, 1);
            this.value.splice(index, 1);
            this.onChange.emit(this.value);
        }
    };
    ChipGroupComponent.prototype.onFocus = function () {
        this.focus = !this.focus;
        this.setChipClass();
    };
    ChipGroupComponent.prototype.onEnter = function (event) {
        var value = event.target.value.trim();
        if (value) {
            this.chips.push({
                value: value,
                delete: true
            });
            this.value.push(value);
            this.chips = this.chips.slice();
            event.target.value = '';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ChipGroupComponent.prototype, "chips", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChipGroupComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChipGroupComponent.prototype, "placeholder", void 0);
    ChipGroupComponent = __decorate([
        core_1.Component({
            selector: 'free-chip-group',
            template: "\n    <div class=\"free-chip-group\" [ngClass]=\"chipClass\">\n      <free-chip *ngFor=\"let chip of value\" [value]=\"chip.value\"\n        [delete]=\"chip.delete\"></free-chip>\n      <input spellcheck=\"false\" type=\"text\" *ngIf=\"placeholder\" placeholder=\"placeholder\"\n             (focus)=\"onFocus()\" (blur)=\"onFocus()\" (keyup.enter)=\"onEnter($event)\">\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ChipGroupComponent);
    return ChipGroupComponent;
}());
exports.ChipGroupComponent = ChipGroupComponent;
var ChipComponent = (function () {
    function ChipComponent(renderer2, group) {
        this.renderer2 = renderer2;
        this.group = group;
    }
    ChipComponent.prototype.ngOnInit = function () {
        if (this.group) {
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
        if (this.group) {
            this.group.removeGroup(this);
        }
    };
    ChipComponent.prototype.ngOnDestroy = function () {
        if (this.group) {
            this.group.removeGroup(this);
        }
    };
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
            ChipGroupComponent])
    ], ChipComponent);
    return ChipComponent;
}());
exports.ChipComponent = ChipComponent;
var ChipModule = (function () {
    function ChipModule() {
    }
    ChipModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ChipComponent, ChipGroupComponent],
            exports: [ChipComponent, ChipGroupComponent]
        })
    ], ChipModule);
    return ChipModule;
}());
exports.ChipModule = ChipModule;
//# sourceMappingURL=chip.component.js.map
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
var animations_1 = require("@angular/animations");
var SelectComponent = (function () {
    function SelectComponent(renderer2) {
        this.renderer2 = renderer2;
        this.items = [];
        this.selectedChange = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.activeState = 'inactive';
    }
    Object.defineProperty(SelectComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        this._menu = this.menu.nativeElement;
        if (this.placeholder) {
            this.value = this.placeholder;
        }
        if (this.selected) {
            this.value = this.selected.label;
        }
    };
    SelectComponent.prototype.addGroup = function (value) {
        this.items.push(value);
    };
    SelectComponent.prototype.onDocumentClickListener = function () {
        var _this = this;
        if (!this.bindDocumentClickListener) {
            this.bindDocumentClickListener = this.renderer2.listen('body', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.close();
                }
                _this.itemClick = false;
                _this.selfClick = false;
            });
        }
    };
    SelectComponent.prototype.offDocumentClickListener = function () {
        if (this.bindDocumentClickListener) {
            this.bindDocumentClickListener();
            this.bindDocumentClickListener = null;
        }
    };
    SelectComponent.prototype.onClick = function () {
        if (!this.editable) {
            this.open();
        }
    };
    SelectComponent.prototype.open = function () {
        this.selfClick = true;
        this.activeState = 'active';
        this.opened = true;
        this.onDocumentClickListener();
    };
    SelectComponent.prototype.close = function () {
        this.opened = false;
        this.selfClick = false;
        this.activeState = 'inactive';
        this.offDocumentClickListener();
    };
    SelectComponent.prototype.transitionStart = function () {
        this.renderer2.setStyle(this._menu, 'display', 'block');
    };
    SelectComponent.prototype.transitionEnd = function () {
        if (!this.opened) {
            this.renderer2.setStyle(this._menu, 'display', 'none');
        }
    };
    SelectComponent.prototype.iClick = function ($event) {
        this.itemClick = $event;
        this.selected = $event;
        this.value = $event.label;
        this.onChange.emit($event);
        this.close();
    };
    SelectComponent.prototype.setSelected = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item['selected'] = false;
        }
    };
    return SelectComponent;
}());
__decorate([
    core_1.ViewChild('menu'),
    __metadata("design:type", core_1.ElementRef)
], SelectComponent.prototype, "menu", void 0);
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", core_1.ElementRef)
], SelectComponent.prototype, "input", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "editable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "filter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SelectComponent.prototype, "selectedChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SelectComponent.prototype, "onChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SelectComponent.prototype, "options", null);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'free-select',
        template: "\n    <div class=\"free-select\">\n      <div class=\"free-select-input\">\n        <label (click)=\"onClick()\">{{value}}</label>\n      </div>\n      <div #menu class=\"free-select-menu\" [@selectState]=\"activeState\"\n          (@selectState.start)=\"transitionStart()\" (@selectState.done)=\"transitionEnd()\">\n          <div class=\"free-select-filter\" *ngIf=\"filter\"></div>\n          <div class=\"free-select-wrapper\">\n            <ul>\n              <free-select-item *ngFor=\"let option of options\" (onClick)=\"iClick($event)\" \n                [selected]=\"option == selected\"\n                                [option]=\"option\"></free-select-item>\n            </ul>\n          </div>\n      </div>\n    </div>\n  ",
        styleUrls: ['./select.component.scss'],
        animations: [
            animations_1.trigger('selectState', [
                animations_1.state('active', animations_1.style({
                    opacity: 1
                })),
                animations_1.state('inactive', animations_1.style({
                    opacity: 0
                })),
                animations_1.transition('active <=> inactive', animations_1.animate('.4s ease'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], SelectComponent);
exports.SelectComponent = SelectComponent;
var SelectItemComponent = (function () {
    function SelectItemComponent(selector) {
        this.onClick = new core_1.EventEmitter();
        this.selector = selector;
    }
    SelectItemComponent.prototype.ngOnInit = function () {
        this.selector.addGroup(this);
        this.setActive();
    };
    SelectItemComponent.prototype.setActive = function () {
        if (this.selected) {
            this.selector.setSelected();
        }
    };
    SelectItemComponent.prototype.itemClick = function () {
        this.onClick.emit(this.option);
        this.selector.setSelected();
        this.selected = true;
    };
    return SelectItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectItemComponent.prototype, "option", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectItemComponent.prototype, "selected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SelectItemComponent.prototype, "onClick", void 0);
SelectItemComponent = __decorate([
    core_1.Component({
        selector: 'free-select-item',
        template: "\n    <li class=\"free-select-item\" [class.free-select-active]=\"this.selected\" (click)=\"itemClick()\">\n      <div class=\"free-select-item-content\">\n        <span>{{option.label}}</span>\n      </div> \n    </li>\n  "
    }),
    __metadata("design:paramtypes", [SelectComponent])
], SelectItemComponent);
exports.SelectItemComponent = SelectItemComponent;
var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
SelectModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [SelectComponent, SelectItemComponent],
        exports: [SelectComponent, SelectItemComponent]
    })
], SelectModule);
exports.SelectModule = SelectModule;
//# sourceMappingURL=select.component.js.map
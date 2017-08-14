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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var util_1 = require("../common/util");
var dom_1 = require("../common/dom");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CascaderComponent; }),
    multi: true
};
var CascaderMenuComponent = (function () {
    function CascaderMenuComponent(cascaderComponent) {
        this.cascaderComponent = cascaderComponent;
        this.onItemClick = new core_1.EventEmitter();
    }
    Object.defineProperty(CascaderMenuComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndex = value;
            this.setIndex();
        },
        enumerable: true,
        configurable: true
    });
    CascaderMenuComponent.prototype.ngAfterViewInit = function () {
        this.setIndex();
    };
    CascaderMenuComponent.prototype.setIndex = function () {
        if (typeof this.selectedIndex !== 'undefined') {
            this.selected = this.options[this._selectedIndex];
        }
    };
    CascaderMenuComponent.prototype.scrollTo = function () {
        if (this.options) {
            this.scroll = this.scrollViewChild.nativeElement;
            this.scroll.scrollTop = this.scroll.scrollHeight / this.options.length * this._selectedIndex;
        }
    };
    CascaderMenuComponent.prototype.itemClick = function (event, option, index) {
        this.selected = option;
        this._selectedIndex = index;
        this.onItemClick.emit({
            index: index,
            order: this.order
        });
        if (this.order === this.cascaderComponent.lastOrder - 1) {
            this.cascaderComponent.getValue();
            this.cascaderComponent.close();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CascaderMenuComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CascaderMenuComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CascaderMenuComponent.prototype, "order", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CascaderMenuComponent.prototype, "index", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CascaderMenuComponent.prototype, "onItemClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CascaderMenuComponent.prototype, "selectedIndex", null);
    __decorate([
        core_1.ViewChild('scroll'),
        __metadata("design:type", core_1.ElementRef)
    ], CascaderMenuComponent.prototype, "scrollViewChild", void 0);
    CascaderMenuComponent = __decorate([
        core_1.Component({
            selector: 'free-cascader-menu',
            template: "\n    <div class=\"free-cascader-menu free-iscroll\" #scroll>\n      <ul>\n        <free-cascader-item (onClick)=\"itemClick($event, option, i)\" [option]=\"option\"\n                *ngFor=\"let option of options; index as i\"\n                [selected]=\"option == selected\" [class.free-item-expand]=\"option.children\">\n        </free-cascader-item>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return CascaderComponent; }))),
        __metadata("design:paramtypes", [CascaderComponent])
    ], CascaderMenuComponent);
    return CascaderMenuComponent;
}());
exports.CascaderMenuComponent = CascaderMenuComponent;
var CascaderComponent = (function () {
    function CascaderComponent(renderer2, objectUtils, domRenderer, _componentFactoryResolver) {
        this.renderer2 = renderer2;
        this.objectUtils = objectUtils;
        this.domRenderer = domRenderer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onTouchedChange = function () { };
        this.activeState = 'inactive';
        this.order = 1;
        this.componentRef = [];
        this.selectedIndex = [];
        this.options = [];
        this.separator = '/';
    }
    Object.defineProperty(CascaderComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this.reset();
            this._options = value;
            this.setOption(value);
        },
        enumerable: true,
        configurable: true
    });
    CascaderComponent.prototype.ngAfterViewInit = function () {
        this._menu = this.menu.nativeElement;
        this.container = this.containerViewChild.nativeElement;
        if (this.pholder) {
            this.label = this.pholder;
        }
        if (this.deploy) {
            this.domRenderer.addClass(this.container, 'free-cascader-deploy');
        }
    };
    CascaderComponent.prototype.writeValue = function (value) {
        if (value) {
            this.value = value;
        }
    };
    CascaderComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CascaderComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    CascaderComponent.prototype.createComponent = function (event, options) {
        var _this = this;
        if (!this.componentRef[event.order] && options.length > 0) {
            var componentFactory = this._componentFactoryResolver.resolveComponentFactory(CascaderMenuComponent);
            var componentRef = this.rootViewContainerRef.createComponent(componentFactory);
            var instance = componentRef.instance;
            instance.options = options;
            instance.order = this.order;
            instance.selectedIndex = event.index;
            instance.onItemClick.subscribe(function (e) {
                _this.onItemClick(e);
            });
            this.componentRef.push(componentRef);
            this.order++;
        }
        this.lastOrder = this.order;
    };
    CascaderComponent.prototype.onItemClick = function (event) {
        this.selectedIndex.length = event.order + 1;
        this.selectedIndex[event.order] = event.index;
        var options = this.getCascaderOption(event.order);
        event.index = null;
        this.createComponent(event, options);
        if (this.componentRef[event.order]) {
            if (options.length <= 0) {
                this.deleteItem(event.order);
            }
            else {
                this.componentRef[event.order].instance.options = options;
                this.clearView(event.order);
            }
        }
    };
    CascaderComponent.prototype.clearView = function (order) {
        var i = this.componentRef.length;
        if (i <= 1) {
            return;
        }
        while (i) {
            if (i > order + 1) {
                this.deleteItem(i);
            }
            i--;
        }
    };
    CascaderComponent.prototype.deleteItem = function (index) {
        this.componentRef.splice(index - 1, 1);
        this.rootViewContainerRef.remove(index);
        this.selectedIndex.splice(index - 1, 1);
        this.order--;
        this.lastOrder = this.order;
    };
    CascaderComponent.prototype.getCascaderOption = function (order) {
        var options = this.options[this.selectedIndex[0]].children;
        for (var i = 0; i < order; i++) {
            options = options[this.selectedIndex[i + 1]].children;
        }
        if (!options) {
            options = [];
        }
        return options;
    };
    CascaderComponent.prototype.getValue = function () {
        var label = [];
        var value = [];
        var options = this.options;
        var length = this.selectedIndex.length;
        for (var i = 0; i < length; i++) {
            var index = this.selectedIndex[i];
            var option = options[index];
            label.push(option.label);
            value.push(option.value);
            if (!option.children) {
                break;
            }
            options = option.children;
        }
        this.label = label.join(this.separator);
        this.value = value;
        if (this.isSet) {
            this.onChange.emit({
                value: value,
                label: this.label
            });
        }
    };
    CascaderComponent.prototype.setOption = function (value) {
        var _this = this;
        this.isSet = false;
        var options = value;
        var selectedValue = this.value;
        if (selectedValue && options && options.length > 0) {
            selectedValue.forEach(function (v, index) {
                options.forEach(function (option, i) {
                    var isEqual = _this.objectUtils.equals(option.value, v);
                    if (isEqual) {
                        _this.selectedIndex[index] = i;
                        options = options[i].children;
                        if (!options) {
                            options = [];
                        }
                    }
                });
            });
            this.firstIndex = this.selectedIndex[0];
            for (var i = 0; i < this.selectedIndex.length - 1; i++) {
                var option = this.getCascaderOption(i);
                this.createComponent({
                    order: i + 1,
                    index: this.selectedIndex[i + 1]
                }, option);
            }
            this.getValue();
        }
        this.isSet = true;
    };
    CascaderComponent.prototype.onMenuClick = function () {
        this.itemClick = true;
    };
    CascaderComponent.prototype.onDocumentClickListener = function () {
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
    CascaderComponent.prototype.offDocumentClickListener = function () {
        if (this.bindDocumentClickListener) {
            this.bindDocumentClickListener();
            this.bindDocumentClickListener = null;
        }
    };
    CascaderComponent.prototype.onClick = function () {
        if (!this.opened) {
            this.open();
        }
        else {
            this.close();
        }
    };
    CascaderComponent.prototype.open = function () {
        this.selfClick = true;
        this.activeState = 'active';
        this.opened = true;
        this.onDocumentClickListener();
    };
    CascaderComponent.prototype.close = function () {
        this.opened = false;
        this.selfClick = false;
        this.activeState = 'inactive';
        this.offDocumentClickListener();
    };
    CascaderComponent.prototype.transitionStart = function () {
        this.renderer2.setStyle(this._menu, 'display', 'block');
        this.rootMenuComponent.scrollTo();
        for (var _i = 0, _a = this.componentRef; _i < _a.length; _i++) {
            var com = _a[_i];
            com.instance.scrollTo();
        }
    };
    CascaderComponent.prototype.transitionEnd = function () {
        if (!this.opened) {
            this.renderer2.setStyle(this._menu, 'display', 'none');
        }
    };
    CascaderComponent.prototype.reset = function () {
        if (this.rootViewContainerRef) {
            this.rootViewContainerRef.clear();
        }
        for (var _i = 0, _a = this.componentRef; _i < _a.length; _i++) {
            var com = _a[_i];
            var instance = com.instance;
            instance.onItemClick.unsubscribe();
        }
        this.componentRef = [];
        this.selectedIndex = [];
        this.order = 1;
    };
    CascaderComponent.prototype.ngOnDestroy = function () {
        this.reset();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CascaderComponent.prototype, "pholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CascaderComponent.prototype, "separator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CascaderComponent.prototype, "deploy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CascaderComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('menu'),
        __metadata("design:type", core_1.ElementRef)
    ], CascaderComponent.prototype, "menu", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], CascaderComponent.prototype, "input", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], CascaderComponent.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('root', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], CascaderComponent.prototype, "rootViewContainerRef", void 0);
    __decorate([
        core_1.ViewChild(CascaderMenuComponent),
        __metadata("design:type", CascaderMenuComponent)
    ], CascaderComponent.prototype, "rootMenuComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CascaderComponent.prototype, "options", null);
    CascaderComponent = __decorate([
        core_1.Component({
            selector: 'free-cascader',
            template: "\n    <div class=\"free-cascader\" #container [class.free-cascader-menu-active]=\"activeState == 'active'\">\n      <div class=\"free-cascader-input\" (click)=\"onClick()\">\n        <label *ngIf=\"label\">{{label}}</label>\n        <label *ngIf=\"!label\">{{pholder}}</label>\n        <i class=\"fa fa-angle-down\"></i>\n      </div>\n      <div #menu class=\"free-cascader-menus\" [@cascaderState]=\"activeState\" (click)=\"onMenuClick()\"\n           (@cascaderState.start)=\"transitionStart()\" (@cascaderState.done)=\"transitionEnd()\">\n        <div class=\"free-cascader-wrapper\">\n          <free-cascader-menu [selectedIndex]=\"firstIndex\" [order]=\"0\" [options]=\"options\"\n                              #root (onItemClick)=\"onItemClick($event)\">\n          </free-cascader-menu>\n        </div>\n      </div>\n    </div>\n  ",
            animations: [
                animations_1.trigger('cascaderState', [
                    animations_1.state('active', animations_1.style({
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0)'
                    })),
                    animations_1.state('inactive', animations_1.style({
                        opacity: 0,
                        transform: 'translate3d(0, 80px, 0)'
                    })),
                    animations_1.transition('active <=> inactive', animations_1.animate('.4s cubic-bezier(.25,.8,.25,1)'))
                ])
            ],
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, util_1.ObjectUtils, dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            util_1.ObjectUtils,
            dom_1.DomRenderer,
            core_1.ComponentFactoryResolver])
    ], CascaderComponent);
    return CascaderComponent;
}());
exports.CascaderComponent = CascaderComponent;
var CascaderItemComponent = (function () {
    function CascaderItemComponent() {
        this.onClick = new core_1.EventEmitter();
    }
    CascaderItemComponent.prototype.itemClick = function () {
        this.onClick.emit(this.option);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CascaderItemComponent.prototype, "option", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CascaderItemComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CascaderItemComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CascaderItemComponent.prototype, "hover", void 0);
    CascaderItemComponent = __decorate([
        core_1.Component({
            selector: 'free-cascader-item',
            template: "\n    <li class=\"free-cascader-item\" [class.free-select-active]=\"selected\" title=\"{{option.label}}\"\n        (click)=\"itemClick()\">\n      <div class=\"free-cascader-item-content\">\n        <span>{{option.label}}</span>\n      </div>\n    </li>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], CascaderItemComponent);
    return CascaderItemComponent;
}());
exports.CascaderItemComponent = CascaderItemComponent;
var CascaderModule = (function () {
    function CascaderModule() {
    }
    CascaderModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [CascaderMenuComponent, CascaderComponent, CascaderItemComponent],
            exports: [CascaderComponent],
            entryComponents: [CascaderMenuComponent]
        })
    ], CascaderModule);
    return CascaderModule;
}());
exports.CascaderModule = CascaderModule;
//# sourceMappingURL=cascader.component.js.map
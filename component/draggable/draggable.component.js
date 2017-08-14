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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dom_1 = require("../common/dom");
var share_1 = require("../common/share");
var DraggableItemComponent = (function () {
    function DraggableItemComponent(draggableComponent, domRenderer, er, renderer2) {
        this.draggableComponent = draggableComponent;
        this.domRenderer = domRenderer;
        this.er = er;
        this.renderer2 = renderer2;
    }
    DraggableItemComponent.prototype.onMousedown = function (event) {
        var _this = this;
        if (!this.target) {
            this.isDown = true;
            this.startMousePoint = {
                x: event.pageX,
                y: event.pageY
            };
            this.createTarget();
            this.parentElement = this.draggableComponent.er.nativeElement;
            this.draggableRect = this.domRenderer.getRect(this.parentElement);
            this.documentMousemoveListener = this.renderer2.listen('document', 'mousemove', function (e) { return _this.onMousemove(e); });
            this.documentMouseleaveListener = this.renderer2.listen('document', 'mouseup', function () { return _this.onMouseup(); });
            this.draggableComponent.onDragStart.emit(this.dragData);
        }
    };
    DraggableItemComponent.prototype.ngAfterViewInit = function () {
        this.selfElem = this.er.nativeElement;
        this.draggableComponent.addItem(this, this.selfElem.firstElementChild);
    };
    DraggableItemComponent.prototype.createTarget = function () {
        var rect = this.domRenderer.getRect(this.selfElem);
        this.target = document.createElement('div');
        this.target.className = 'free-draggable-target';
        this.domRenderer.css(this.target, {
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px'
        });
        this.startTargetPoint = {
            top: rect.top,
            left: rect.left
        };
        this.target.appendChild(this.selfElem.cloneNode(true));
        document.body.appendChild(this.target);
    };
    DraggableItemComponent.prototype.createWillDropElement = function () {
        var _this = this;
        if (this.draggableComponent.draggable && !this.draggableComponent.dropTarget) {
            this.draggableComponent.group.forEach(function (item, key) {
                if (key !== _this.index) {
                    var elem = item.elem;
                    var rect = _this.domRenderer.getRect(elem);
                    if (_this.inRect(_this.targetRect, _this.draggableRect)) {
                        if (rect.top < _this.startTargetPoint.top
                            && rect.bottom > _this.startTargetPoint.top) {
                            if (!_this.willDropElement) {
                                _this.willDropElement = document.createElement('div');
                                var selfElem = _this.selfElem.firstElementChild.cloneNode(true);
                                _this.domRenderer.removeClass(selfElem, 'free-draggable-active');
                                _this.willDropElement.appendChild(selfElem);
                                _this.domRenderer.css(_this.willDropElement, {
                                    'position': 'fixed',
                                    'top': rect.top + rect.height + 'px',
                                    'left': rect.left + 'px',
                                    'border': '1px dashed #d9d9d9',
                                    'background': '#fff',
                                    'opacity': .8,
                                    'width': _this.domRenderer.getRect(_this.selfElem).width + 'px'
                                });
                                document.body.appendChild(_this.willDropElement);
                            }
                            var top_1 = parseFloat(_this.domRenderer.getStyle(elem, 'marginTop'));
                            var bottom = parseFloat(_this.domRenderer.getStyle(elem, 'marginBottom'));
                            _this.draggableComponent.dropIndex = key + 1;
                            _this.domRenderer.css(_this.willDropElement, {
                                'top': rect.top + rect.height + top_1 + 'px',
                                'left': rect.left + 'px'
                            });
                            var nextElem = _this.draggableComponent.group[_this.draggableComponent.dropIndex];
                            if (nextElem) {
                                nextElem = nextElem.elem.parentNode;
                                _this.removeOverlayElement();
                                _this.overlayElem = document.createElement('div');
                                _this.overlayElem.style.height = rect.height + top_1 + bottom + 'px';
                                nextElem.parentNode.insertBefore(_this.overlayElem, nextElem);
                            }
                        }
                    }
                    else {
                        _this.removeWillDropElement();
                    }
                }
            });
        }
    };
    DraggableItemComponent.prototype.removeWillDropElement = function () {
        if (!this.willDropElement) {
            return;
        }
        document.body.removeChild(this.willDropElement);
        this.willDropElement = null;
    };
    DraggableItemComponent.prototype.removeOverlayElement = function () {
        if (this.overlayElem && this.overlayElem.parentNode) {
            this.overlayElem.parentNode.removeChild(this.overlayElem);
            this.overlayElem = null;
        }
    };
    DraggableItemComponent.prototype.inRect = function (target, targetB) {
        return targetB.left < target.right && targetB.right > target.left
            && targetB.top < target.bottom && targetB.bottom > target.top;
    };
    DraggableItemComponent.prototype.onMousemove = function (event) {
        this.domRenderer.preventDefault(event);
        if (this.isDown) {
            this.startTargetPoint = {
                top: this.startTargetPoint.top + event.pageY - this.startMousePoint.y,
                left: this.startTargetPoint.left + event.pageX - this.startMousePoint.x
            };
            this.domRenderer.css(this.target, {
                top: this.startTargetPoint.top + 'px',
                left: this.startTargetPoint.left + 'px'
            });
            this.targetRect = this.domRenderer.getRect(this.target);
            this.createWillDropElement();
            this.startMousePoint = {
                x: event.pageX,
                y: event.pageY
            };
        }
    };
    DraggableItemComponent.prototype.onMouseup = function () {
        this.isDown = false;
        this.startMousePoint = {};
        this.startTargetPoint = {};
        var dropRect;
        var dropIndex = this.draggableComponent.dropIndex;
        this.dropElement = this.draggableComponent.dropElement;
        if (!this.draggableComponent.dropTarget && this.draggableComponent.draggable) {
            dropRect = this.domRenderer.getRect(this.parentElement);
            if (this.inRect(this.targetRect, dropRect)) {
                this.draggableComponent.dragItems.splice(dropIndex, 0, this.dragData);
                if (this.index > dropIndex) {
                    this.draggableComponent.dragItems.splice(this.index + 1, 1);
                }
                else {
                    this.draggableComponent.dragItems.splice(this.index, 1);
                }
            }
            this.draggableComponent.onDragEnd.emit(this.draggableComponent.dragItems);
        }
        if (this.dropElement) {
            this.targetRect = this.domRenderer.getRect(this.target);
            dropRect = this.domRenderer.getRect(this.dropElement);
            if (this.inRect(this.targetRect, dropRect)) {
                if (this.draggableComponent.dragEffect === 'move') {
                    this.draggableComponent.dragItems.splice(this.index, 1);
                }
                this.draggableComponent.onDragEnd.emit(this.dragData);
            }
        }
        this.removeWillDropElement();
        this.removeOverlayElement();
        this.draggableComponent.dropIndex = 0;
        document.body.removeChild(this.target);
        this.target = null;
        this.unbindDocumentListener();
    };
    DraggableItemComponent.prototype.unbindDocumentListener = function () {
        if (this.documentMouseleaveListener) {
            this.documentMouseleaveListener();
            this.documentMouseleaveListener = null;
        }
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    };
    DraggableItemComponent.prototype.ngOnDestroy = function () {
        this.unbindDocumentListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DraggableItemComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DraggableItemComponent.prototype, "dragData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DraggableItemComponent.prototype, "index", void 0);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DraggableItemComponent.prototype, "onMousedown", null);
    DraggableItemComponent = __decorate([
        core_1.Component({
            selector: 'free-draggable-item',
            template: "\n    <div class=\"free-draggable-item\" [class.free-draggable-active]=\"isDown\">\n      <ng-content></ng-content>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DraggableComponent; }))),
        __metadata("design:paramtypes", [DraggableComponent,
            dom_1.DomRenderer,
            core_1.ElementRef,
            core_1.Renderer2])
    ], DraggableItemComponent);
    return DraggableItemComponent;
}());
exports.DraggableItemComponent = DraggableItemComponent;
var DraggableComponent = (function () {
    function DraggableComponent(er) {
        this.er = er;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.dragItems = [];
        this.dragEffect = 'copy';
        this.group = [];
    }
    DraggableComponent.prototype.ngAfterViewInit = function () {
        if (this.dropTarget) {
            this.dropElement = this.dropTarget.nativeElement;
            if (!this.dropElement) {
                this.dropElement = this.dropTarget;
            }
        }
    };
    DraggableComponent.prototype.addItem = function (item, elem) {
        this.group.push({
            component: item,
            elem: elem
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DraggableComponent.prototype, "dropTarget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DraggableComponent.prototype, "dragItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DraggableComponent.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DraggableComponent.prototype, "dragEffect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DraggableComponent.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DraggableComponent.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], DraggableComponent.prototype, "templateRef", void 0);
    DraggableComponent = __decorate([
        core_1.Component({
            selector: 'free-draggable',
            template: "\n    <div class=\"free-draggable\">\n      <free-draggable-item *ngFor=\"let item of dragItems;index as i\" [dragData]=\"item\" [index]=\"i\">\n        <free-template [template]=\"templateRef\" [data]=\"item\" [index]=\"i\"></free-template>\n      </free-draggable-item>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DraggableComponent);
    return DraggableComponent;
}());
exports.DraggableComponent = DraggableComponent;
var DraggableModule = (function () {
    function DraggableModule() {
    }
    DraggableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, share_1.ShareModule],
            declarations: [DraggableItemComponent, DraggableComponent],
            exports: [DraggableComponent]
        })
    ], DraggableModule);
    return DraggableModule;
}());
exports.DraggableModule = DraggableModule;
//# sourceMappingURL=draggable.component.js.map
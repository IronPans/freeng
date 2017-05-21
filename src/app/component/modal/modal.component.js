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
var share_1 = require("../common/share");
var ModalComponent = (function () {
    function ModalComponent(renderer2) {
        this.renderer2 = renderer2;
        this.closeIcon = true;
        this.visibleChange = new core_1.EventEmitter();
    }
    Object.defineProperty(ModalComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            if (this._visible) {
                this.show();
            }
            else {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.show = function () {
        this.center();
        this.modalClass = this.visible ? 'active' : 'inactive';
        this.addOverlay();
    };
    ModalComponent.prototype.close = function () {
        this.modalClass = this.visible ? 'active' : 'inactive';
        this.visibleChange.emit(false);
        if (this.mask) {
            this.renderer2.removeChild(document.body, this.mask);
        }
        this.mask = null;
    };
    ModalComponent.prototype.addOverlay = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'free-modal-mask';
            this.mask.style.cssText = 'position: fixed;top:0;left:0;width:100%;height:100%;' +
                'opacity:.5;background:#000;';
            this.mask.style.zIndex = (parseInt(this.modal.style.zIndex, 10) - 1) + '';
            this.maskClickListener = this.renderer2.listen(this.mask, 'click', function (event) {
                _this.close();
            });
            document.body.appendChild(this.mask);
        }
    };
    ModalComponent.prototype.center = function () {
        this.modal = this.modalViewChild.nativeElement;
        this.modal.style.zIndex = '10002';
        this.modal.classList.add('free-' + this.modalColor);
        var win = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        var mw = {
            width: this.modal.offsetWidth,
            height: this.modal.offsetHeight
        };
        if (mw.width === 0 || mw.height === 0) {
            this.modal.style.visibility = 'hidden';
            this.modal.style.display = 'block';
            mw = {
                width: this.modal.offsetWidth,
                height: this.modal.offsetHeight
            };
            this.modal.style.visibility = 'visible';
            this.modal.style.display = 'none';
        }
        this.modal.style.left = (win.width - mw.width) / 2 + 'px';
        this.modal.style.top = (win.height - mw.height) / 2 + 'px';
    };
    return ModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "header", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "modalColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalComponent.prototype, "draggable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalComponent.prototype, "closeIcon", void 0);
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", core_1.ElementRef)
], ModalComponent.prototype, "modalViewChild", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ModalComponent.prototype, "visibleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ModalComponent.prototype, "visible", null);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'free-modal',
        template: "\n    <div #modal class=\"free-modal\" [style.width.px]=\"width\" [style.height.px]=\"height\"\n         [@fadeInScale]=\"modalClass\" [style.display]=\"visible ? 'block' : 'none'\">\n      <div class=\"free-modal-header\">\n        <span *ngIf=\"header\">{{header}}</span>\n        <span><ng-content select=\"f-header\"></ng-content></span>\n        <span *ngIf=\"closeIcon\" class=\"free-modal-close\" (click)=\"close()\"><i class=\"fa fa-close\"></i></span>\n      </div>\n      <div class=\"free-modal-content\">\n        <ng-content></ng-content>\n      </div>\n      <div class=\"free-modal-footer\">\n        <ng-content select=\"f-footer\"></ng-content>\n      </div>\n    </div>\n  ",
        styleUrls: ['./modal.component.scss'],
        animations: [
            animations_1.trigger('fadeInScale', [
                animations_1.state('active', animations_1.style({
                    opacity: 1,
                    transform: 'scale(1)'
                })),
                animations_1.state('inactive', animations_1.style({
                    opacity: 0.7,
                    transform: 'scale(0)'
                })),
                animations_1.transition('active <=> inactive', animations_1.animate('.3s ease'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], ModalComponent);
exports.ModalComponent = ModalComponent;
var ModalModule = (function () {
    function ModalModule() {
    }
    return ModalModule;
}());
ModalModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ModalComponent],
        exports: [ModalComponent, share_1.ShareModule]
    })
], ModalModule);
exports.ModalModule = ModalModule;
//# sourceMappingURL=modal.component.js.map
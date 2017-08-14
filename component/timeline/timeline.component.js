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
var share_1 = require("../common/share");
var dom_1 = require("../common/dom");
var TimelineItemComponent = (function () {
    function TimelineItemComponent(domRenderer) {
        this.domRenderer = domRenderer;
    }
    TimelineItemComponent.prototype.ngAfterViewInit = function () {
        this.item = this.itemViewChild.nativeElement;
        switch (this.dot) {
            case 'square':
                this.domRenderer.addClass(this.item, 'free-square');
                break;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineItemComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineItemComponent.prototype, "dot", void 0);
    __decorate([
        core_1.ViewChild('item'),
        __metadata("design:type", core_1.ElementRef)
    ], TimelineItemComponent.prototype, "itemViewChild", void 0);
    TimelineItemComponent = __decorate([
        core_1.Component({
            selector: 'free-timeline-item',
            template: "\n    <div class=\"free-timeline-item\" #item>\n      <h4 *ngIf=\"header\"><span>{{header}}</span></h4>\n      <ng-content></ng-content>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer])
    ], TimelineItemComponent);
    return TimelineItemComponent;
}());
exports.TimelineItemComponent = TimelineItemComponent;
var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    TimelineComponent.prototype.ngOnInit = function () {
    };
    TimelineComponent = __decorate([
        core_1.Component({
            selector: 'free-timeline',
            template: "\n    <div class=\"free-timeline\">\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], TimelineComponent);
    return TimelineComponent;
}());
exports.TimelineComponent = TimelineComponent;
var TimelineModule = (function () {
    function TimelineModule() {
    }
    TimelineModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, share_1.ShareModule],
            declarations: [TimelineItemComponent, TimelineComponent],
            exports: [[TimelineItemComponent, TimelineComponent]]
        })
    ], TimelineModule);
    return TimelineModule;
}());
exports.TimelineModule = TimelineModule;
//# sourceMappingURL=timeline.component.js.map
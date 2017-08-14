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
var TreeItemComponent = (function () {
    function TreeItemComponent() {
        this.onSelect = new core_1.EventEmitter();
        this.isActive = 'inactive';
    }
    TreeItemComponent.prototype.ngOnChanges = function () {
        if (this.expanded) {
            this.isActive = 'active';
            this.isOpen = true;
        }
    };
    TreeItemComponent.prototype.toggle = function (event) {
        event.stopPropagation();
        var cl = event.target.parentNode.classList;
        cl.toggle('open');
        this.isOpen = !this.isOpen;
        this.isActive = this.isOpen ? 'active' : 'inactive';
    };
    TreeItemComponent.prototype.onClick = function (item) {
        this.onSelect.emit(item);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeItemComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeItemComponent.prototype, "folder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeItemComponent.prototype, "file", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeItemComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeItemComponent.prototype, "onSelect", void 0);
    TreeItemComponent = __decorate([
        core_1.Component({
            selector: 'free-tree-item',
            template: "\n    <li class=\"free-tree-item\" [class.open]=\"expanded\">\n      <span (click)=\"toggle($event)\">{{title}}</span>\n      <ul *ngIf=\"folder\" [@treeState]=\"isActive\">\n        <free-tree-item *ngFor=\"let f of folder\" title=\"{{f.title}}\"\n                        [file]=\"f?.file\"  [folder]=\"f?.folder\" [expanded]=\"f.expanded\"></free-tree-item>\n      </ul>\n      <ul *ngIf=\"file\" [@treeState]=\"isActive\">\n        <li *ngFor=\"let f of file\" class=\"last\" (click)=\"onClick(f)\">\n          <span>{{f.title}}</span>\n        </li>\n      </ul>\n    </li>\n  ",
            animations: [
                animations_1.trigger('treeState', [
                    animations_1.state('active', animations_1.style({
                        height: '*'
                    })),
                    animations_1.state('inactive', animations_1.style({
                        height: 0
                    })),
                    animations_1.transition('active <=> inactive', animations_1.animate('.25s ease'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], TreeItemComponent);
    return TreeItemComponent;
}());
exports.TreeItemComponent = TreeItemComponent;
var TreeComponent = (function () {
    function TreeComponent() {
    }
    TreeComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "menus", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'free-tree',
            template: "\n    <div class=\"free-tree\">\n      <ul>\n       <free-tree-item *ngFor=\"let menu of menus\" title=\"{{menu.title}}\"\n                     [file]=\"menu?.file\"  [folder]=\"menu?.folder\" [expanded]=\"menu.expanded\">\n       </free-tree-item>\n      </ul>\n    </div>"
        }),
        __metadata("design:paramtypes", [])
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
var TreeModule = (function () {
    function TreeModule() {
    }
    TreeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [TreeItemComponent, TreeComponent],
            exports: [TreeItemComponent, TreeComponent]
        })
    ], TreeModule);
    return TreeModule;
}());
exports.TreeModule = TreeModule;
//# sourceMappingURL=tree.component.js.map
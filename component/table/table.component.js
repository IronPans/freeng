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
var pagination_component_1 = require("../pagination/pagination.component");
var share_1 = require("../common/share");
var TableComponent = (function () {
    function TableComponent(renderer2) {
        this.renderer2 = renderer2;
        this.total = 0;
        this.heads = [];
        this.bodys = [];
    }
    TableComponent.prototype.ngOnInit = function () { };
    TableComponent.prototype.ngAfterViewInit = function () {
        var _container = this.container.nativeElement;
        if (this.striped) {
            this.renderer2.addClass(_container, 'free-table-striped');
        }
        if (this.border) {
            this.renderer2.addClass(_container, 'free-table-bordered');
        }
        if (this.hover) {
            this.renderer2.addClass(_container, 'free-table-hover');
        }
    };
    TableComponent.prototype.addHead = function (value) {
        this.heads.push(value);
    };
    TableComponent.prototype.addBody = function (value) {
        this.bodys.push(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableComponent.prototype, "striped", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableComponent.prototype, "border", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TableComponent.prototype, "hover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableComponent.prototype, "row", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], TableComponent.prototype, "container", void 0);
    TableComponent = __decorate([
        core_1.Component({
            selector: 'free-table',
            template: "\n    <div class=\"free-table\" #container>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"free-table-head\" *ngFor=\"let head of heads\">\n              <div class=\"free-table-head-inner\">\n                <div class=\"free-table-head-text\">\n                  <span *ngIf=\"!head.headerTemplate\">{{head.title}}</span>\n                  <free-template *ngIf=\"head.headerTemplate\" [template]=\"head.headerTemplate\">\n                  </free-template>\n                </div>\n              </div>\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngFor=\"let body of bodys\">\n          <tr class=\"free-table-row\" *ngFor=\"let row of body.rows;\">\n            <td class=\"free-table-cell\" *ngFor=\"let cell of row.cells\"\n                [attr.colspan]=\"cell.colspan\" [attr.rowspan]=\"cell.rowspan\">\n              <div class=\"free-table-cell-inner\">\n                <span *ngIf=\"!cell.cellTemplate\">{{cell.value}}</span>\n                <free-template *ngIf=\"cell.cellTemplate\" [template]=\"cell.cellTemplate\"></free-template>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
var TableHeaderComponent = (function () {
    function TableHeaderComponent() {
    }
    TableHeaderComponent = __decorate([
        core_1.Component({
            selector: 'free-table-header',
            template: ""
        })
    ], TableHeaderComponent);
    return TableHeaderComponent;
}());
exports.TableHeaderComponent = TableHeaderComponent;
var TableHeadComponent = (function () {
    function TableHeadComponent(table, er) {
        this.er = er;
        this.table = table;
    }
    TableHeadComponent.prototype.ngOnInit = function () {
        this.table.addHead(this);
    };
    TableHeadComponent.prototype.ngAfterViewInit = function () {
        this.title = this.er.nativeElement.innerHTML;
        this.headerTemplate = this.template;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TableHeadComponent.prototype, "rowspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TableHeadComponent.prototype, "colspan", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], TableHeadComponent.prototype, "template", void 0);
    TableHeadComponent = __decorate([
        core_1.Component({
            selector: 'free-table-head',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [TableComponent, core_1.ElementRef])
    ], TableHeadComponent);
    return TableHeadComponent;
}());
exports.TableHeadComponent = TableHeadComponent;
var TableRowComponent = (function () {
    function TableRowComponent() {
        this.cells = [];
    }
    TableRowComponent.prototype.addCell = function (value) {
        this.cells.push(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TableRowComponent.prototype, "header", void 0);
    TableRowComponent = __decorate([
        core_1.Component({
            selector: 'free-table-row',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [])
    ], TableRowComponent);
    return TableRowComponent;
}());
exports.TableRowComponent = TableRowComponent;
var TableBodyComponent = (function () {
    function TableBodyComponent(table) {
        this.rows = [];
        this.table = table;
    }
    TableBodyComponent.prototype.ngOnInit = function () {
        this.table.addBody(this);
    };
    TableBodyComponent.prototype.ngAfterViewInit = function () {
        this.rows = this._rows.toArray();
    };
    __decorate([
        core_1.ContentChildren(TableRowComponent),
        __metadata("design:type", core_1.QueryList)
    ], TableBodyComponent.prototype, "_rows", void 0);
    TableBodyComponent = __decorate([
        core_1.Component({
            selector: 'free-table-body',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [TableComponent])
    ], TableBodyComponent);
    return TableBodyComponent;
}());
exports.TableBodyComponent = TableBodyComponent;
var TableCellComponent = (function () {
    function TableCellComponent(row, er) {
        this.er = er;
        this.row = row;
    }
    TableCellComponent.prototype.ngOnInit = function () {
        this.row.addCell(this);
    };
    TableCellComponent.prototype.ngAfterViewInit = function () {
        this.cellTemplate = this.template;
        this.value = this.er.nativeElement.innerHTML;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableCellComponent.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TableCellComponent.prototype, "rowspan", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], TableCellComponent.prototype, "template", void 0);
    TableCellComponent = __decorate([
        core_1.Component({
            selector: 'free-table-cell',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [TableRowComponent, core_1.ElementRef])
    ], TableCellComponent);
    return TableCellComponent;
}());
exports.TableCellComponent = TableCellComponent;
var TableModule = (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, pagination_component_1.PaginationModule, share_1.ShareModule],
            declarations: [TableRowComponent, TableHeaderComponent,
                TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent],
            exports: [TableRowComponent, TableHeaderComponent,
                TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent]
        })
    ], TableModule);
    return TableModule;
}());
exports.TableModule = TableModule;
//# sourceMappingURL=table.component.js.map
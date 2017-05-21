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
var TCheckboxComponent = (function () {
    function TCheckboxComponent() {
        this.onClick = new core_1.EventEmitter();
    }
    TCheckboxComponent.prototype.ngOnInit = function () {
        if (!this.checked) {
            this.checked = false;
        }
    };
    TCheckboxComponent.prototype.ngAfterViewInit = function () {
        this.checkbox = this.checkboxViewChild.nativeElement;
    };
    TCheckboxComponent.prototype.onChange = function (e) {
        this.checked = this.checkbox.checked;
        this.onClick.emit({
            value: this.checkbox.value,
            checked: this.checkbox.checked
        });
    };
    return TCheckboxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TCheckboxComponent.prototype, "checkboxName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TCheckboxComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TCheckboxComponent.prototype, "checked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TCheckboxComponent.prototype, "onClick", void 0);
__decorate([
    core_1.ViewChild('rb'),
    __metadata("design:type", core_1.ElementRef)
], TCheckboxComponent.prototype, "checkboxViewChild", void 0);
TCheckboxComponent = __decorate([
    core_1.Component({
        selector: 'free-tcheckbox',
        template: "\n    <label class=\"free-checkbox\">\n      <div class=\"free-checkbox-inner\">\n        <input type=\"checkbox\" #rb value=\"{{title}}\"\n               [checked]=\"checked\" name=\"{{checkboxName}}\" (change)=\"onChange($event)\">\n        <div class=\"free-checkbox-ins\"></div>\n      </div>\n      <div class=\"free-checkbox-title\">{{title}}</div>\n    </label>\n  "
    }),
    __metadata("design:paramtypes", [])
], TCheckboxComponent);
exports.TCheckboxComponent = TCheckboxComponent;
var TemplateComponent = (function () {
    function TemplateComponent(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateComponent.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template.cellTemplate, {});
    };
    return TemplateComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TemplateComponent.prototype, "template", void 0);
TemplateComponent = __decorate([
    core_1.Component({
        selector: 'free-template',
        template: ""
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], TemplateComponent);
exports.TemplateComponent = TemplateComponent;
var TableComponent = (function () {
    function TableComponent(renderer2) {
        this.renderer2 = renderer2;
        this.heads = [];
        this.bodys = [];
        this.selected = [];
    }
    TableComponent.prototype.ngOnInit = function () {
    };
    TableComponent.prototype.ngAfterViewInit = function () {
        var _container = this.container.nativeElement;
        if (this.striped) {
            this.renderer2.addClass(_container, 'free-table-striped');
        }
        if (this.border) {
            this.renderer2.addClass(_container, 'free-table-bordered');
        }
        if (this.hover || this.selection) {
            this.renderer2.addClass(_container, 'free-table-hover');
        }
    };
    TableComponent.prototype.addHead = function (value) {
        this.heads.push(value);
    };
    TableComponent.prototype.addBody = function (value) {
        this.bodys.push(value);
    };
    TableComponent.prototype.optionClick = function ($event) {
        if (this.selection) {
            var checkboxs = this.checkboxs.toArray();
            checkboxs.shift();
            for (var _i = 0, checkboxs_1 = checkboxs; _i < checkboxs_1.length; _i++) {
                var checkbox = checkboxs_1[_i];
                checkbox.checked = $event.checked;
            }
            for (var _a = 0, _b = this.bodys; _a < _b.length; _a++) {
                var body = _b[_a];
                for (var _c = 0, _d = body.rows; _c < _d.length; _c++) {
                    var row = _d[_c];
                    row.selected = !row.selected;
                }
            }
        }
    };
    TableComponent.prototype.itemClick = function ($event, row, i) {
        if (this.selection) {
            row.selected = !row.selected;
            var checkboxs = this.checkboxs.toArray();
            checkboxs.shift();
            checkboxs[i].checked = row.selected;
            if ($event.checked) {
                this.selected.push($event);
            }
            ;
            this.checkbox.checked = this.checkOfSelect();
        }
    };
    TableComponent.prototype.onSelect = function (row, i) {
        if (this.selection) {
            row.selected = !row.selected;
            var checkboxs = this.checkboxs.toArray();
            checkboxs.shift();
            checkboxs[i].checked = row.selected;
            this.checkbox.checked = this.checkOfSelect();
        }
    };
    TableComponent.prototype.checkOfSelect = function () {
        var num = 0;
        var rowNum = 0;
        for (var _i = 0, _a = this.bodys; _i < _a.length; _i++) {
            var body = _a[_i];
            rowNum += body.rows.length;
            for (var _b = 0, _c = body.rows; _b < _c.length; _b++) {
                var row = _c[_b];
                if (row.selected) {
                    num++;
                }
            }
        }
        if (rowNum === num) {
            return true;
        }
        return false;
    };
    return TableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableComponent.prototype, "pagination", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableComponent.prototype, "selection", void 0);
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
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], TableComponent.prototype, "container", void 0);
__decorate([
    core_1.ViewChildren(TCheckboxComponent),
    __metadata("design:type", core_1.QueryList)
], TableComponent.prototype, "checkboxs", void 0);
__decorate([
    core_1.ViewChild('checkbox'),
    __metadata("design:type", TCheckboxComponent)
], TableComponent.prototype, "checkbox", void 0);
TableComponent = __decorate([
    core_1.Component({
        selector: 'free-table',
        template: "\n    <div class=\"free-table\" #container>\n      <table>\n        <thead>\n          <tr>\n            <th class=\"free-table-head\" *ngIf=\"selection\">\n              <div class=\"free-table-head-inner\">\n                <div class=\"free-table-head-text\">\n                  <free-tcheckbox #checkbox (onClick)=\"optionClick($event)\"></free-tcheckbox>\n                </div>\n              </div>\n            </th>\n            <th class=\"free-table-head\" *ngFor=\"let head of heads\">\n              <div class=\"free-table-head-inner\">\n                <div class=\"free-table-head-text\">{{head.title}}</div>\n              </div>\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngFor=\"let body of bodys\">\n          <tr class=\"free-table-row\" *ngFor=\"let row of body.rows; let i = index\" \n              (click)=\"onSelect(row, i)\" [class.free-selected]=\"row.selected\">\n            <td *ngIf=\"selection\" class=\"free-table-cell\">\n              <div class=\"free-table-cell-inner\">\n                <free-tcheckbox (onClick)=\"itemClick($event, row, i)\"></free-tcheckbox>\n              </div>\n            </td>\n            <td class=\"free-table-cell\" *ngFor=\"let cell of row.cells\">\n              <div class=\"free-table-cell-inner\">\n                <span *ngIf=\"!cell.cellTemplate\">{{cell.value}}</span>\n                <free-template *ngIf=\"cell.cellTemplate\" [template]=\"cell\"></free-template>\n              </div>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      \n    </div>\n  ",
        styleUrls: ['./table.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], TableComponent);
exports.TableComponent = TableComponent;
var TableHeaderComponent = (function () {
    function TableHeaderComponent() {
    }
    return TableHeaderComponent;
}());
TableHeaderComponent = __decorate([
    core_1.Component({
        selector: 'free-table-header',
        template: ""
    })
], TableHeaderComponent);
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
    };
    return TableHeadComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TableHeadComponent.prototype, "sortable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TableHeadComponent.prototype, "rowspan", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TableHeadComponent.prototype, "colspan", void 0);
TableHeadComponent = __decorate([
    core_1.Component({
        selector: 'free-table-head',
        template: "<ng-content></ng-content>"
    }),
    __metadata("design:paramtypes", [TableComponent, core_1.ElementRef])
], TableHeadComponent);
exports.TableHeadComponent = TableHeadComponent;
var TableRowComponent = (function () {
    function TableRowComponent() {
        this.cells = [];
    }
    TableRowComponent.prototype.ngOnInit = function () { };
    TableRowComponent.prototype.addCell = function (value) {
        this.cells.push(value);
    };
    return TableRowComponent;
}());
TableRowComponent = __decorate([
    core_1.Component({
        selector: 'free-table-row',
        template: "<ng-content></ng-content>"
    }),
    __metadata("design:paramtypes", [])
], TableRowComponent);
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
    return TableBodyComponent;
}());
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
    return TableCellComponent;
}());
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
exports.TableCellComponent = TableCellComponent;
var TableModule = (function () {
    function TableModule() {
    }
    return TableModule;
}());
TableModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [TCheckboxComponent, TableHeaderComponent, TableRowComponent,
            TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent, TemplateComponent],
        exports: [TCheckboxComponent, TableHeaderComponent, TableRowComponent,
            TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent, TemplateComponent]
    })
], TableModule);
exports.TableModule = TableModule;
//# sourceMappingURL=table.component.js.map
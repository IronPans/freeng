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
var core_1 = require("@angular/core");
var pagination_component_1 = require("../pagination/pagination.component");
var share_1 = require("../common/share");
var dom_1 = require("../common/dom");
var TCheckboxComponent = (function () {
    function TCheckboxComponent(dt) {
        this.dt = dt;
        this.onClick = new core_1.EventEmitter();
        dt.addCheckbox(this);
    }
    TCheckboxComponent.prototype.onChange = function (value) {
        this.checked = value;
        this.onClick.emit({
            checked: value
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TCheckboxComponent.prototype, "checkboxName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TCheckboxComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TCheckboxComponent.prototype, "onClick", void 0);
    TCheckboxComponent = __decorate([
        core_1.Component({
            selector: 'free-tcheckbox',
            template: "\n    <label class=\"free-checkbox\">\n      <div class=\"free-checkbox-inner\">\n        <input type=\"checkbox\" #rb\n               [checked]=\"checked\" name=\"{{checkboxName}}\" (change)=\"onChange(rb.checked)\">\n        <div class=\"free-checkbox-ins\"></div>\n      </div>\n    </label>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [DatatableComponent])
    ], TCheckboxComponent);
    return TCheckboxComponent;
}());
exports.TCheckboxComponent = TCheckboxComponent;
var TRadioComponent = (function () {
    function TRadioComponent(dt) {
        this.dt = dt;
        this.onClick = new core_1.EventEmitter();
        dt.addRadio(this);
    }
    TRadioComponent.prototype.onChange = function (value) {
        this.checked = value;
        this.onClick.emit({
            checked: value
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TRadioComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TRadioComponent.prototype, "onClick", void 0);
    TRadioComponent = __decorate([
        core_1.Component({
            selector: 'free-tradio',
            template: "\n    <label class=\"free-radio\">\n      <div class=\"free-radio-inner\">\n        <input type=\"radio\" #rb [checked]=\"checked\" (change)=\"onChange(rb.checked)\">\n        <div class=\"free-radio-ins\"></div>\n      </div>\n    </label>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [DatatableComponent])
    ], TRadioComponent);
    return TRadioComponent;
}());
exports.TRadioComponent = TRadioComponent;
var DatatableColumnComponent = (function () {
    function DatatableColumnComponent(table) {
        this.table = table;
    }
    DatatableColumnComponent.prototype.ngAfterViewInit = function () {
        this.cellTemplate = this.template;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableColumnComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableColumnComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableColumnComponent.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableColumnComponent.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableColumnComponent.prototype, "rowspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableColumnComponent.prototype, "rowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableColumnComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DatatableColumnComponent.prototype, "style", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], DatatableColumnComponent.prototype, "template", void 0);
    DatatableColumnComponent = __decorate([
        core_1.Component({
            selector: 'free-datatable-column',
            template: "<ng-content></ng-content>"
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [DatatableComponent])
    ], DatatableColumnComponent);
    return DatatableColumnComponent;
}());
exports.DatatableColumnComponent = DatatableColumnComponent;
var ExpansionRowComponent = (function () {
    function ExpansionRowComponent(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    ExpansionRowComponent.prototype.ngOnInit = function () {
        if (this.template) {
            this.view = this._viewContainerRef.createEmbeddedView(this.template, {
                '\$implicit': this.rowData,
                'rowIndex': this.rowIndex
            });
        }
    };
    ExpansionRowComponent.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExpansionRowComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExpansionRowComponent.prototype, "rowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ExpansionRowComponent.prototype, "rowIndex", void 0);
    ExpansionRowComponent = __decorate([
        core_1.Component({
            selector: 'free-expansion-row',
            template: ""
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], ExpansionRowComponent);
    return ExpansionRowComponent;
}());
exports.ExpansionRowComponent = ExpansionRowComponent;
var DatatableHeaderComponent = (function () {
    function DatatableHeaderComponent(dt) {
        this.dt = dt;
    }
    __decorate([
        core_1.Input('fTableHeader'),
        __metadata("design:type", Array)
    ], DatatableHeaderComponent.prototype, "columns", void 0);
    DatatableHeaderComponent = __decorate([
        core_1.Component({
            selector: '[fTableHeader]',
            template: "\n    <th class=\"free-datatable-head free-datatable-head-expand\" *ngIf=\"dt.expandableRows\">\n      <div class=\"free-datatable-head-inner\">\n        <div class=\"free-datatable-head-text\">\n        </div>\n      </div>\n    </th>\n    <th class=\"free-datatable-head\" *ngIf=\"dt.order\">\n      <div class=\"free-datatable-head-inner\">\n        <div class=\"free-datatable-head-text\">\n        </div>\n      </div>\n    </th>\n    <th class=\"free-datatable-head free-datatable-head-selection\" *ngIf=\"dt.selectionMode\">\n      <div class=\"free-datatable-head-inner\">\n        <div class=\"free-datatable-head-text\" *ngIf=\"dt.selectionMode === 'multiple'\">\n          <free-tcheckbox [checked]=\"dt.totalChecked\" #checkbox (onClick)=\"dt.rowClick($event)\">\n          </free-tcheckbox>\n        </div>\n        <div class=\"free-datatable-head-text\" *ngIf=\"dt.selectionMode === 'single'\">\n        </div>\n      </div>\n    </th>\n    <ng-template ngFor [ngForOf]=\"columns\" let-col let-lastCol=\"last\">\n      <th class=\"free-datatable-head\" [ngStyle]=\"col.style\">\n        <div class=\"free-datatable-head-inner\">\n          <div class=\"free-datatable-head-text\">\n            <span *ngIf=\"!col.headerTemplate\">{{col.header}}</span>\n            <free-template *ngIf=\"col.headerTemplate\" [template]=\"col.headerTemplate\">\n            </free-template>\n            <span *ngIf=\"dt.sort || col.sort\" class=\"free-datatable-sort\">\n              <i class=\"fa fa-caret-up\" (click)=\"dt.onColumnSort(col, -1, $event)\"></i>\n              <i class=\"fa fa-caret-down\" (click)=\"dt.onColumnSort(col, 1, $event)\"></i>\n            </span>\n          </div>\n          <span class=\"free-column-resizer\" *ngIf=\"dt.resizable && !lastCol && dt.border\"\n                (mousedown)=\"dt.columnResizeStart($event)\"></span>\n        </div>\n      </th>\n    </ng-template>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [DatatableComponent])
    ], DatatableHeaderComponent);
    return DatatableHeaderComponent;
}());
exports.DatatableHeaderComponent = DatatableHeaderComponent;
var DatatableBodyComponent = (function () {
    function DatatableBodyComponent(dt) {
        this.dt = dt;
    }
    __decorate([
        core_1.Input('fTableBody'),
        __metadata("design:type", Array)
    ], DatatableBodyComponent.prototype, "columns", void 0);
    DatatableBodyComponent = __decorate([
        core_1.Component({
            selector: '[fTableBody]',
            template: "\n    <ng-template ngFor let-rowData [ngForOf]=\"dt.data\" let-i=index>\n      <tr class=\"free-datatable-row\" [class.free-selected]=\"rowData.selected\">\n        <td *ngIf=\"dt.expandableRows\" class=\"free-datatable-cell\">\n          <div class=\"free-datatable-cell-inner\">\n            <i class=\"fa fa-angle-right free-expand-arrow\" (click)=\"dt.toggleRow(rowData)\"\n               [class.fa-angle-down]=\"dt.isRowExpand(rowData)\"></i>\n          </div>\n        </td>\n        <td *ngIf=\"dt.order\" class=\"free-datatable-cell\">\n          <div class=\"free-datatable-cell-inner\">\n            {{i + 1 + dt.first}}\n          </div>\n        </td>\n        <td *ngIf=\"dt.selectionMode\" class=\"free-datatable-cell\">\n          <div class=\"free-datatable-cell-inner\" *ngIf=\"dt.selectionMode === 'multiple'\">\n            <free-tcheckbox (onClick)=\"dt.onCheckboxItemClick($event, rowData, i)\"></free-tcheckbox>\n          </div>\n          <div class=\"free-datatable-cell-inner\" *ngIf=\"dt.selectionMode === 'single'\">\n            <free-tradio (onClick)=\"dt.onRadioItemClick($event, rowData, i)\"></free-tradio>\n          </div>\n        </td>\n        <ng-template ngFor [ngForOf]=\"columns\" let-col let-colIndex=\"index\">\n          <td class=\"free-datatable-cell\"\n              [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\">\n            <div class=\"free-datatable-cell-inner\">\n              <span *ngIf=\"!col.cellTemplate\">{{rowData[col.field]}}</span>\n              <free-column-template *ngIf=\"col.cellTemplate\" [column]=\"col\" [rowData]=\"rowData\"\n                                    [rowIndex]=\"i\" [template]=\"col.cellTemplate\">\n              </free-column-template>\n              <div class=\"free-cell-editor\" *ngIf=\"col.editable\">\n                <input type=\"text\" value=\"{{rowData[col.field]}}\">\n              </div>\n            </div>\n          </td>\n        </ng-template>\n      </tr>\n      <tr class=\"free-datatable-row\" *ngIf=\"dt.expandableRows && dt.isRowExpand(rowData)\">\n        <td class=\"free-datatable-cell\" [attr.colspan]=\"dt.getColumnLength()\">\n          <div class=\"free-datatable-cell-inner\">\n            <free-expansion-row [template]=\"dt.rowExpansionTemplate\"\n                                [rowIndex]=\"i\" [rowData]=\"rowData\"></free-expansion-row>\n          </div>\n        </td>\n      </tr>\n    </ng-template>\n    <tr *ngIf=\"dt.isEmpty\">\n      <td [attr.colspan]=\"columns.length\">{{dt.emptyMessage}}</td>\n    </tr>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [DatatableComponent])
    ], DatatableBodyComponent);
    return DatatableBodyComponent;
}());
exports.DatatableBodyComponent = DatatableBodyComponent;
var DatatableScrollableComponent = (function () {
    function DatatableScrollableComponent(domRenderer, dt) {
        this.domRenderer = domRenderer;
        this.dt = dt;
    }
    DatatableScrollableComponent.prototype.ngAfterViewInit = function () {
        this.scrollHead = this.headViewChild.nativeElement;
        this.initScrolling();
    };
    DatatableScrollableComponent.prototype.initScrolling = function () {
        this.scrollHead.style.marginRight = this.domRenderer.getScrollbarWidth() + 'px';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DatatableScrollableComponent.prototype, "columns", void 0);
    __decorate([
        core_1.ViewChild('tableHead'),
        __metadata("design:type", core_1.ElementRef)
    ], DatatableScrollableComponent.prototype, "headViewChild", void 0);
    DatatableScrollableComponent = __decorate([
        core_1.Component({
            selector: 'free-datatable-scrollable',
            template: "\n    <div class=\"free-datatable-scrollable\">\n      <div class=\"free-datatable-scrollable-head\">\n        <div class=\"free-datatable-head-wrapper\" #tableHead>\n          <table>\n            <colgroup class=\"free-datatable-scrollable-colgroup\">\n              <col *ngFor=\"let col of columns\" [ngStyle]=\"col.style\"/>\n            </colgroup>\n            <thead>\n            <tr [fTableHeader]=\"columns\"></tr>\n            </thead>\n          </table>\n        </div>\n      </div>\n      <div class=\"free-datatable-body free-iscroll\" [ngStyle]=\"{'max-height': dt.scrollHeight}\" #tableBody>\n        <div class=\"free-datatable-body-wrapper\">\n          <table>\n            <colgroup class=\"free-datatable-scrollable-colgroup\">\n              <col *ngFor=\"let col of columns\" [ngStyle]=\"col.style\"/>\n            </colgroup>\n            <tbody [fTableBody]=\"columns\"></tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return DatatableComponent; }))),
        __metadata("design:paramtypes", [dom_1.DomRenderer,
            DatatableComponent])
    ], DatatableScrollableComponent);
    return DatatableScrollableComponent;
}());
exports.DatatableScrollableComponent = DatatableScrollableComponent;
var DatatableComponent = (function () {
    function DatatableComponent(renderer2, domRenderer) {
        this.renderer2 = renderer2;
        this.domRenderer = domRenderer;
        this.onSelect = new core_1.EventEmitter();
        this.columns = [];
        this.checkboxSelection = [];
        this.radioSelection = [];
        this.emptyMessage = '暂无数据';
        this.page = 1;
        this.first = 0;
        this.checkboxs = [];
        this.radios = [];
    }
    Object.defineProperty(DatatableComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.radioSelection = [];
            this.checkboxSelection = [];
            this.totalChecked = false;
            this.page = 1;
            this.total = this.value.length;
            this.filterValue(this.page);
        },
        enumerable: true,
        configurable: true
    });
    DatatableComponent.prototype.ngOnInit = function () {
    };
    DatatableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initColumns();
        var _container = this.container.nativeElement;
        if (this.striped) {
            this.renderer2.addClass(_container, 'free-datatable-striped');
        }
        if (this.border) {
            this.renderer2.addClass(_container, 'free-datatable-bordered');
        }
        if (this.hover || this.selectionMode) {
            this.renderer2.addClass(_container, 'free-datatable-hover');
        }
        this.total = this.value.length;
        this.filterValue(this.page);
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'rowexpansion':
                    _this.rowExpansionTemplate = item.template;
                    break;
            }
        });
        this.initColumnResize();
    };
    DatatableComponent.prototype.initColumns = function () {
        this.columns = this.cols.toArray();
    };
    DatatableComponent.prototype.initColumnResize = function () {
        var _this = this;
        this.documentMousemoveListener = this.domRenderer.listen('document', 'mousemove', function (e) {
            if (_this.resizeDown) {
                var nextSibling = _this.currentResizeCell.nextElementSibling;
                _this.currentResizeCell.style.width = _this.currentResizeCell.offsetWidth
                    + _this.columnResizeMoveX + 'px';
                nextSibling.style.width = nextSibling.offsetWidth - _this.columnResizeMoveX + 'px';
                _this.columnResizeMoveX = e.pageX - _this.columnResizeStartX;
                _this.columnResizeStartX = e.pageX;
            }
        });
        this.documentMouseupListener = this.renderer2.listen('document', 'mouseup', function () {
            if (_this.resizeDown) {
                _this.resizeDown = false;
            }
        });
    };
    DatatableComponent.prototype.columnResizeStart = function (event) {
        this.resizeDown = true;
        this.currentResizeCell = event.target.parentNode.parentNode;
        this.columnResizeStartX = event.pageX;
        this.columnResizeMoveX = 0;
    };
    DatatableComponent.prototype.addCheckbox = function (checkbox) {
        this.checkboxs.push(checkbox);
    };
    DatatableComponent.prototype.addRadio = function (radio) {
        this.radios.push(radio);
    };
    DatatableComponent.prototype.getColumnLength = function () {
        var length = this.columns.length;
        if (this.order) {
            length += 1;
        }
        if (this.expandedRows) {
            length += 1;
        }
        if (this.selectionMode) {
            length += 1;
        }
        return length;
    };
    DatatableComponent.prototype.onColumnSort = function (column, desc, event) {
        var target = event.target;
        var sort = target.parentNode.children;
        for (var i = 0; i < sort.length; i++) {
            this.renderer2.removeClass(sort[i], 'free-sort-active');
        }
        this.renderer2.addClass(target, 'free-sort-active');
        column.desc = (desc === 1);
        var field = column.field;
        var vx = desc;
        this.data.sort(function (a, b) {
            var v1 = a[field];
            var v2 = b[field];
            if (v1 > v2) {
                return vx;
            }
            else if (v1 < v2) {
                return -vx;
            }
            else {
                return 0;
            }
        });
    };
    DatatableComponent.prototype.toggleRow = function (row) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }
        var rowIndex = this.findRowExpand(row);
        if (rowIndex !== -1) {
            this.expandedRows.splice(rowIndex, 1);
        }
        else {
            this.expandedRows.push(row);
        }
    };
    DatatableComponent.prototype.findRowExpand = function (row) {
        var index = -1;
        if (this.expandedRows) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (row === this.expandedRows[i]) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DatatableComponent.prototype.isRowExpand = function (row) {
        return this.findRowExpand(row) !== -1;
    };
    DatatableComponent.prototype.findCell = function (elem, tagName) {
        var cell = elem;
        while (cell && cell.tagName !== tagName) {
            cell = elem.parentNode;
        }
        return cell;
    };
    DatatableComponent.prototype.filterValue = function (page) {
        var _this = this;
        if (this.pagination) {
            this.first = this.row * (page - 1);
            this.data = this._value.filter(function (item, index) {
                return (index >= _this.first && index < _this.row * page);
            });
        }
        else {
            this.data = this._value;
        }
    };
    DatatableComponent.prototype.onPageChange = function (event) {
        this.filterValue(event.activeIndex);
        this.checkboxSelection = [];
        this.totalChecked = false;
    };
    DatatableComponent.prototype.rowClick = function (event) {
        this.checkboxSelection = [];
        if (this.selectionMode) {
            var checkboxs = this.checkboxs;
            for (var i = 1; i < checkboxs.length; i++) {
                checkboxs[i].checked = event.checked;
            }
            if (event.checked) {
                for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                    var v = _a[_i];
                    this.checkboxSelection.push(v);
                }
            }
            else {
                this.checkboxSelection = [];
            }
            this.totalChecked = event.checked;
            this.onSelectChange();
        }
    };
    DatatableComponent.prototype.onCheckboxItemClick = function (event, rowData, i) {
        if (this.selectionMode) {
            if (event.checked && !this.totalChecked) {
                this.checkboxSelection.push(rowData);
            }
            else if (!event.checked) {
                this.checkboxSelection.splice(i, 1);
            }
            this.totalChecked = this.checkOfSelect();
            this.onSelectChange();
        }
    };
    DatatableComponent.prototype.onRadioItemClick = function (event, rowData, i) {
        if (this.selectionMode) {
            if (event.checked) {
                for (var _i = 0, _a = this.radios; _i < _a.length; _i++) {
                    var r = _a[_i];
                    r.checked = false;
                }
                this.radios[i].checked = true;
                this.radioSelection = [rowData];
            }
            else if (!event.checked) {
                this.radios[i].checked = false;
            }
            this.onSelectChange();
        }
    };
    DatatableComponent.prototype.onSelectChange = function () {
        if (this.selectionMode === 'multiple') {
            this.onSelect.emit({
                total: this.totalChecked,
                value: this.checkboxSelection
            });
        }
        else if (this.selectionMode === 'single') {
            this.onSelect.emit({
                value: this.radioSelection
            });
        }
    };
    DatatableComponent.prototype.checkOfSelect = function () {
        return this.checkboxSelection.length === this.data.length;
    };
    DatatableComponent.prototype.unbindDocumentMouseListener = function () {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    };
    DatatableComponent.prototype.ngOnDestroy = function () {
        this.unbindDocumentMouseListener();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "striped", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "border", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "hover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "expandableRows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DatatableComponent.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "resizable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DatatableComponent.prototype, "value", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "order", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatatableComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], DatatableComponent.prototype, "container", void 0);
    __decorate([
        core_1.ContentChildren(share_1.FreeTemplateDirective),
        __metadata("design:type", core_1.QueryList)
    ], DatatableComponent.prototype, "templates", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatatableComponent.prototype, "onSelect", void 0);
    __decorate([
        core_1.ContentChildren(DatatableColumnComponent),
        __metadata("design:type", core_1.QueryList)
    ], DatatableComponent.prototype, "cols", void 0);
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'free-datatable',
            template: "\n    <div class=\"free-datatable\" #container>\n      <div class=\"free-datatable-table\" *ngIf=\"!scrollable\">\n        <table>\n          <thead>\n          <tr [fTableHeader]=\"columns\"></tr>\n          </thead>\n          <tbody [fTableBody]=\"columns\"></tbody>\n        </table>\n      </div>\n      <ng-template [ngIf]=\"scrollable\">\n        <free-datatable-scrollable [columns]=\"columns\"></free-datatable-scrollable>\n      </ng-template>\n      <div class=\"free-datatable-footer\" *ngIf=\"pagination\">\n        <free-pagination [total]=\"total\" [row]=\"row\" (onPageChange)=\"onPageChange($event)\"></free-pagination>\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, dom_1.DomRenderer])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;
var DatatableModule = (function () {
    function DatatableModule() {
    }
    DatatableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, pagination_component_1.PaginationModule, share_1.ShareModule],
            declarations: [TCheckboxComponent, TRadioComponent, ExpansionRowComponent,
                DatatableBodyComponent, DatatableHeaderComponent,
                DatatableColumnComponent, DatatableComponent,
                DatatableScrollableComponent],
            exports: [DatatableComponent, DatatableColumnComponent, share_1.ShareModule]
        })
    ], DatatableModule);
    return DatatableModule;
}());
exports.DatatableModule = DatatableModule;
//# sourceMappingURL=datatable.component.js.map
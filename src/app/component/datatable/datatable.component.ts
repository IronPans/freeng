import {CommonModule} from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output, ViewChild,
  ElementRef, QueryList, EventEmitter, Renderer2, TemplateRef, ContentChild, Inject, forwardRef,
  ContentChildren, ViewContainerRef, EmbeddedViewRef, OnDestroy,
} from '@angular/core';
import {PaginationModule} from '../pagination/pagination.component';
import {FreeTemplateDirective, ShareModule} from '../common/share';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-tcheckbox',
  template: `
    <label class="free-checkbox">
      <div class="free-checkbox-inner">
        <input type="checkbox" #rb
               [checked]="checked" name="{{checkboxName}}" (change)="onChange(rb.checked)">
        <div class="free-checkbox-ins"></div>
      </div>
    </label>
  `
})
export class TCheckboxComponent {

  @Input() checkboxName: string;
  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  checkbox: HTMLInputElement;
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {
    dt.addCheckbox(this);
  }

  onChange(value: boolean) {
    this.checked = value;
    this.onClick.emit({
      checked: value
    });
  }
}

@Component({
  selector: 'free-tradio',
  template: `
    <label class="free-radio">
      <div class="free-radio-inner">
        <input type="radio" #rb [checked]="checked" (change)="onChange(rb.checked)">
        <div class="free-radio-ins"></div>
      </div>
    </label>
  `
})
export class TRadioComponent {

  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  checkbox: HTMLInputElement;
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {
    dt.addRadio(this);
  }

  onChange(value: boolean) {
    this.checked = value;
    this.onClick.emit({
      checked: value
    });
  }
}

@Component({
  selector: 'free-datatable-column',
  template: `<ng-content></ng-content>`
})

export class DatatableColumnComponent implements AfterViewInit {
  @Input() header: string;
  @Input() sort: boolean;
  @Input() field: string;
  @Input() colspan: number;
  @Input() rowspan: number;
  @Input() rowData: any;
  @Input() editable: boolean;
  @Input() style: any;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  desc: boolean;
  cell: any;
  table: DatatableComponent;
  selected: boolean;
  public cellTemplate: TemplateRef<any>;

  constructor(@Inject(forwardRef(() => DatatableComponent)) table: DatatableComponent) {
    this.table = table;
  }

  ngAfterViewInit() {
    this.cellTemplate = this.template;
  }
}

@Component({
  selector: 'free-expansion-row',
  template: ``
})
export class ExpansionRowComponent implements OnInit, OnDestroy {
  @Input() template: any;
  @Input() rowData: any;
  @Input() rowIndex: number;
  view: EmbeddedViewRef<any>;

  constructor(public _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.template) {
      this.view = this._viewContainerRef.createEmbeddedView(this.template, {
        '\$implicit': this.rowData,
        'rowIndex': this.rowIndex
      })
    }
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

@Component({
  selector: '[fTableHeader]',
  template: `
    <th class="free-datatable-head free-datatable-head-expand" *ngIf="dt.expandableRows">
      <div class="free-datatable-head-inner">
        <div class="free-datatable-head-text">
        </div>
      </div>
    </th>
    <th class="free-datatable-head" *ngIf="dt.order">
      <div class="free-datatable-head-inner">
        <div class="free-datatable-head-text">
        </div>
      </div>
    </th>
    <th class="free-datatable-head free-datatable-head-selection" *ngIf="dt.selectionMode">
      <div class="free-datatable-head-inner">
        <div class="free-datatable-head-text" *ngIf="dt.selectionMode === 'multiple'">
          <free-tcheckbox [checked]="dt.totalChecked" #checkbox (onClick)="dt.rowClick($event)">
          </free-tcheckbox>
        </div>
        <div class="free-datatable-head-text" *ngIf="dt.selectionMode === 'single'">
        </div>
      </div>
    </th>
    <ng-template ngFor [ngForOf]="columns" let-col let-lastCol="last">
      <th class="free-datatable-head" [ngStyle]="col.style">
        <div class="free-datatable-head-inner">
          <div class="free-datatable-head-text">
            <span *ngIf="!col.headerTemplate">{{col.header}}</span>
            <free-template *ngIf="col.headerTemplate" [template]="col.headerTemplate">
            </free-template>
            <span *ngIf="dt.sort || col.sort" class="free-datatable-sort">
              <i class="fa fa-caret-up" (click)="dt.onColumnSort(col, -1, $event)"></i>
              <i class="fa fa-caret-down" (click)="dt.onColumnSort(col, 1, $event)"></i>
            </span>
          </div>
          <span class="free-column-resizer" *ngIf="dt.resizable && !lastCol && dt.border"
                (mousedown)="dt.columnResizeStart($event)"></span>
        </div>
      </th>
    </ng-template>
  `
})
export class DatatableHeaderComponent {
  @Input('fTableHeader') columns: DatatableColumnComponent[];
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}
}

@Component({
  selector: '[fTableBody]',
  template: `
    <ng-template ngFor let-rowData [ngForOf]="dt.data" let-i=index>
      <tr class="free-datatable-row" [class.free-selected]="rowData.selected">
        <td *ngIf="dt.expandableRows" class="free-datatable-cell">
          <div class="free-datatable-cell-inner">
            <i class="fa fa-angle-right free-expand-arrow" (click)="dt.toggleRow(rowData)"
               [class.fa-angle-down]="dt.isRowExpand(rowData)"></i>
          </div>
        </td>
        <td *ngIf="dt.order" class="free-datatable-cell">
          <div class="free-datatable-cell-inner">
            {{i + 1 + dt.first}}
          </div>
        </td>
        <td *ngIf="dt.selectionMode" class="free-datatable-cell">
          <div class="free-datatable-cell-inner" *ngIf="dt.selectionMode === 'multiple'">
            <free-tcheckbox (onClick)="dt.onCheckboxItemClick($event, rowData, i)"></free-tcheckbox>
          </div>
          <div class="free-datatable-cell-inner" *ngIf="dt.selectionMode === 'single'">
            <free-tradio (onClick)="dt.onRadioItemClick($event, rowData, i)"></free-tradio>
          </div>
        </td>
        <ng-template ngFor [ngForOf]="columns" let-col let-colIndex="index">
          <td class="free-datatable-cell"
              [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan">
            <div class="free-datatable-cell-inner">
              <span *ngIf="!col.cellTemplate">{{rowData[col.field]}}</span>
              <free-column-template *ngIf="col.cellTemplate" [column]="col" [rowData]="rowData"
                                    [rowIndex]="i" [template]="col.cellTemplate">
              </free-column-template>
              <div class="free-cell-editor" *ngIf="col.editable">
                <input type="text" value="{{rowData[col.field]}}">
              </div>
            </div>
          </td>
        </ng-template>
      </tr>
      <tr class="free-datatable-row" *ngIf="dt.expandableRows && dt.isRowExpand(rowData)">
        <td class="free-datatable-cell" [attr.colspan]="dt.getColumnLength()">
          <div class="free-datatable-cell-inner">
            <free-expansion-row [template]="dt.rowExpansionTemplate"
                                [rowIndex]="i" [rowData]="rowData"></free-expansion-row>
          </div>
        </td>
      </tr>
    </ng-template>
    <tr *ngIf="dt.isEmpty">
      <td [attr.colspan]="columns.length">{{dt.emptyMessage}}</td>
    </tr>
  `
})
export class DatatableBodyComponent {
  @Input('fTableBody') columns: DatatableColumnComponent[];
  constructor(@Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}
}

@Component({
  selector: 'free-datatable-scrollable',
  template: `
    <div class="free-datatable-scrollable">
      <div class="free-datatable-scrollable-head">
        <div class="free-datatable-head-wrapper" #tableHead>
          <table>
            <colgroup class="free-datatable-scrollable-colgroup">
              <col *ngFor="let col of columns" [ngStyle]="col.style"/>
            </colgroup>
            <thead>
            <tr [fTableHeader]="columns"></tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="free-datatable-body free-iscroll" [ngStyle]="{'max-height': dt.scrollHeight}" #tableBody>
        <div class="free-datatable-body-wrapper">
          <table>
            <colgroup class="free-datatable-scrollable-colgroup">
              <col *ngFor="let col of columns" [ngStyle]="col.style"/>
            </colgroup>
            <tbody [fTableBody]="columns"></tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class DatatableScrollableComponent implements AfterViewInit {

  @Input() columns: DatatableColumnComponent[];
  @ViewChild('tableHead') headViewChild: ElementRef;
  scrollHead: HTMLDivElement;
  constructor(public domRenderer: DomRenderer,
              @Inject(forwardRef(() => DatatableComponent)) public dt: DatatableComponent) {}

  ngAfterViewInit() {
    this.scrollHead = this.headViewChild.nativeElement;
    this.initScrolling();
  }

  initScrolling() {
    this.scrollHead.style.marginRight = this.domRenderer.getScrollbarWidth() + 'px';
  }
}

@Component({
  selector: 'free-datatable',
  template: `
    <div class="free-datatable" #container>
      <div class="free-datatable-table" *ngIf="!scrollable">
        <table>
          <thead>
          <tr [fTableHeader]="columns"></tr>
          </thead>
          <tbody [fTableBody]="columns"></tbody>
        </table>
      </div>
      <ng-template [ngIf]="scrollable">
        <free-datatable-scrollable [columns]="columns"></free-datatable-scrollable>
      </ng-template>
      <div class="free-datatable-footer" *ngIf="pagination">
        <free-pagination [total]="total" [row]="row" (onPageChange)="onPageChange($event)"></free-pagination>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class DatatableComponent implements AfterViewInit, OnDestroy {

  @Input() pagination: boolean;
  @Input() selectionMode: string;
  @Input() striped: boolean;
  @Input() scrollable: boolean;
  @Input() border: boolean;
  @Input() hover: boolean;
  @Input() row: number;
  @Input() editable: boolean;
  @Input() sort: boolean;
  @Input() expandableRows: boolean;
  @Input() scrollHeight: number;
  @Input() resizable: boolean;
  @Input()
  set value(value: any[]) {
    this._value = value;
    this.radioSelection = [];
    this.checkboxSelection = [];
    this.totalChecked = false;
    this.page = 1;
    this.total = this.value.length;
    this.filterValue(this.page);
  }

  get value(): any[] {
    return this._value;
  }

  @Input() order: boolean;
  @Input() emptyMessage: string;
  @ViewChild('container') container: ElementRef;
  @ContentChildren(FreeTemplateDirective) templates: QueryList<FreeTemplateDirective>;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ContentChildren(DatatableColumnComponent) cols: QueryList<DatatableColumnComponent>;
  columns: any[];
  checkboxSelection: any;
  radioSelection: any;
  checkboxs: TCheckboxComponent[];
  radios: TRadioComponent[];
  total: number;
  isEmpty: boolean;
  page: number;
  first: number;
  data: any[];
  _value: any[];
  totalChecked: boolean;
  expandedRows: any;
  columnResizeStartX: number;
  currentResizeCell: any;
  columnResizeMoveX: number;
  resizeDown: boolean;
  rowExpansionTemplate: TemplateRef<any>;
  documentMousemoveListener: any;
  documentMouseupListener: any;

  constructor(public renderer2: Renderer2, public domRenderer: DomRenderer) {
    this.columns = [];
    this.checkboxSelection = [];
    this.radioSelection = [];
    this.emptyMessage = '暂无数据';
    this.page = 1;
    this.first = 0;
    this.checkboxs = [];
    this.radios = [];
  }

  ngAfterViewInit() {
    this.initColumns();
    const _container = this.container.nativeElement;
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
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'rowexpansion':
          this.rowExpansionTemplate = item.template;
          break;
      }
    });
    this.initColumnResize();
  }

  initColumns() {
    this.columns = this.cols.toArray();
  }

  initColumnResize() {
    this.documentMousemoveListener = this.domRenderer.listen('document', 'mousemove', (e) => {
      if (this.resizeDown) {
        const nextSibling = this.currentResizeCell.nextElementSibling;
        this.currentResizeCell.style.width = this.currentResizeCell.offsetWidth
          + this.columnResizeMoveX + 'px';
        nextSibling.style.width = nextSibling.offsetWidth - this.columnResizeMoveX + 'px';
        this.columnResizeMoveX = e.pageX - this.columnResizeStartX;
        this.columnResizeStartX = e.pageX;
      }
    });
    this.documentMouseupListener = this.renderer2.listen('document', 'mouseup', () => {
      if (this.resizeDown) {
        this.resizeDown = false;
      }
    });
  }

  columnResizeStart(event: any) {
    this.resizeDown = true;
    this.currentResizeCell = event.target.parentNode.parentNode;
    this.columnResizeStartX = event.pageX;
    this.columnResizeMoveX = 0;
  }

  addCheckbox(checkbox: TCheckboxComponent) {
    this.checkboxs.push(checkbox);
  }

  addRadio(radio: TRadioComponent) {
    this.radios.push(radio);
  }

  getColumnLength() {
    let length = this.columns.length;
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
  }

  onColumnSort(column: DatatableColumnComponent, desc: number, event: any) {
    const target = event.target;
    const sort = target.parentNode.children;
    for (let i = 0; i < sort.length; i++) {
      this.renderer2.removeClass(sort[i], 'free-sort-active');
    }
    this.renderer2.addClass(target, 'free-sort-active');
    column.desc = (desc === 1);
    const field = column.field;
    const vx = desc;
    this.data.sort((a, b) => {
      const v1 = a[field];
      const v2 = b[field];
      if (v1 > v2) {
        return vx;
      } else if (v1 < v2) {
        return -vx;
      } else {
        return 0;
      }
    });
  }

  toggleRow(row: any) {
    if (!this.expandedRows) {
      this.expandedRows = [];
    }

    const rowIndex = this.findRowExpand(row);

    if (rowIndex !== -1) {
      this.expandedRows.splice(rowIndex, 1);
    } else {
      this.expandedRows.push(row);
    }
  }

  findRowExpand(row: any) {
    let index = -1;
    if (this.expandedRows) {
      for (let i = 0; i < this.expandedRows.length; i++) {
        if (row === this.expandedRows[i]) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  isRowExpand(row: any) {
    return this.findRowExpand(row) !== -1;
  }

  findCell(elem: any, tagName: string) {
    let cell = elem;
    while (cell && cell.tagName !== tagName) {
      cell = elem.parentNode;
    }
    return cell;
  }

  filterValue(page: number) {
    if (this.pagination) {
      this.first = this.row * (page - 1);
      this.data = this._value.filter((item, index) => {
        return (index >= this.first && index < this.row * page);
      });
    } else {
      this.data = this._value;
    }
  }

  onPageChange(event: any) {
    this.filterValue(event.activeIndex);
    this.checkboxSelection = [];
    this.totalChecked = false;
  }

  rowClick(event: any) {
    this.checkboxSelection = [];
    if (this.selectionMode) {
      const checkboxs = this.checkboxs;
      for (let i = 1; i < checkboxs.length; i++) {
        checkboxs[i].checked = event.checked;
      }
      if (event.checked) {
        for (const v of this.data) {
          this.checkboxSelection.push(v);
        }
      } else {
        this.checkboxSelection = [];
      }
      this.totalChecked = event.checked;
      this.onSelectChange();
    }
  }

  onCheckboxItemClick(event, rowData, i) {
    if (this.selectionMode) {
      if (event.checked && !this.totalChecked) {
        this.checkboxSelection.push(rowData);
      }
      let length = this.checkboxSelection.length;
      if (!event.checked) {
        while (length) {
          length--;
          if (this.checkboxSelection[length] === rowData) {
            this.checkboxSelection.splice(length, 1);
          }
        }
      }
      this.totalChecked = this.checkOfSelect();
      this.onSelectChange();
    }
  }

  onRadioItemClick(event, rowData, i) {
    if (this.selectionMode) {
      if (event.checked) {
        for (const r of this.radios) {
          r.checked = false;
        }
        this.radios[i].checked = true;
        this.radioSelection = [rowData];
      } else if (!event.checked) {
        this.radios[i].checked = false;
      }
      this.onSelectChange();
    }
  }

  onSelectChange() {
    if (this.selectionMode === 'multiple') {
      this.onSelect.emit({
        total: this.totalChecked,
        value: this.checkboxSelection
      });
    } else if (this.selectionMode === 'single') {
      this.onSelect.emit({
        value: this.radioSelection
      });
    }
  }

  checkOfSelect() {
    return this.checkboxSelection.length === this.data.length;
  }

  unbindDocumentMouseListener() {
    if (this.documentMousemoveListener) {
      this.documentMousemoveListener();
      this.documentMousemoveListener = null;
    }
    if (this.documentMouseupListener) {
      this.documentMouseupListener();
      this.documentMouseupListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentMouseListener();
  }
}

@NgModule({
  imports: [CommonModule, PaginationModule, ShareModule],
  declarations: [TCheckboxComponent, TRadioComponent, ExpansionRowComponent,
    DatatableBodyComponent, DatatableHeaderComponent,
    DatatableColumnComponent, DatatableComponent,
    DatatableScrollableComponent],
  exports: [DatatableComponent, DatatableColumnComponent, ShareModule]
})

export class DatatableModule {
}

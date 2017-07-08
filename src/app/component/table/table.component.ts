import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, Output, ViewChild, ViewChildren,
  ContentChildren, ElementRef, QueryList, EventEmitter, Renderer2, TemplateRef, ContentChild,
} from '@angular/core';
import {PaginationModule} from '../pagination/pagination.component';
import {ShareModule} from '../common/share';
@Component({
  selector: 'free-tcheckbox',
  template: `
    <label class="free-checkbox">
      <div class="free-checkbox-inner">
        <input type="checkbox" #rb value="{{title}}"
               [checked]="checked" name="{{checkboxName}}" (change)="onChange($event)">
        <div class="free-checkbox-ins"></div>
      </div>
      <div class="free-checkbox-title">{{title}}</div>
    </label>
  `
})
export class TCheckboxComponent implements OnInit, AfterViewInit {

  @Input() checkboxName: string;
  @Input() title: string;
  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @ViewChild('rb') checkboxViewChild: ElementRef;
  checkbox: HTMLInputElement;

  constructor() { }

  ngOnInit() {
    if (!this.checked) {
      this.checked = false;
    }
  }

  ngAfterViewInit() {
    this.checkbox = this.checkboxViewChild.nativeElement;
  }

  onChange(e: Event) {
    this.checked = this.checkbox.checked;
    this.onClick.emit({
      value: this.checkbox.value,
      checked: this.checkbox.checked
    });
  }

}

@Component({
  selector: 'free-table',
  template: `
    <div class="free-table" #container>
      <table>
        <thead>
          <tr>
            <th class="free-table-head" *ngIf="selection">
              <div class="free-table-head-inner">
                <div class="free-table-head-text">
                  <free-tcheckbox #checkbox (onClick)="optionClick($event)"></free-tcheckbox>
                </div>
              </div>
            </th>
            <th class="free-table-head" *ngFor="let head of heads">
              <div class="free-table-head-inner">
                <div class="free-table-head-text">
                  <span *ngIf="!head.headerTemplate">{{head.title}}</span>
                  <free-template *ngIf="head.headerTemplate" [template]="head.headerTemplate"></free-template>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody *ngFor="let body of bodys">
          <tr class="free-table-row" *ngFor="let row of body.rows; let i = index"
              (click)="onSelect(row, i)" [class.free-selected]="row.selected">
            <td *ngIf="selection" class="free-table-cell">
              <div class="free-table-cell-inner">
                <free-tcheckbox (onClick)="itemClick($event, row, i)"></free-tcheckbox>
              </div>
            </td>
            <td class="free-table-cell" *ngFor="let cell of row.cells"
                [attr.colspan]="cell.colspan" [attr.rowspan]="cell.rowspan">
              <div class="free-table-cell-inner">
                <span *ngIf="!cell.cellTemplate">{{cell.value}}</span>
                <free-template *ngIf="cell.cellTemplate" [template]="cell.cellTemplate"></free-template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="free-table-footer" *ngIf="pagination">
        <free-pagination [total]="bodys[0].rows.length"></free-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() pagination: boolean;
  @Input() selection: boolean;
  @Input() striped: boolean;
  @Input() border: boolean;
  @Input() hover: boolean;
  @ViewChild('container') container: ElementRef;
  @ViewChildren(TCheckboxComponent) checkboxs: QueryList<TCheckboxComponent>;
  @ViewChild('checkbox') checkbox: TCheckboxComponent;
  heads: TableHeadComponent[] = [];
  bodys: TableBodyComponent[] = [];
  selected: any[] = [];

  constructor(private renderer2: Renderer2) { }
  ngOnInit() {}

  ngAfterViewInit() {
    const _container = this.container.nativeElement;
    if (this.striped) {
      this.renderer2.addClass(_container, 'free-table-striped');
    }
    if (this.border) {
      this.renderer2.addClass(_container, 'free-table-bordered');
    }

    if (this.hover || this.selection) {
      this.renderer2.addClass(_container, 'free-table-hover');
    }
  }

  addHead(value: TableHeadComponent) {
    this.heads.push(value);
  }

  addBody(value: TableBodyComponent) {
    this.bodys.push(value);
  }

  optionClick($event) {
    if (this.selection) {
      const checkboxs = this.checkboxs.toArray();
      checkboxs.shift();
      for (const checkbox of checkboxs) {
        checkbox.checked = $event.checked;
      }

      for (const body of this.bodys) {
        for (const row of body.rows) {
          row.selected = !row.selected;
        }
      }
    }
  }

  itemClick($event, row, i) {
   if (this.selection) {
     row.selected = !row.selected;
     const checkboxs = this.checkboxs.toArray();
     checkboxs.shift();
     checkboxs[i].checked = row.selected;
     if ($event.checked) {
       this.selected.push($event);
     };
     this.checkbox.checked = this.checkOfSelect();
   }
  }

  onSelect(row, i) {
   if (this.selection) {
     row.selected = !row.selected;
     const checkboxs = this.checkboxs.toArray();
     checkboxs.shift();
     checkboxs[i].checked = row.selected;

     this.checkbox.checked = this.checkOfSelect();
   }
  }

  checkOfSelect() {
    let num = 0;
    let rowNum = 0;
    for (const body of this.bodys) {
      rowNum += body.rows.length;
      for (const row of body.rows) {
        if (row.selected) {
          num++;
        }
      }
    }

    if (rowNum === num) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'free-table-header',
  template: ``
})

export class TableHeaderComponent {

}

@Component({
  selector: 'free-table-head',
  template: `<ng-content></ng-content>`
})

export class TableHeadComponent implements OnInit, AfterViewInit {

  @Input() sortable: boolean;
  @Input() rowspan: string;
  @Input() colspan: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  public headerTemplate: TemplateRef<any>;
  title: string;
  protected table: any;
  constructor(table: TableComponent, private er: ElementRef) {
    this.table = table;
  }

  ngOnInit() {
    this.table.addHead(this);
  }

  ngAfterViewInit() {
    this.title = this.er.nativeElement.innerHTML;
    this.headerTemplate = this.template;
  }

}

@Component({
  selector: 'free-table-row',
  template: `<ng-content></ng-content>`
})

export class TableRowComponent implements OnInit {

  cells: TableCellComponent[] = [];
  selected: boolean;

  constructor() {}

  ngOnInit() {}

  addCell(value: TableCellComponent) {
    this.cells.push(value);
  }
}

@Component({
  selector: 'free-table-body',
  template: `<ng-content></ng-content>`
})

export class TableBodyComponent implements OnInit, AfterViewInit {

  @ContentChildren(TableRowComponent) _rows: QueryList<TableRowComponent>;
  rows: TableRowComponent[] = [];
  protected table: TableComponent;

  constructor(table: TableComponent) {
    this.table = table;
  }

  ngOnInit() {
    this.table.addBody(this);
  }

  ngAfterViewInit() {
    this.rows = this._rows.toArray();
  }
}

@Component({
  selector: 'free-table-cell',
  template: `<ng-content></ng-content>`
})

export class TableCellComponent implements OnInit, AfterViewInit {

  protected row: TableRowComponent;
  @Input() colspan: number;
  @Input() rowspan: number;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  public cellTemplate: TemplateRef<any>;
  value: string;
  constructor(row: TableRowComponent, private er: ElementRef) {
    this.row = row;
  }

  ngOnInit() {
    this.row.addCell(this);
  }

  ngAfterViewInit() {
    this.cellTemplate = this.template;
    this.value = this.er.nativeElement.innerHTML;
  }
}

@NgModule({
  imports: [CommonModule, PaginationModule, ShareModule],
  declarations: [TCheckboxComponent, TableHeaderComponent, TableRowComponent,
    TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent],
  exports: [TCheckboxComponent, TableHeaderComponent, TableRowComponent,
    TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent]
})

export class TableModule {}

import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, Input, ViewChild,
  ContentChildren, ElementRef, QueryList, Renderer2, TemplateRef, ContentChild,
} from '@angular/core';
import {PaginationModule} from '../pagination/pagination.component';
import {ShareModule} from '../common/share';

@Component({
  selector: 'free-table',
  template: `
    <div class="free-table" #container>
      <table>
        <thead>
          <tr>
            <th class="free-table-head" *ngFor="let head of heads">
              <div class="free-table-head-inner">
                <div class="free-table-head-text">
                  <span *ngIf="!head.headerTemplate">{{head.title}}</span>
                  <free-template *ngIf="head.headerTemplate" [template]="head.headerTemplate">
                  </free-template>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody *ngFor="let body of bodys">
          <tr class="free-table-row" *ngFor="let row of body.rows;">
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
    </div>
  `
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() striped: boolean;
  @Input() border: boolean;
  @Input() hover: boolean;
  @Input() row: number;
  heads: TableHeadComponent[];
  bodys: TableBodyComponent[];
  total: number;
  @ViewChild('container') container: ElementRef;

  constructor(public renderer2: Renderer2) {
    this.total = 0;
    this.heads = [];
    this.bodys = [];
  }
  ngOnInit() {}

  ngAfterViewInit() {
    const _container = this.container.nativeElement;
    if (this.striped) {
      this.renderer2.addClass(_container, 'free-table-striped');
    }
    if (this.border) {
      this.renderer2.addClass(_container, 'free-table-bordered');
    }

    if (this.hover) {
      this.renderer2.addClass(_container, 'free-table-hover');
    }
  }

  addHead(value: TableHeadComponent) {
    this.heads.push(value);
  }

  addBody(value: TableBodyComponent) {
    this.bodys.push(value);
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

  @Input() rowspan: string;
  @Input() colspan: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  title: string;
  protected table: any;
  constructor(table: TableComponent, public er: ElementRef) {
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

export class TableRowComponent {
  @Input() header: string;
  cells: TableCellComponent[] = [];
  table: any;

  constructor() {}

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
  constructor(row: TableRowComponent, public er: ElementRef) {
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
  declarations: [TableRowComponent, TableHeaderComponent,
    TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent],
  exports: [TableRowComponent, TableHeaderComponent,
    TableHeadComponent, TableCellComponent, TableBodyComponent, TableComponent]
})

export class TableModule {}

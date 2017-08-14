import { CommonModule } from '@angular/common';
import {NgModule, Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';

@Component({
  selector: 'free-pagination',
  template: `
    <div class="free-pagination">
      <ul>
        <free-pagination-item [disabled]="isFirstPage" (click)="changePageToFirst()">
          <i class="fa fa-backward"></i>
        </free-pagination-item>
        <free-pagination-item [disabled]="isFirstPage" (click)="changePageToPrev()">
          <i class="fa fa-angle-left"></i>
        </free-pagination-item>
        <free-pagination-item *ngIf="startEllipsis">
          1
        </free-pagination-item>
        <free-pagination-item [disabled]="true" *ngIf="startEllipsis">
          …
        </free-pagination-item>
        <free-pagination-item *ngFor="let page of _total;" [active]="page === activeIndex"
                              (click)="changePage(page)">
          {{page}}
        </free-pagination-item>
        <free-pagination-item [disabled]="true" *ngIf="endEllipsis">
          …
        </free-pagination-item>
        <free-pagination-item *ngIf="pageCount > maxPage && !isLastPage && endEllipsis"
                              (click)="changePage(pageCount)">
          {{pageCount}}
        </free-pagination-item>
        <free-pagination-item [disabled]="isLastPage" (click)="changePageToNext()">
          <i class="fa fa-angle-right"></i>
        </free-pagination-item>
        <free-pagination-item [disabled]="isLastPage" (click)="changePageToLast()">
          <i class="fa fa-forward"></i>
        </free-pagination-item>
      </ul>
    </div>
  `
})
export class PaginationComponent implements AfterViewInit {

  @Input() maxPage: number;
  @Input() row: number;
  @Input()
  set activeIndex(value: number) {
    if (value < 0) {
      value = 1;
    } else if (value > this.pageCount) {
      value = this.pageCount;
    }
    this._activeIndex = value;
  }
  get activeIndex() {
    return this._activeIndex;
  }
  @Input()
  set total(value: number) {
    if (value > 0) {
      this.totalRecord = value;
      this.pageCount = Math.ceil(value / this.row);
      this.countPage(this.maxPage);
      this.checkStartOrEnd();
    }
  }
  get total(): number {
    return this.totalRecord;
  }
  @Output() onPageChange: EventEmitter<object> = new EventEmitter();
  _total = [];
  isFirstPage: boolean;
  isLastPage: boolean;
  pageOffset: number;
  startEllipsis: boolean;
  endEllipsis: boolean;
  start: number;
  end: number;
  pageCount: number;
  totalRecord: number;
  _activeIndex: number;
  isSet: boolean;

  constructor() {
    this.pageOffset = 0;
    this.activeIndex = 1;
    this.row = 10;
    this.maxPage = 5;
  }

  ngAfterViewInit() {
    if (this._activeIndex > 0) {
      this.changePage(this._activeIndex);
      this.isSet = true;
    }
  }

  countPage(end: number, start: number = 0) {
    this._total = [];
    const min = Math.min(end, this.pageCount);
    for (let i = start; i < min; i++) {
      this._total.push(i + 1);
    }
  }

  changePage(index: number) {
    const middle = Math.ceil(this.maxPage / 2);
    if (index <= 1) {
      index = 1;
    } else if (index >= this.getPage()) {
      index = this.getPage();
    }
    this.start = index - middle;
    this.end = Math.min((index + this.maxPage - middle), this.pageCount);
    if (index < this.maxPage) {
      this.end = this.maxPage;
    }
    if (this.end - this.start <= this.maxPage) {
      this.start = this.end - this.maxPage;
    }
    if (this.start <= 0 || index < this.maxPage) {
      this.start = 0;
    }
    this.countPage(this.end, this.start);
    this._activeIndex = index;
    this.checkStartOrEnd();
    if (this.isSet) {
      this.onPageChange.emit({
        activeIndex: this.activeIndex
      });
    }
  }

  getPage() {
    return Math.max(this.maxPage, this.pageCount);
  }

  changePageToNext() {
    if (!this.isLastPage) {
      const index = this.activeIndex + 1;
      this.changePage(index);
    }
  }

  changePageToPrev() {
    if (!this.isFirstPage) {
      const index = this.activeIndex - 1;
      this.changePage(index);
    }
  }

  changePageToFirst() {
    if (!this.isFirstPage) {
      this.changePage(1);
    }
  }

  changePageToLast() {
    if (!this.isLastPage) {
      this.changePage(this.pageCount);
    }
  }

  checkStartOrEnd() {
    this.isFirstPage = false;
    this.isLastPage = false;
    this.startEllipsis = false;
    this.endEllipsis = false;
    if (this.activeIndex === 1) {
      this.isFirstPage = true;
    }
    if (this.activeIndex === this.pageCount) {
      this.isLastPage = true;
    }
    if (this.maxPage < this.pageCount && !this.isLastPage && this.end !== this.pageCount) {
      this.endEllipsis = true;
    }
    if (this.maxPage < this.pageCount && !this.isFirstPage && this.activeIndex >= this.maxPage) {
      this.startEllipsis = true;
    }
  }
}

@Component({
  selector: 'free-pagination-item',
  template: `
    <li class="free-pagination-item" [class.free-pagination-active]="active"
        [class.free-pagination-disabled]="disabled">
      <a><ng-content></ng-content></a>
    </li>
  `
})

export class PaginationItemComponent {
  pagination: any;
  @Input() active: boolean;
  @Input() disabled: boolean;
  constructor(pagination: PaginationComponent) {
    this.pagination = pagination;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, PaginationItemComponent],
  exports: [PaginationComponent, PaginationItemComponent]
})

export class PaginationModule {}

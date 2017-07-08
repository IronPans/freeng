import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'free-pagination',
  template: `
    <div class="free-pagination">
      <ul>
        <free-pagination-item [disabled]="isFirst">
          <i class="fa fa-backward"></i>
        </free-pagination-item>
        <free-pagination-item [disabled]="isFirst">
          <i class="fa fa-angle-left"></i>
        </free-pagination-item>
        <free-pagination-item *ngFor="let pag of _total;trackBy: sort; index as i" [index]="i">
          {{pag + first}}
        </free-pagination-item>
        <free-pagination-item [disabled]="isLast">
          <i class="fa fa-angle-right"></i>
        </free-pagination-item>
        <free-pagination-item [disabled]="isLast">
          <i class="fa fa-forward"></i>
        </free-pagination-item>
      </ul>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _total = [];
  lastIndex: number;
  @Input() page = 8;
  @Input() activeIndex = 0;
  isFirst: boolean;
  isLast: boolean;
  first = 0;

  @Input()
  set total(value: number) {
    for (let i = 0; i < value; i++) {
      this._total.push(i + 1);
    }
  }

  get total(): number {
    return this._total.length;
  }
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.lastIndex = this.total;
  }

  ngOnInit() {
    this.checkStartOrEnd();
  }

  sort(index: number, pag: number) {
    if (this.activeIndex === this.lastIndex) {

    }

    return pag > 1;
  }

  checkStartOrEnd() {
    this.isFirst = (this.activeIndex === 0);
    this.isLast = (this.activeIndex === this.total - 1);
  }

}

@Component({
  selector: 'free-pagination-item',
  template: `
    <li class="free-pagination-item" [class.free-pagination-active]="index == activeIndex"
        [class.free-pagination-disabled]="disabled">
      <a><ng-content></ng-content></a>
    </li>
  `
})

export class PaginationItemComponent implements OnInit {

  activeIndex: number;
  pagination: any;
  @Input() index: number;
  @Input() disabled: boolean;
  constructor(pagination: PaginationComponent) {
    this.pagination = pagination;
  }
  ngOnInit() {
    this.activeIndex = this.pagination.activeIndex;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, PaginationItemComponent],
  exports: [PaginationComponent, PaginationItemComponent]
})

export class PaginationModule {}

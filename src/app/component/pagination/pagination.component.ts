import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'free-pagination-item',
  template: `
    <li class="free-pagination-item">
      <a>{{label}}</a>
    </li>
  `
})

export class PaginationItemComponent implements OnInit {

  @Input() label: number;
  ngOnInit() {}
}

@Component({
  selector: 'free-pagination',
  template: `
    <div class="free-pagination">
      <ul>
        <free-pagination-item *ngFor="let pag of paginator;trackBy: sort" [label]="pag"></free-pagination-item>
      </ul>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginator: any;
  @Input() activeIndex: number;
  @Input() max = 5;
  lastIndex: number;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.lastIndex = this.max;
  }

  ngOnInit() {
  }

  sort(index: number, pag: number) {
    if (this.activeIndex === this.lastIndex) {

    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, PaginationItemComponent],
  exports: [PaginationComponent, PaginationItemComponent]
})

export class PaginationModule {}

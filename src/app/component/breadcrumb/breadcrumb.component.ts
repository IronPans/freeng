import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'free-breadcrumb',
  template: `
      <ol class="free-breadcrumb" #container>
        <ng-template ngFor let-item let-end="last" let-i="index" [ngForOf]="menus">
          <li>
            <span *ngIf="i != 0 && !icon" class="free-breadcrumb-separator">
              {{this.separator}}
            </span>
            <span *ngIf="i != 0 && icon" class="fa fa-{{icon}} free-breadcrumb-separator"></span>
            <a>{{item.name}}</a>
          </li>
        </ng-template>
      </ol>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() menus: any;
  @Input() separator = '/';
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})

export class BreadcrumbModule {}

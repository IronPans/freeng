import { CommonModule } from '@angular/common';
import { NgModule, Component, Input } from '@angular/core';

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
  `
})
export class BreadcrumbComponent {
  @Input() menus: any;
  @Input() separator: string;
  @Input() icon: string;
  constructor() {
    this.separator = '/';
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})

export class BreadcrumbModule {}

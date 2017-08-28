import { CommonModule } from '@angular/common';
import {NgModule, Component, Input, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-breadcrumb',
  template: `
      <ol class="free-breadcrumb" #container>
        <ng-template ngFor let-item let-end="last" let-i="index" [ngForOf]="menus">
          <li>
            <span *ngIf="!type && i != 0 && !icon" class="free-breadcrumb-separator">
              {{separator}}
            </span>
            <span *ngIf="i != 0 && icon" class="fa fa-{{icon}} free-breadcrumb-separator"></span>
            <a [style.background]="backgroundColor" [style.border-color]="backgroundColor">
              <i class="fa fa-{{item.icon}}" *ngIf="item.icon"></i>
              {{item.name}}
            </a>
          </li>
        </ng-template>
      </ol>
  `,
  providers: [DomRenderer]
})
export class BreadcrumbComponent implements AfterViewInit{
  @Input() menus: any;
  @Input() separator: string;
  @Input() icon: string;
  @Input() type: number;
  @Input() backgroundColor: string;
  @ViewChild('container') containerViewChild: ElementRef;
  _container: HTMLOListElement;
  constructor(public domRenderer: DomRenderer) {
    this.separator = '/';
  }

  ngAfterViewInit() {
    this._container = this.containerViewChild.nativeElement;
    if (this.type) {
      this.domRenderer.addClass(this._container, `free-custom-${this.type}`);
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})

export class BreadcrumbModule {}

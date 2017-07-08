import {
  AfterViewInit, Component, ElementRef,
  forwardRef, Inject, Input, NgModule, OnDestroy, ViewChild
} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-contextmenu-item',
  template: `
    <ul class="free-contextmenu-wrapper" [ngClass]="{'free-contextmenu-child': !root}">
      <ng-template ngFor let-child [ngForOf]="item">
        <li class="free-contextmenu-separator" *ngIf="child.separator"></li>
        <li *ngIf="!child.separator" class="free-contextmenu-item" #item
            [ngClass]="{'free-contextmenu-active': item == activeItem,
              'free-contextmenu-disabled': child.disabled}"
            (mouseenter)="onMouseenter($event, child, item)" (mouseleave)="onMouseleave($event)">
          <a *ngIf="!child.routerLink && !child.back" (click)="clickDisabled($event, child)"
             [href]="child.url" [attr.target]="child.target">
            <span><i *ngIf="child.icon" class="fa fa-{{child.icon}}"></i>{{child.label}}</span>
            <span class="fa fa-fw fa-caret-right" *ngIf="child.item"></span>
          </a>
          <a *ngIf="child.routerLink && !child.back" [routerLink]="child.routerLink" (click)="itemClick($event)"
             [href]="child.url" [attr.target]="child.target">
            <span><i *ngIf="child.icon" class="fa fa-{{child.icon}}"></i>{{child.label}}</span>
            <span class="fa fa-fw fa-caret-right" *ngIf="child.item"></span>
          </a>
          <a *ngIf="child.back" (click)="itemClick($event, child)">
            <span><i *ngIf="child.icon" class="fa fa-{{child.icon}}"></i>{{child.label}}</span>
            <span class="fa fa-fw fa-caret-right" *ngIf="child.item"></span>
          </a>
          <free-contextmenu-item [item]="child.item" *ngIf="child.item"></free-contextmenu-item>
        </li>
      </ng-template>
    </ul>
  `,
  providers: [DomRenderer]
})

export class ContextmenuItemComponent {
  @Input() item: any;
  @Input() root: boolean;
  activeItem: any;
  constructor(@Inject(forwardRef(() => ContextmenuComponent)) public contextMenu: ContextmenuComponent,
              private location: Location,
              private domRenderer: DomRenderer) {
  }
  onMouseenter(event: any, child: any, item: any) {
    if (child.disabled) { return; }
    this.activeItem = item;
    const nextElement =  item.children[0].nextElementSibling;
    if (nextElement) {
      const childItem = nextElement.children[0];
      this.position(childItem, item);
    }
  }
  clickDisabled(event: any, item: any) {
    if (!item.url) {
      event.preventDefault();
      return false;
    }
  }
  onMouseleave(event: any) {
    this.activeItem = null;
  }
  position(childItem: any, item: any) {
    const rect = this.domRenderer.getRect(item);
    const [wWidth, wHeight] = [window.innerWidth, window.innerHeight];
    let left = '100%';
    let top = 0;
    let width = childItem.offsetWidth;
    let height = childItem.offsetHeight;
    if (!width) {
      const w = this.domRenderer.getHiddenElementOuterHeight(childItem);
      width = w.width;
      height = w.height;
    }
    if (rect.left + rect.width + width > wWidth) {
      left = '-100%';
    }
    if (rect.top + height > wHeight) {
      top = height - rect.height;
    }
    childItem.style.left = left;
    childItem.style.top = top;
  }
  itemClick(event: any, child?: any) {
    this.contextMenu.hide();
    if (child && child.back) {
      this.location.back();
    }
  }
}

@Component({
  selector: 'free-contextmenu',
  template: `
    <div #container [style.display]="visible ? 'block' : 'none'" class="free-contextmenu">
      <free-contextmenu-item [root]="true" [item]="menu"></free-contextmenu-item>
    </div>
  `,
  styleUrls: ['./contextmenu.component.scss'],
  providers: [DomRenderer]
})
export class ContextmenuComponent implements AfterViewInit, OnDestroy {

  @Input() target: any;
  @Input() menu: any;
  @Input() global: boolean;
  @ViewChild('container') containerViewChild: ElementRef;
  documentClickListener: any;
  childClickListener: any;
  visible: boolean;
  container: HTMLDivElement;

  constructor(private domRenderer: DomRenderer) {
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    this.documentClickListener = this.domRenderer.listen('document', 'click', () => {
      this.hide();
    });
    if (this.global) {
      this.documentClickListener = this.domRenderer.listen('document', 'contextmenu', () => {
        if (this.container) {
          this.show(event);
          event.preventDefault();
        }
      });
    } else if (this.target) {
      this.childClickListener = this.domRenderer.listen(this.target, 'contextmenu', (event) => {
        this.show(event);
        event.stopPropagation();
        event.preventDefault();
      })
    }
  }

  show(event: any) {
    if (this.visible) { return; }
    this.visible = true;
    this.position(event);

    if (event) {
      event.preventDefault();
    }
  }

  position(event: any) {
    if (event) {
      let [left, top] = [event.pageX - document.body.scrollLeft,
        event.pageY - document.body.scrollTop];
      let width = this.container.offsetWidth;
      let height = this.container.offsetHeight;
      if (!width) {
        const w = this.domRenderer.getHiddenElementOuterHeight(this.container);
        width = w.width;
        height = w.height;
      }
      const [wWidth, wHeight] = [window.innerWidth, window.innerHeight];
      if (width + left > wWidth) {
        left -= width;
      }
      if (height + top > wHeight) {
        top -= height;
      }
      this.container.style.left = left + 'px';
      this.container.style.top = top + 'px';
    }
  }

  hide() {
    this.visible = false;
  }
  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
    if (this.childClickListener) {
      this.childClickListener();
      this.childClickListener = null;
    }
    this.container = null;
  }

}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ContextmenuItemComponent, ContextmenuComponent],
  exports: [ContextmenuItemComponent, ContextmenuComponent]
})
export class ContextmenuModule {
}

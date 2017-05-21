import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ButtonModule } from '../button/button.directive';
import { DomRenderer } from '../common/dom';

@Component({
  selector: 'free-dropdown',
  template: `
    <div class="free-dropdown" #container>
      <button #btn class="free-dropdown-header" fButton [color]="color"
          [class.active]="isOpen" (click)="onMouseClick($event)">
        <span class="free-dropdown-header-title" *ngIf="header">{{name}}</span>
        <ng-content select="f-header"></ng-content>
        <span class="fa fa-caret-down d-caret" *ngIf="caret"></span>
      </button>
      <ul #dropdownMenu style="display: none;">
        <li *ngFor="let menu of menus" (click)="onItemClick($event)">
          <i *ngIf="menu.icon" class="fa {{'fa-' + menu.icon}}"></i> {{menu.name}}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('dropdownState', [
      state('active', style({
        transform: 'scaleY(1)',
        opacity: 1
      })),
      state('inactive', style({
        transform: 'scaleY(0)',
        opacity: 0
      })),
      transition('inactive <=> active', animate('300ms ease'))
    ])
  ],
  providers: [DomRenderer]
})
export class DropdownComponent implements OnInit {
  @Input() menus;
  @Input() header: string;
  @Input() direction = 'left';
  @Input() dropdownStateClass: string;
  @Input() color: string;
  @Input() caret = true;
  @ViewChild('btn') button: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;

  isOpen: boolean;
  selfClick: boolean;
  itemClick: boolean;
  documentClickListener: any;
  modal: any;
  constructor(private domRenderer: DomRenderer,
              private renderer2: Renderer2) { }

  ngOnInit() {
    this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
  }

  onMouseClick($event) {
    if (!this.isOpen) {
      this.isOpen = !this.isOpen;
      this.modal = this.renderer2.createElement('div');
      this.renderer2.addClass(this.modal, 'free-dropdown-menu');
      this.renderer2.appendChild(this.modal, this.dropdownMenu.nativeElement);
      const menu = this.modal.querySelector('ul');
      menu.style.display = 'block';
      this.renderer2.removeClass(menu, 'open');
      const rect = this.domRenderer.getRect(this.button.nativeElement);
      this.renderer2.setStyle(menu, 'top', (rect.top + rect.height) + 'px');
      this.renderer2.appendChild(document.body, this.modal);
      if (this.direction === 'left') {
        this.renderer2.setStyle(menu, 'left', rect.left + 'px');
      } else {
        this.renderer2.setStyle(menu, 'transform-origin', 'top right 0');
        this.renderer2.setStyle(menu, 'left', (rect.right - menu.offsetWidth) + 'px');
      }
      const width = menu.offsetWidth;
      this.renderer2.addClass(menu, 'open');
      if (this.isOpen) {
        this.selfClick = true;
        this.onDocumentClickListener();
      }
      this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
    } else {
      this.close();
    }
  }

  onItemClick($event) {
    this.itemClick = true;
  }

  onDocumentClickListener() {
    if (!this.documentClickListener) {
      // 给body绑定点击事件
      this.documentClickListener = this.renderer2.listen('body', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.close();
        };
        this.selfClick = false;
        this.itemClick = false;
      });
    }
  }

  close() {
    this.isOpen = false;
    this.dropdownStateClass = this.isOpen ? 'active' : 'inactive';
    this.renderer2.removeChild(document.body, this.modal);
    this.modal = null;
    this.offDocumentClickListener();
  }

  offDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
}

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})

export class DropdownModule {}

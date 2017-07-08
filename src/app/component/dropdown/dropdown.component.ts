import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, ElementRef,
  ViewChild, Input, Renderer2, AfterViewInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ButtonModule } from '../button/button.directive';
import { DomRenderer } from '../common/dom';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'free-dropdown',
  template: `
    <div class="free-dropdown" #container (mouseover)="onMouseover()" (mouseout)="onMouseout()">
      <button #btn class="free-dropdown-header" fButton [color]="color"
              [class.active]="isOpen" (click)="open($event)">
        <span class="free-dropdown-header-title" *ngIf="header">{{name}}</span>
        <ng-content select="f-header"></ng-content>
        <span class="fa fa-caret-down d-caret" *ngIf="caret"></span>
      </button>
      <div #dropdownMenu class="free-dropdown-menu" [@dropdownState]="isOpen ? 'active' : 'inactive'">
        <ul *ngIf="menus">
          <li *ngFor="let menu of menus" (click)="onItemClick()">
            <a *ngIf="menu.routerLink" [routerLink]="menu.routerLink" [attr.target]="menu.target">
              <i *ngIf="menu.icon" class="fa {{'fa-' + menu.icon}}"></i> {{menu.name}}
            </a>
            <a *ngIf="!menu.routerLink" [href]="menu.url || '#'" (click)="clickDisabled($event, menu)"
               [attr.target]="menu.target">
              <i *ngIf="menu.icon" class="fa {{'fa-' + menu.icon}}"></i> {{menu.name}}
            </a>
          </li>
        </ul>
        <div *ngIf="!menus" class="free-dropdown-wrapper" (click)="onItemClick()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('dropdownState', [
      state('active', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('inactive', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition('inactive <=> active', animate('300ms ease'))
    ])
  ],
  providers: [DomRenderer]
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @Input() menus: any;
  @Input() header: string;
  @Input() direction = 'bottom-left';
  @Input() dropdownStateClass: string;
  @Input() color: string;
  @Input() caret = true;
  @Input() hover: boolean;
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
  }

  clickDisabled(event: any, item: any) {
    if (!item.url) {
      event.preventDefault();
      return false;
    }
  }

  ngAfterViewInit() {
    this.renderer2.addClass(this.dropdownMenu.nativeElement, `free-dropdown-${this.direction}`);
  }

  open(event?: any) {
    if (!this.hover) {
      this.selfClick = true;
      if (!this.isOpen) {
        this.isOpen = !this.isOpen;
      } else {
        this.close();
      }
      this.onDocumentClickListener();
    }
  }

  onMouseover() {
    if (this.hover) {
      this.isOpen = true;
    }
  }

  onMouseout() {
    if (this.hover) {
      this.isOpen = false;
    }
  }

  onItemClick() {
    if (this.hover) {
      this.isOpen = false;
    } else {
      this.close();
    }
  }

  onDocumentClickListener() {
    if (!this.documentClickListener) {
      // 给body绑定点击事件
      this.documentClickListener = this.renderer2.listen('body', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.close();
        }
        this.selfClick = false;
        this.itemClick = false;
      });
    }
  }

  close() {
    this.isOpen = false;
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
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})

export class DropdownModule {}

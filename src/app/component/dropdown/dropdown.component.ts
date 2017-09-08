import { CommonModule } from '@angular/common';
import {
  NgModule, Component, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy, Renderer2
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ButtonModule } from '../button/button.directive';
import { DomRenderer } from '../common/dom';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../common/share';

@Component({
  selector: 'free-dropdown',
  template: `
    <div class="free-dropdown" #container (mouseover)="onMouseover()" (mouseout)="onMouseout()">
      <button #btn class="free-dropdown-header" fButton [theme]="theme"
              [class.active]="isOpen" (click)="open($event)">
        <span class="free-dropdown-header-title" *ngIf="header">{{header}}</span>
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
export class DropdownComponent implements AfterViewInit, OnDestroy {
  @Input() menus: any;
  @Input() header: string;
  @Input() direction = 'bottom-left';
  @Input() theme: string;
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
  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) { }

  clickDisabled(event: any, item: any) {
    if (!item.url) {
      event.preventDefault();
      return false;
    }
  }

  ngAfterViewInit() {
    this.domRenderer.addClass(this.dropdownMenu.nativeElement, `free-dropdown-${this.direction}`);
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

  ngOnDestroy() {
    this.offDocumentClickListener();
  }
}

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent, ShareModule]
})

export class DropdownModule {}

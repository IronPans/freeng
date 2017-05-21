import { CommonModule } from '@angular/common';
import { NgModule, Component, OnInit, AfterViewInit,
  ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { DomRenderer } from '../common/dom';
import { ButtonModule } from '../button/button.directive';
import { fadeInUp } from '../common/animations';

@Component({
  selector: 'free-popover',
  template: `
    <div class="free-popover" #container>
      <button #btn class="free-popover-header" fButton [color]="color"
              [class.active]="isOpen" (click)="onMouseClick($event)">
        <span class="free-popover-header-title" *ngIf="header">{{name}}</span>
        <ng-content select="f-header"></ng-content>
      </button>
      <div class="free-popover-content" #popoverMenu style="display: none;">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./popover.component.scss'],
  animations: [fadeInUp]
})
export class PopoverComponent implements OnInit {
  @Input() menus;
  @Input() header: string;
  @Input() direction = 'left';
  @Input() popoverStateClass: string;
  @Input() color: string;
  @ViewChild('btn') button: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('popoverMenu') popoverMenu: ElementRef;

  isOpen: boolean;
  selfClick: boolean;
  itemClick: boolean;
  documentClickListener: any;
  modal: any;
  constructor(private domRenderer: DomRenderer,
              private renderer2: Renderer2) { }

  ngOnInit() {
    this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
  }

  onMouseClick($event) {
    if (!this.isOpen) {
      this.isOpen = !this.isOpen;
      this.modal = this.renderer2.createElement('div');
      this.renderer2.addClass(this.modal, 'free-popover-menu');
      this.renderer2.appendChild(this.modal, this.popoverMenu.nativeElement);
      const menu = this.modal.querySelector('.free-popover-content');
      menu.style.display = 'block';
      this.renderer2.removeClass(menu, 'open');
      const rect = this.domRenderer.getRect(this.button.nativeElement);
      this.renderer2.setStyle(menu, 'top', (rect.top) + 'px');
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
      this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
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
    this.popoverStateClass = this.isOpen ? 'active' : 'inactive';
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
  declarations: [PopoverComponent],
  exports: [PopoverComponent],
  providers: [DomRenderer]
})

export class PopoverModule {}

import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, Input, EventEmitter,
  Output, AfterViewInit, ViewChild, ElementRef, Renderer2,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'free-select',
  template: `
    <div class="free-select">
      <div class="free-select-input">
        <label (click)="onClick()">{{value}}</label>
      </div>
      <div #menu class="free-select-menu" [@selectState]="activeState"
          (@selectState.start)="transitionStart()" (@selectState.done)="transitionEnd()">
          <div class="free-select-filter" *ngIf="filter"></div>
          <div class="free-select-wrapper">
            <ul>
              <free-select-item *ngFor="let option of options" (onClick)="iClick($event)" 
                [selected]="option == selected"
                                [option]="option"></free-select-item>
            </ul>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('selectState', [
      state('active', style({
        opacity: 1
      })),
      state('inactive', style({
        opacity: 0
      })),
     transition('active <=> inactive', animate('.4s ease'))
    ])
  ]
})
export class SelectComponent implements OnInit, AfterViewInit {

  _options: any;
  opened: boolean;
  activeState: string;
  value: string;
  itemClick: boolean;
  items: SelectItemComponent[] = [];
  _menu: HTMLUListElement;
  selfClick: boolean;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('input') input: ElementRef;

  @Input() placeholder: string;
  @Input() editable: boolean;
  @Input() filter: boolean;
  @Input() selected: any;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input()
  get options(): any {
    return this._options;
  }
  set options(value: any) {
    this._options = value;
  }

  bindDocumentClickListener: Function;

  constructor(private renderer2: Renderer2) {
    this.activeState = 'inactive';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._menu = this.menu.nativeElement;
    if (this.placeholder) {
      this.value = this.placeholder;
    }

    if (this.selected) {
      this.value = this.selected.label;
    }
  }

  addGroup(value: SelectItemComponent) {
    this.items.push(value);
  }

  onDocumentClickListener() {
    if (!this.bindDocumentClickListener) {
      this.bindDocumentClickListener = this.renderer2.listen('body', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.close();
        }
        this.itemClick = false;
        this.selfClick = false;
      });
    }
  }

  offDocumentClickListener() {
    if (this.bindDocumentClickListener) {
      this.bindDocumentClickListener();
      this.bindDocumentClickListener = null;
    }
  }

  onClick() {
    if (!this.editable) {
      this.open();
    }
  }

  open() {
    this.selfClick = true;
    this.activeState = 'active';
    this.opened = true;
    this.onDocumentClickListener();
  }

  close() {
    this.opened = false;
    this.selfClick = false;
    this.activeState = 'inactive';
    this.offDocumentClickListener();
  }

  transitionStart() {
    this.renderer2.setStyle(this._menu, 'display', 'block');
  }

  transitionEnd() {
    if (!this.opened) {
      this.renderer2.setStyle(this._menu, 'display', 'none');
    }
  }

  iClick($event) {
    this.itemClick = $event;
    this.selected = $event;
    this.value = $event.label;
    this.onChange.emit($event);
    this.close();
  }

  setSelected() {
    for (const item of this.items) {
      item['selected'] = false;
    }
  }

}

@Component({
  selector: 'free-select-item',
  template: `
    <li class="free-select-item" [class.free-select-active]="this.selected" (click)="itemClick()">
      <div class="free-select-item-content">
        <span>{{option.label}}</span>
      </div> 
    </li>
  `
})

export class SelectItemComponent implements OnInit {

  @Input() option: any;
  @Input() selected: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  protected selector: SelectComponent;

  constructor(selector: SelectComponent) {
    this.selector = selector;
  }

  ngOnInit() {
    this.selector.addGroup(this);
    this.setActive();
  }

  setActive() {
    if (this.selected) {
      this.selector.setSelected();
    }
  }

  itemClick() {
    this.onClick.emit(this.option);
    this.selector.setSelected();
    this.selected = true;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SelectComponent, SelectItemComponent],
  exports: [SelectComponent, SelectItemComponent]
})

export class SelectModule {}

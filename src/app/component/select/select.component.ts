import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  NgModule, Component, OnInit, Input, EventEmitter,
  Output, AfterViewInit, ViewChild, ElementRef, Renderer2,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FilterValuePipe} from '../pipe/filterValue.pipe';
import {CheckboxModule} from '../checkbox/checkbox.component';

@Component({
  selector: 'free-select',
  template: `
    <div class="free-select">
      <div class="free-select-input" (click)="onClick()">
        <label *ngIf="value">{{value}}</label>
        <label *ngIf="!value">{{pholder}}</label>
      </div>
      <div #menu class="free-select-menu" [@selectState]="activeState" (click)="onMenuClick()"
          (@selectState.start)="transitionStart()" (@selectState.done)="transitionEnd()">
          <div class="free-select-filter" *ngIf="filter">
            <free-checkbox *ngIf="multiple" [checked]="multipleTotal" (onClick)="onMultipleTotal($event)">
            </free-checkbox>
           <div class="free-select-inner">
             <i class="fa fa-search"></i>
             <input type="text" [(ngModel)]="_filterValue" (input)="onFilterChange($event)">
           </div>
          </div>
          <div class="free-select-wrapper iscroll">
            <ul *ngIf="!multiple">
              <free-select-item *ngFor="let option of (options | filterValue: _filterValue : 'label')"
                                (onClick)="iClick($event)"
                [selected]="option == selected"
                                [option]="option"></free-select-item>
            </ul>
            <ul *ngIf="multiple">
              <li *ngFor="let option of (options | filterValue: _filterValue : 'label')">
                <free-checkbox (onClick)="clickMultiple($event, option)"
                               [checked]="option.checked"
                               [label]="option.label" [value]="option.value"></free-checkbox>
              </li>
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
     transition('active <=> inactive', animate('.4s cubic-bezier(.25,.8,.25,1)'))
    ])
  ]
})
export class SelectComponent implements OnInit, AfterViewInit {

  _options: any;
  opened: boolean;
  _filterValue: any;
  activeState: string;
  value: string;
  itemClick: boolean;
  items: SelectItemComponent[] = [];
  _menu: HTMLUListElement;
  selfClick: boolean;
  bindDocumentClickListener: Function;
  @Input() pholder: string;
  @Input() multipleTotal: boolean;
  @Input() editable: boolean;
  @Input() filter: boolean;
  @Input() selected: any;
  @Input() multiple: boolean;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('input') input: ElementRef;
  @Input()
  get options(): any {
    return this._options;
  }
  set options(value: any) {
    this._options = value;
  }

  constructor(private renderer2: Renderer2) {
    this.activeState = 'inactive';
  }

  ngOnInit() {
    if (this.multiple) {
      this.selected = [];
    }
  }

  ngAfterViewInit() {
    this._menu = this.menu.nativeElement;
    if (this.pholder) {
      this.value = this.pholder;
    }

    if (this.selected) {
      this.getValue();
    }
  }

  onMultipleTotal(event: any) {
    this.multipleTotal = event.checked;
    if (this.multipleTotal) {
      this.selected = Array.from(this.options);
    } else {
      this.selected = [];
    }
    for (const option of this.options) {
      option['checked'] = event.checked;
    }
    this.getValue();
  }

  clickMultiple(event: any, option: any) {
    this.multipleTotal = false;
    if (event.checked) {
      option.checked = true;
      this.selected.push(option);
    } else {
      const selected = this.selected;
      let i = selected.length;
      while (i) {
        if (selected[i - 1].value === event.value) {
          this.selected.splice(i - 1, 1);
          this.options[i - 1].checked = false;
        }
        i--;
      }
    }
    this.getValue();
  }

  getValue() {
    this.value = '';
    const selectedValue = [];
    if (Array.isArray(this.selected)) {
      for (const s of this.selected) {
        selectedValue.push(s.label);
      }
      this.value = selectedValue.join(',');
    } else {
      this.value = this.selected.label;
    }
  }

  onFilterChange(event: any) {
  }

  addGroup(value: SelectItemComponent) {
    this.items.push(value);
  }

  onMenuClick() {
    this.itemClick = true;
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
      if (!this.opened) {
        this.open();
      } else {
        this.close();
      }
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
    <li class="free-select-item" [class.free-select-active]="selected" (click)="itemClick()">
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
  imports: [CommonModule, FormsModule, CheckboxModule],
  declarations: [SelectComponent, SelectItemComponent, FilterValuePipe],
  exports: [SelectComponent, SelectItemComponent]
})

export class SelectModule {}

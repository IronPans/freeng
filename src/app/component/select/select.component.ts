import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  NgModule, Component, OnInit, Input, EventEmitter,
  Output, AfterViewInit, ViewChild, ElementRef, Renderer2, forwardRef, OnDestroy,
} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {CheckboxModule} from '../checkbox/checkbox.component';
import {ObjectUtils} from '../common/util';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

@Component({
  selector: 'free-select',
  template: `
    <div class="free-select">
      <div class="free-select-input" (click)="onClick()">
        <label *ngIf="value">{{value}}</label>
        <label *ngIf="!value">{{pholder}}</label>
      </div>
      <div class="free-select-menu" *ngIf="opened" [@selectState]="'in'" (click)="onMenuClick()">
        <div class="free-select-filter" *ngIf="filter">
          <free-checkbox *ngIf="multiple" [checked]="multipleTotal" (onChange)="onMultipleTotal($event)">
          </free-checkbox>
          <div class="free-select-inner">
            <i class="fa fa-search"></i>
            <input type="text" [(ngModel)]="_filterValue" (input)="onFilterChange($event)">
          </div>
        </div>
        <div class="free-select-wrapper free-iscroll">
          <ul *ngIf="!multiple">
            <free-select-item
              *ngFor="let option of filterValue(options, 'label'); index as i"
              (onClick)="onItemClick($event)" [option]="option"></free-select-item>
          </ul>
          <ul *ngIf="multiple">
            <li *ngFor="let option of filterValue(options, 'label')">
              <free-checkbox (onChange)="onCheckboxSelect($event, option)" [checked]="option.checked"
                             [label]="option.label" [value]="option.value"></free-checkbox>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('selectState', [
      state('in', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate3d(0, 80px, 0)'
        }), animate('.4s cubic-bezier(.25,.8,.25,1)')
      ]),
      transition(':leave', animate('.1s', style({
        opacity: 0
      })))
    ])
  ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, ObjectUtils]
})
export class SelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() pholder: string;
  @Input() multipleTotal: boolean;
  @Input() editable: boolean;
  @Input() filter: boolean;
  @Input() selected: any;
  @Input() multiple: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input: ElementRef;

  @Input()
  get options(): any {
    return this._options;
  }

  set options(value: any) {
    this._options = value;
  }

  _options: any;
  opened: boolean;
  _filterValue: any;
  value: string;
  itemClick: boolean;
  items: SelectItemComponent[] = [];
  selfClick: boolean;
  bindDocumentClickListener: Function;
  onModelChange: Function = () => {
  };
  onTouchedChange: Function = () => {
  };

  constructor(public renderer2: Renderer2, public objUtil: ObjectUtils) {
    this.onDocumentClickListener();
  }

  ngOnInit() {
    if (this.multiple) {
      this.selected = [];
    }
  }

  ngAfterViewInit() {
    if (this.pholder) {
      this.value = this.pholder;
    }
  }

  writeValue(value: any) {
    if (value) {
      this.selected = value;
      this.getValue();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
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
    this.getSelectedValue();
  }

  onCheckboxSelect(event: any, option: any) {
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
    this.getSelectedValue();
  }

  compareWith(value: string) {
    let isEqual = false;
    if (value && this.selected) {
      if (Array.isArray(this.selected)) {
        for (const o of this.selected) {
          isEqual = this.objUtil.equals(value, o['value']);
          break;
        }
      } else {
        isEqual = this.objUtil.equals(value, this.selected.value);
      }
    }
    return isEqual;
  }

  onItemClick($event) {
    this.itemClick = $event;
    this.selected = $event;
    this.value = $event.label;
    this.getSelectedValue();
    this.close();
  }

  getValue() {
    this.value = '';
    const selectedValue = [];
    if (Array.isArray(this.selected)) {
      for (const s of this.selected) {
        selectedValue.push(s.label);
      }
      this.value = selectedValue.join(',');
    } else if (this.selected) {
      this.value = this.selected.label;
    }
  }

  getSelectedValue() {
    this.getValue();
    this.onModelChange(this.selected);
    this.onChange.emit(this.selected);
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

  filterValue(options: any[], value: string) {
    if (this.filter && options && Array.isArray(options)) {
      return options.filter((v, k, arr) => {
        const regexp = new RegExp(this._filterValue, 'ig');
        if (regexp.test(v[value])) {
          return true;
        }
      })
    }
    return options;
  }

  open() {
    this.selfClick = true;
    this.opened = true;
  }

  close() {
    this.opened = false;
    this.selfClick = false;
  }

  ngOnDestroy() {
    this.offDocumentClickListener();
  }

}

@Component({
  selector: 'free-select-item',
  template: `
    <li class="free-select-item" [class.free-select-active]="selector.compareWith(option.value)"
        (click)="itemClick()">
      <div class="free-select-item-content">
        <span>{{option.label}}</span>
      </div>
    </li>
  `
})

export class SelectItemComponent implements OnInit {

  @Input() option: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  selector: SelectComponent;

  constructor(selector: SelectComponent) {
    this.selector = selector;
  }

  ngOnInit() {
    this.selector.addGroup(this);
  }

  itemClick() {
    this.onClick.emit(this.option);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule, CheckboxModule],
  declarations: [SelectComponent, SelectItemComponent],
  exports: [SelectComponent, SelectItemComponent]
})

export class SelectModule {
}

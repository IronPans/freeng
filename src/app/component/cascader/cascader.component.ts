import { CommonModule } from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  NgModule, Component, Input, EventEmitter,
  Output, AfterViewInit, ViewChild, ElementRef, Renderer2, ViewContainerRef,
  ComponentFactoryResolver, OnDestroy, forwardRef, Inject
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ObjectUtils} from '../common/util';
import {DomRenderer} from '../common/dom';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CascaderComponent),
  multi: true
};

@Component({
  selector: 'free-cascader-menu',
  template: `
    <div class="free-cascader-menu free-iscroll" #scroll>
      <ul>
        <free-cascader-item (onClick)="itemClick($event, option, i)" [option]="option"
                *ngFor="let option of options; index as i"
                [selected]="option == selected" [class.free-item-expand]="option.children">
        </free-cascader-item>
      </ul>
    </div>
  `
})

export class CascaderMenuComponent implements AfterViewInit {
  @Input() options: any[];
  @Input() selected: any;
  @Input() order: number;
  @Input() index: number;
  @Output() onItemClick: EventEmitter<any> = new EventEmitter();
  @Input()
  set selectedIndex(value: number) {
    this._selectedIndex = value;
    this.setIndex();
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  @ViewChild('scroll') scrollViewChild: ElementRef;
  scroll: HTMLDivElement;
  _selectedIndex: number;
  constructor(@Inject(forwardRef(() => CascaderComponent)) public cascaderComponent: CascaderComponent) {}

  ngAfterViewInit() {
    this.setIndex();
  }

  setIndex() {
    if (typeof this.selectedIndex !== 'undefined') {
      this.selected = this.options[this._selectedIndex];
    }
  }

  scrollTo() {
    if (this.options) {
      this.scroll = this.scrollViewChild.nativeElement;
      this.scroll.scrollTop = this.scroll.scrollHeight / this.options.length * this._selectedIndex;
    }
  }

  itemClick(event: any, option: any, index: number) {
    this.selected = option;
    this._selectedIndex = index;
    this.onItemClick.emit({
      index: index,
      order: this.order
    });
    if (this.order === this.cascaderComponent.lastOrder - 1) {
      this.cascaderComponent.getValue();
      this.cascaderComponent.close();
    }
  }
}

@Component({
  selector: 'free-cascader',
  template: `
    <div class="free-cascader" #container [class.free-cascader-menu-active]="activeState == 'active'">
      <div class="free-cascader-input" (click)="onClick()">
        <label *ngIf="label">{{label}}</label>
        <label *ngIf="!label">{{pholder}}</label>
        <i class="fa fa-angle-down"></i>
      </div>
      <div #menu class="free-cascader-menus" [@cascaderState]="activeState" (click)="onMenuClick()"
           (@cascaderState.start)="transitionStart()" (@cascaderState.done)="transitionEnd()">
        <div class="free-cascader-wrapper">
          <free-cascader-menu [selectedIndex]="firstIndex" [order]="0" [options]="options"
                              #root (onItemClick)="onItemClick($event)">
          </free-cascader-menu>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('cascaderState', [
      state('active', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      state('inactive', style({
        opacity: 0,
        transform: 'translate3d(0, 80px, 0)'
      })),
      transition('active <=> inactive', animate('.4s cubic-bezier(.25,.8,.25,1)'))
    ])
  ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, ObjectUtils, DomRenderer]
})
export class CascaderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() pholder: string;
  @Input() separator: string;
  @Input() deploy: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('root', {read: ViewContainerRef}) rootViewContainerRef;
  @ViewChild(CascaderMenuComponent) rootMenuComponent: CascaderMenuComponent;
  @Input()
  get options(): any {
    return this._options;
  }
  set options(value: any) {
    this.reset();
    this._options = value;
    this.setOption(value);
  }
  _options: any;
  _menu: HTMLDivElement;
  container: HTMLDivElement;
  firstIndex: number;
  order: number;
  selectedIndex: number[];
  opened: boolean;
  activeState: string;
  label: string;
  value: any[];
  itemClick: boolean;
  selfClick: boolean;
  lastOrder: number;
  componentRef: any[];
  isSet: boolean;
  bindDocumentClickListener: any;
  onModelChange: Function = () => {};
  onTouchedChange: Function = () => {};

  constructor(public renderer2: Renderer2,
              public objectUtils: ObjectUtils,
              public domRenderer: DomRenderer,
              public _componentFactoryResolver: ComponentFactoryResolver) {
    this.activeState = 'inactive';
    this.order = 1;
    this.componentRef = [];
    this.selectedIndex = [];
    this.options = [];
    this.separator = '/';
  }

  ngAfterViewInit() {
    this._menu = this.menu.nativeElement;
    this.container = this.containerViewChild.nativeElement;
    if (this.pholder) {
      this.label = this.pholder;
    }
    if (this.deploy) {
      this.domRenderer.addClass(this.container, 'free-cascader-deploy');
    }
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  createComponent(event: any, options: any) {
    if (!this.componentRef[event.order] && options.length > 0) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(CascaderMenuComponent);
      const componentRef = this.rootViewContainerRef.createComponent(componentFactory);
      const instance = <any>componentRef.instance;
      instance.options = options;
      instance.order = this.order;
      instance.selectedIndex = event.index;
      instance.onItemClick.subscribe((e) => {
        this.onItemClick(e);
      });
      this.componentRef.push(componentRef);
      this.order++;
    }
    this.lastOrder = this.order;
  }

  onItemClick(event: any) {
    this.selectedIndex.length = event.order + 1;
    this.selectedIndex[event.order] = event.index;
    const options = this.getCascaderOption(event.order);
    event.index = null;
    this.createComponent(event, options);
    if (this.componentRef[event.order]) {
        if (options.length <= 0) {
          this.deleteItem(event.order);
        } else {
          (<any>this.componentRef[event.order].instance).options = options;
          this.clearView(event.order);
        }
    }
  }

  clearView(order: number) {
    let i = this.componentRef.length;
    if (i <= 1) {
      return;
    }
    while (i) {
      if (i > order + 1) {
        this.deleteItem(i);
      }
      i--;
    }
  }

  deleteItem(index: number) {
    this.componentRef.splice(index - 1, 1);
    this.rootViewContainerRef.remove(index);
    this.selectedIndex.splice(index - 1, 1);
    this.order--;
    this.lastOrder = this.order;
  }

  getCascaderOption(order: number) {
    let options = this.options[this.selectedIndex[0]].children;
    for (let i = 0; i < order; i++) {
      options = options[this.selectedIndex[i + 1]].children;
    }
    if (!options) {
      options = [];
    }
    return options;
  }

  getValue() {
    const label = [];
    const value = [];
    let options = this.options;
    const length = this.selectedIndex.length;
    for (let i = 0; i < length; i++) {
      const index = this.selectedIndex[i];
      const option = options[index];
      label.push(option.label);
      value.push(option.value);
      if (!option.children) {
        break;
      }
      options = option.children;
    }
    this.label = label.join(this.separator);
    this.value = value;
    if (this.isSet) {
      this.onChange.emit({
        value: value,
        label: this.label
      });
    }
  }

  setOption(value: any) {
    this.isSet = false;
    let options = value;
    const selectedValue = this.value;
    if (selectedValue && options && options.length > 0) {
      selectedValue.forEach((v, index) => {
        options.forEach((option, i) => {
          const isEqual = this.objectUtils.equals(option.value, v);
          if (isEqual) {
            this.selectedIndex[index] = i;
            options = options[i].children;
            if (!options) { options = []; }
          }
        })
      });
      this.firstIndex = this.selectedIndex[0];
      for (let i = 0; i < this.selectedIndex.length - 1; i++) {
        const option = this.getCascaderOption(i);
        this.createComponent({
          order: i + 1,
          index: this.selectedIndex[i + 1]
        }, option);
      }
      this.getValue();
    }
    this.isSet = true;
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
    if (!this.opened) {
      this.open();
    } else {
      this.close();
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
    this.rootMenuComponent.scrollTo();
    for (const com of this.componentRef) {
      com.instance.scrollTo();
    }
  }

  transitionEnd() {
    if (!this.opened) {
      this.renderer2.setStyle(this._menu, 'display', 'none');
    }
  }

  reset() {
    if (this.rootViewContainerRef) {
      this.rootViewContainerRef.clear();
    }
    for (const com of this.componentRef) {
      const instance = <any>com.instance;
      instance.onItemClick.unsubscribe();
    }
    this.componentRef = [];
    this.selectedIndex = [];
    this.order = 1;
  }

  ngOnDestroy() {
    this.reset();
  }

}

@Component({
  selector: 'free-cascader-item',
  template: `
    <li class="free-cascader-item" [class.free-select-active]="selected" title="{{option.label}}"
        (click)="itemClick()">
      <div class="free-cascader-item-content">
        <span>{{option.label}}</span>
      </div>
    </li>
  `
})

export class CascaderItemComponent {

  @Input() option: any;
  @Input() selected: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() hover: boolean;

  constructor() {
  }

  itemClick() {
    this.onClick.emit(this.option);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CascaderMenuComponent, CascaderComponent, CascaderItemComponent],
  exports: [CascaderComponent],
  entryComponents: [CascaderMenuComponent]
})

export class CascaderModule {}


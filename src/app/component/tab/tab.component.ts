import {CommonModule} from '@angular/common';
import {
  NgModule, Component, ContentChildren, ViewChild, OnInit,
  Input, Output, AfterContentInit, QueryList, EventEmitter, ElementRef, Renderer2, AfterViewInit, forwardRef, Inject
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {FreeTemplateDirective, ShareModule} from '../common/share';

@Component({
  selector: 'free-tab-nav',
  template: `
       <ul class="free-tab-navs">
         <li class="free-tab-nav" *ngFor="let tab of tabs; let i = index;"
             [class.active]="tab.selected" [class.free-tab-disabled]="tab.disabled">
           <span (click)="tabClick(i, tab.disabled)">
             <ng-container *ngIf="tab.headerTemplate;else h">
               <free-template [template]="tab.headerTemplate"></free-template>
             </ng-container>
           <ng-template #h>{{tab.header}}</ng-template>
           </span>
         </li>
       </ul>
    `
})

export class TabNavComponent {
  @Input() header: string;
  @Input() tabs: any;
  @Input() direction: string;
  @Output() onTabClick = new EventEmitter();

  tabClick(index: number, disabled: boolean) {
    if (!disabled) {
      this.onTabClick.emit(index);
    }
  }
}

@Component({
  selector: 'free-tab',
  template: `
    <div [ngClass]="tabClass" [class.free-tab-active]="selected ? 'active' : 'inactive'"
         [style.max-height.px]="maxHeight" [class.free-iscroll]="maxHeight">
      <div class="free-tab-wrapper">
        <ng-content></ng-content>
      </div>
    </div>`,
  animations: [
    trigger('tabState', [
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('inactive', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('active <=> inactive', animate('300ms ease'))
    ])
  ]
})

export class TabComponent implements OnInit, AfterViewInit {
  @Input() header: string;
  @Input() disabled: boolean;
  @Input() maxHeight: number;
  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    this.toggleClass();
  }

  tabClass: any;
  _selected: boolean;
  @ContentChildren(FreeTemplateDirective) templates: QueryList<FreeTemplateDirective>;
  headerTemplate: any;
  tabGroupComponent: any;

  constructor(@Inject(forwardRef(() => TabGroupComponent)) tabGroupComponent) {
    this.tabGroupComponent = tabGroupComponent;
  }

  ngAfterViewInit() {
    const temp = this.templates.toArray();
    temp.forEach((t) => {
      if (t.getType() === 'header') {
        this.headerTemplate = t.template;
      }
    });
    this.tabGroupComponent.addGroup(this);
  }

  toggleClass() {
    this.tabClass = {
      'free-tab': true,
      'active': this._selected
    };
  }

  ngOnInit() {
    this.toggleClass();
  }

  setActive(value: boolean) {
    this.selected = value;
  }
}

@Component({
  selector: 'free-tab-group',
  template: `
    <div class="free-tab-group" #group [class.free-tab-vertical]="vertical">
      <free-tab-nav [tabs]="tabs" (onTabClick)="tabClick($event)"></free-tab-nav>
      <div class="free-tab-box">
        <ng-content></ng-content>
      </div>
    </div>
  `
})

export class TabGroupComponent implements AfterContentInit {
  @Input() theme: string;
  @Input() direction: string;
  @Input() activeIndex: number;
  @ViewChild('group') groups: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @Input() maxHeight: number;
  @Input() vertical: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  tabs: TabComponent[];
  constructor(public renderer2: Renderer2) {
    this.activeIndex = 0;
    this.tabs = [];
  }

  ngAfterContentInit() {
    if (this.theme) {
      this.renderer2.addClass(this.groups.nativeElement, 'theme-' + this.theme);
    }
    if (this.direction) {
      this.renderer2.addClass(this.groups.nativeElement, 'free-tab-' + this.direction);
    }
  }

  tabInit() {
    this.open(this.activeIndex);
  }

  open(index: number = 0) {
    if (this.activeIndex >= 0 && this.activeIndex < this.tabs.length) {
      const tabs = this.tabs;
      for (const tab of tabs) {
        tab.setActive(false);
      }
      this.activeIndex = index;
      this.tabs[this.activeIndex].setActive(true);
    }
  }

  tabClick(index: number) {
    const prevIndex = this.activeIndex;
    this.open(index);
    this.onChange.emit({
      prevIndex: prevIndex,
      activeIndex: this.activeIndex
    });
  }

  addGroup(tab: TabComponent) {
    if (this.maxHeight) {
        tab.maxHeight = this.maxHeight;
    }
    this.tabs.push(tab);
    this.tabInit();
  }
}

@NgModule({
  imports: [CommonModule, ShareModule],
  declarations: [TabNavComponent, TabComponent, TabGroupComponent],
  exports: [TabComponent, TabGroupComponent, FreeTemplateDirective]
})

export class TabGroupModule {}

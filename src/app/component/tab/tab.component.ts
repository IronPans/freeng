import {CommonModule} from '@angular/common';
import { NgModule, Component, ContentChildren, ViewChild, OnInit,
  Input, Output, AfterContentInit, QueryList, EventEmitter, ElementRef, Renderer2
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'free-tab-nav',
  template: `
       <ul class="free-tab-navs">
         <li class="free-tab-nav" *ngFor="let tab of tabs; let i = index;"
             [class.active]="tab.selected" [class.free-tab-disabled]="tab.disabled">
           <span (click)="tabClick(i, tab.disabled)">{{tab.header}}</span>
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

export class TabComponent implements OnInit {
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
  @ContentChildren(TabComponent) tabGroup: QueryList<TabComponent>;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  tabs: TabComponent[];
  constructor(public renderer2: Renderer2) {
    this.activeIndex = 0;
  }

  ngAfterContentInit() {
    this.tabInit();
    if (this.theme) {
      this.renderer2.addClass(this.groups.nativeElement, 'theme-' + this.theme);
    }
    if (this.direction) {
      this.renderer2.addClass(this.groups.nativeElement, 'free-tab-' + this.direction);
    }
  }

  tabInit() {
    this.tabs = this.tabGroup.toArray();
    if (this.maxHeight) {
      for (const tab of this.tabs) {
        tab.maxHeight = this.maxHeight;
      }
    }
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
}

@NgModule({
  imports: [CommonModule],
  declarations: [TabNavComponent, TabComponent, TabGroupComponent],
  exports: [TabNavComponent, TabComponent, TabGroupComponent]
})

export class TabGroupModule {}

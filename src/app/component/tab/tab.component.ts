/**
 * Created by tg on 17-4-4.
 */
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
             [class.active]="tab.selected">
           <span (click)="tabClick(i)">{{tab.header}}</span>
         </li>
       </ul>
    `
})

export class TabNavComponent {
  @Input() header: string;
  @Input() tabs: any;
  @Input() direction: string;
  @Output() onTabClick = new EventEmitter();

  constructor() {}

  tabClick(index) {
    this.onTabClick.emit(index);
  }
}

@Component({
  selector: 'free-tab',
  template: `
    <div [ngClass]="tabClass" [@tabState]="selected ? 'active' : 'inactive'">
      <ng-content></ng-content>
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

  constructor() {}

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
    <div class="free-tab-group" #group>
      <free-tab-nav [tabs]="tabs" (onTabClick)="tabClick($event)"></free-tab-nav>
      <div class="free-tab-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tab.component.scss']
})

export class TabGroupComponent implements OnInit, AfterContentInit {
  @Input() theme: string;
  @ViewChild('group') groups: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ContentChildren(TabComponent) tabGroup: QueryList<TabComponent>;
  @Input() direction: string;

  tabs: TabComponent[];
  @Input() activeIndex = 0;
  constructor(private renderer2: Renderer2) {}
  ngOnInit() {}

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

  tabClick(index) {
    this.open(index);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TabNavComponent, TabComponent, TabGroupComponent],
  exports: [TabNavComponent, TabComponent, TabGroupComponent]
})

export class TabGroupModule {}

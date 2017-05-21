import {Component, OnInit, AfterViewInit,
  HostListener, Renderer2, OnDestroy, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ButtonModule} from '../../component/button/button.directive';
import {ScrollModule} from '../../component/scroll/scroll.component';
import {IconModule} from '../../component/icon/icon.component';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {DropdownModule} from '../../component/dropdown/dropdown.component';
import {PopoverModule} from '../../component/popover/popover.component';
import {HamburgeModule} from '../../component/hamburge/hamburge.component';
import {ShareModule} from '../../component/common/share';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {RippleModule} from '../../component/ripple/ripple.directive';
import {RouterModule} from '@angular/router';
import { config } from '../../common/config';
import {BadgeModule} from '../../component/badge/badge.component';
import { DomRenderer } from '../../component/common/dom';
import {ShrinkModule} from '../../component/shrink/shrink.component';

@Component({
  selector: 'free-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DomRenderer]
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string;
  icon: string;
  menuItem: any;
  dropdownItem: any;
  isMini: boolean;
  menus = [];
  searchForm: FormGroup;
  theme = [];
  isOpen: boolean;
  searchState: boolean;
  @HostListener('window:resize') onResize() {
    console.log(1);
  }
  constructor(private renderer2: Renderer2,
              private fb: FormBuilder,
             private route: ActivatedRoute,
             private domRenderer: DomRenderer,
             private pageTitle: Title) { }

  ngOnInit() {
    this.title = '首页';
    this.icon = 'laptop';
    this.menuItem = [{'name': '首页'}, {'name': ''}];
    this.dropdownItem = [{
      'name': 'TGCode',
      'icon': 'user'
    }, {
      'name': '邮件',
      'icon': 'envelope'
    }, {
      'name': '帮助',
      'icon': 'question-circle'
    }, {
      'name': '设置',
      'icon': 'cog'
    }, {
      'name': '登出',
      'icon': 'sign-out'
    }];

    this.searchForm = this.fb.group({
      'keyword': ['']
    });

    this.menus = [
      { 'icon': 'user'},
      { 'icon': 'user'},
      { 'icon': 'user'}
    ];

    this.theme = config.theme;
  }

  ngAfterViewInit() {
    const prefix = this.domRenderer.getWebType();
    this.renderer2.listen('document', 'fullscreenchange', function() {
     this.isOpen = !this.isOpen;
    });
  }

  fullscreenToggle() {
    this.domRenderer.toggleFullScreen();
  }

  ngOnDestroy() {

  }

  toggleAside() {
    this.isMini = !this.isMini;
    if (this.isMini) {
      this.renderer2.addClass(document.body, 'free-mini');
    } else {
      this.renderer2.removeClass(document.body, 'free-mini');
    }
  }

  toggleSearch() {
    this.searchState = !this.searchState;
  }

  onActivate(component) {
    let title = component.pageTitle;
    if (!title) {
      title = 'FreeNG';
    }
    this.pageTitle.setTitle(title);
  }

  onDeactivate(component) {
  }

}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    ScrollModule,
    IconModule,
    AccordionModule,
    DropdownModule,
    PopoverModule,
    HamburgeModule,
    ShareModule,
    GridModule,
    RippleModule,
    BadgeModule,
    ShrinkModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule {}

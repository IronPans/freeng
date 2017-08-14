import {
  Component, OnInit, AfterViewInit,
  HostListener, Renderer2, OnDestroy, ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import { config } from '../common/config';
import { DomRenderer } from '../../component/common/dom';

@Component({
  selector: 'free-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
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
  sidebarActive: boolean;
  @ViewChild('setting') settingBtn; ElementRef;
  @ViewChild('main') main;
  @HostListener('window:resize') onResize() {
    this.resize();
  }
  constructor(public renderer2: Renderer2,
              public fb: FormBuilder,
             public route: ActivatedRoute,
             public domRenderer: DomRenderer,
             public pageTitle: Title) {
    this.resize();
  }

  ngOnInit() {
    this.title = '首页';
    this.icon = 'laptop';
    this.menuItem = [{'name': '首页'}, {'name': ''}];
    this.dropdownItem = [{
      'name': 'TGCode',
      'icon': 'user'
    }, {
      'name': 'GitHub',
      'icon': 'github',
      'url': 'https://github.com/IronPans/freeng',
      'target': '_target'
    }, {
      'name': '帮助',
      'icon': 'question-circle',
      'routerLink': '/main/getting-started'
    }, {
      'name': '系统消息',
      'icon': 'bell-o',
      'routerLink': '/main/changelog'
    }, {
      'name': '登出',
      'icon': 'sign-out',
      'routerLink': '/login'
    }];

    this.searchForm = this.fb.group({
      'keyword': ['']
    });

    this.menus = [
      { 'icon': 'user'},
      { 'icon': 'user'},
      { 'icon': 'user'}
    ];

    this.theme = config.color;
  }

  resize() {
    if (window.innerWidth < 900) {
      this.renderer2.addClass(document.body, 'free-mini');
      this.isMini = true;
    }
  }

  ngAfterViewInit() {
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
    let title = component.pageTitle + '-FreeNG';
    if (!component.pageTitle) {
      title = 'FreeNG';
    }
    this.pageTitle.setTitle(title);
    this.main.nativeElement.scrollTop = 0;
  }

  onDeactivate(component) {
  }

  open(event: any) {
    this.sidebarActive = !this.sidebarActive;

    if (this.sidebarActive) {
      this.renderer2.addClass(this.settingBtn.nativeElement, 'open');
    } else {
      this.renderer2.removeClass(this.settingBtn.nativeElement, 'open');
    }
  }

  sidenavChange(event: any) {
    this.sidebarActive = event.open;

    if (this.sidebarActive) {
      this.renderer2.addClass(this.settingBtn.nativeElement, 'open');
    } else {
      this.renderer2.removeClass(this.settingBtn.nativeElement, 'open');
    }
  }

  selectTheme(value: string) {
    const link = document.getElementById('theme-css');
    link.setAttribute('href', 'assets/themes/' + value + '.css');
  }

}


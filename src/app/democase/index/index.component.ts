import {
  Component, OnInit, AfterViewInit, HostListener, Renderer2, OnDestroy, ViewChild
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import { config } from '../common/config';
import { DomRenderer } from '../../component/common/dom';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'free-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DomRenderer]
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
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
  lang: string;
  type: string;
  @ViewChild('setting') settingBtn; ElementRef;
  @ViewChild('main') main;
  @HostListener('window:resize') onResize() {
    this.resize();
  }
  constructor(public renderer2: Renderer2,
              public fb: FormBuilder,
             public router: Router,
             public route: ActivatedRoute,
              private translate: TranslateService,
             public domRenderer: DomRenderer,
             public pageTitle: Title) {
    this.resize();
  }

  ngOnInit() {
    // this.lang = this.translate.currentLang;
    this.lang = navigator.language || navigator['browserLanguage'];
    this.icon = 'laptop';
    this.menuItem = [{'name': 'Homepage'}, {'name': ''}];
    this.dropdownItem = [
      {
      'name': 'TG',
      'icon': 'user'
    }, {
      'name': 'GitHub',
      'icon': 'github',
      'url': 'https://github.com/IronPans/freeng',
      'target': '_target'
    }, {
      'name': 'Help',
      'icon': 'question-circle',
      'routerLink': '/main/getting-started'
    }, {
      'name': 'Message',
      'icon': 'bell-o',
      'routerLink': '/main/changelog'
    }, {
      'name': 'Logout',
      'icon': 'sign-out',
      'routerLink': '/login'
    }];

    this.translate.use(this.lang);

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

  toSearch(router: string) {
    this.router.navigate(['/main/' + router]);
  }

  changeLanguage() {
    if (this.lang === 'en') {
      this.lang = 'zh-CN';
    } else {
      this.lang = 'en';
    }
    this.translate.use(this.lang);
  }

  reviewMobile() {
    this.type = 'mobile';
  }
}


"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var clipboard_1 = require("clipboard");
var platform_browser_1 = require("@angular/platform-browser");
var button_directive_1 = require("../../component/button/button.directive");
var scroll_component_1 = require("../../component/scroll/scroll.component");
var icon_component_1 = require("../../component/icon/icon.component");
var accordion_component_1 = require("../../component/accordion/accordion.component");
var dropdown_component_1 = require("../../component/dropdown/dropdown.component");
var popover_component_1 = require("../../component/popover/popover.component");
var hamburge_component_1 = require("../../component/hamburge/hamburge.component");
var share_1 = require("../../component/common/share");
var common_1 = require("@angular/common");
var grid_directive_1 = require("../../component/grid/grid.directive");
var ripple_directive_1 = require("../../component/ripple/ripple.directive");
var router_2 = require("@angular/router");
var config_1 = require("../../common/config");
var badge_component_1 = require("../../component/badge/badge.component");
var dom_1 = require("../../component/common/dom");
var shrink_component_1 = require("../../component/shrink/shrink.component");
var IndexComponent = (function () {
    function IndexComponent(renderer2, fb, route, domRenderer, pageTitle) {
        this.renderer2 = renderer2;
        this.fb = fb;
        this.route = route;
        this.domRenderer = domRenderer;
        this.pageTitle = pageTitle;
        this.menus = [];
        this.theme = [];
    }
    IndexComponent.prototype.onResize = function () {
        console.log(1);
    };
    IndexComponent.prototype.ngOnInit = function () {
        this.title = '首页';
        this.icon = 'laptop';
        this.menuItem = [{ 'name': '首页' }, { 'name': '' }];
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
            { 'icon': 'user' },
            { 'icon': 'user' },
            { 'icon': 'user' }
        ];
        this.theme = config_1.config.theme;
    };
    IndexComponent.prototype.ngAfterViewInit = function () {
        var clipboard = new clipboard_1.default('.code-clone', {
            text: function (trigger) {
                return trigger.previousElementSibling.querySelector('code')['clipboardText'];
            }
        });
        clipboard.on('success', function (event) {
            event.clearSelection();
        });
        clipboard.on('error', function (event) {
            console.log(event);
        });
        var prefix = this.domRenderer.getWebType();
        this.renderer2.listen('document', 'fullscreenchange', function () {
            this.isOpen = !this.isOpen;
        });
    };
    IndexComponent.prototype.fullscreenToggle = function () {
        this.domRenderer.toggleFullScreen();
    };
    IndexComponent.prototype.ngOnDestroy = function () {
    };
    IndexComponent.prototype.toggleAside = function () {
        this.isMini = !this.isMini;
        if (this.isMini) {
            this.renderer2.addClass(document.body, 'free-mini');
        }
        else {
            this.renderer2.removeClass(document.body, 'free-mini');
        }
    };
    IndexComponent.prototype.toggleSearch = function () {
        this.searchState = !this.searchState;
    };
    IndexComponent.prototype.onActivate = function (component) {
        var title = component.pageTitle;
        if (!title) {
            title = 'FreeNG';
        }
        this.pageTitle.setTitle(title);
    };
    IndexComponent.prototype.onDeactivate = function (component) {
    };
    return IndexComponent;
}());
__decorate([
    core_1.HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IndexComponent.prototype, "onResize", null);
IndexComponent = __decorate([
    core_1.Component({
        selector: 'free-root',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
        providers: [dom_1.DomRenderer]
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        forms_1.FormBuilder,
        router_1.ActivatedRoute,
        dom_1.DomRenderer,
        platform_browser_1.Title])
], IndexComponent);
exports.IndexComponent = IndexComponent;
var IndexModule = (function () {
    function IndexModule() {
    }
    return IndexModule;
}());
IndexModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            button_directive_1.ButtonModule,
            router_2.RouterModule,
            scroll_component_1.ScrollModule,
            icon_component_1.IconModule,
            accordion_component_1.AccordionModule,
            dropdown_component_1.DropdownModule,
            popover_component_1.PopoverModule,
            hamburge_component_1.HamburgeModule,
            share_1.ShareModule,
            grid_directive_1.GridModule,
            ripple_directive_1.RippleModule,
            badge_component_1.BadgeModule,
            shrink_component_1.ShrinkModule
        ],
        declarations: [
            IndexComponent
        ]
    })
], IndexModule);
exports.IndexModule = IndexModule;
//# sourceMappingURL=index.component.js.map
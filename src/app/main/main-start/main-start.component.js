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
var animations_1 = require("../../component/common/animations");
var common_1 = require("@angular/common");
var panel_component_1 = require("../../component/panel/panel.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var code_component_1 = require("../../component/code/code.component");
var tree_component_1 = require("../../component/tree/tree.component");
var config_1 = require("../../common/config");
var MainStartComponent = (function () {
    function MainStartComponent() {
        this.display = 'block';
    }
    MainStartComponent.prototype.ngOnInit = function () {
        this.version = config_1.config.version;
        this.menus = [
            {
                title: 'freeng',
                expanded: true,
                folder: [
                    {
                        title: 'src',
                        expanded: true,
                        folder: [
                            {
                                title: 'app',
                                folder: [
                                    { title: 'common', file: [{ title: 'config.ts' }] },
                                    { title: 'component' },
                                    { title: 'main' },
                                    { title: 'modules', file: [{ title: 'app-routing.module.ts' }, { title: 'main.module.ts' }] }
                                ],
                                file: [
                                    { title: 'app.module.ts' },
                                    { title: 'app.component.scss' },
                                    { title: 'app.component.ts' },
                                    { title: 'app.component.html' }
                                ]
                            },
                            {
                                title: 'assets'
                            },
                            {
                                title: 'environments'
                            }
                        ],
                        file: [
                            { title: 'favicon.icon' },
                            { title: 'index.html' },
                            { title: 'main.ts' },
                            { title: 'polyfills.ts' },
                            { title: 'styles.css' },
                            { title: 'tsconfig.app.json' },
                            { title: 'typings.d.ts' }
                        ]
                    }
                ],
                file: [
                    {
                        title: '.angular-cli.json'
                    },
                    {
                        title: '.editorconfig'
                    },
                    {
                        title: '.gitignore'
                    },
                    {
                        title: 'package.json'
                    },
                    {
                        title: 'README.md'
                    },
                    {
                        title: 'tsconfig.json'
                    }
                ]
            }
        ];
    };
    return MainStartComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainStartComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainStartComponent.prototype, "display", void 0);
MainStartComponent = __decorate([
    core_1.Component({
        selector: 'free-main-start',
        templateUrl: './main-start.component.html',
        styleUrls: ['./main-start.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainStartComponent);
exports.MainStartComponent = MainStartComponent;
var MainStartModule = (function () {
    function MainStartModule() {
    }
    return MainStartModule;
}());
MainStartModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule,
            code_component_1.CodeModule,
            tree_component_1.TreeModule
        ],
        declarations: [MainStartComponent]
    })
], MainStartModule);
exports.MainStartModule = MainStartModule;
//# sourceMappingURL=main-start.component.js.map
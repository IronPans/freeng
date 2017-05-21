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
var image_component_1 = require("../../component/image/image.component");
var panel_component_1 = require("../../component/panel/panel.component");
var grid_directive_1 = require("../../component/grid/grid.directive");
var MainGalleryComponent = (function () {
    function MainGalleryComponent() {
        this.display = 'block';
        this.images = [];
    }
    MainGalleryComponent.prototype.ngOnInit = function () {
        this.images = [
            { 'src': '/src/assets/Images/landscape1.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape2.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape3.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape7.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape8.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape11.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape16.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape17.jpg', 'alt': 'image', 'highlight': true },
            { 'src': '/src/assets/Images/landscape18.jpg', 'alt': 'image', 'highlight': true }
        ];
    };
    return MainGalleryComponent;
}());
__decorate([
    core_1.HostBinding('@fadeInUpState'),
    __metadata("design:type", Object)
], MainGalleryComponent.prototype, "fadeInUpState", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object)
], MainGalleryComponent.prototype, "display", void 0);
MainGalleryComponent = __decorate([
    core_1.Component({
        selector: 'free-main-gallery',
        templateUrl: './main-gallery.component.html',
        styleUrls: ['./main-gallery.component.scss'],
        animations: [animations_1.fadeInUp]
    }),
    __metadata("design:paramtypes", [])
], MainGalleryComponent);
exports.MainGalleryComponent = MainGalleryComponent;
var MainGalleryModule = (function () {
    function MainGalleryModule() {
    }
    return MainGalleryModule;
}());
MainGalleryModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            image_component_1.ImageModule,
            panel_component_1.PanelModule,
            grid_directive_1.GridModule
        ],
        declarations: [MainGalleryComponent]
    })
], MainGalleryModule);
exports.MainGalleryModule = MainGalleryModule;
//# sourceMappingURL=main-gallery.component.js.map

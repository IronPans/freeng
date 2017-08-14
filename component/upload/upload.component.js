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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var UploadComponent = (function () {
    function UploadComponent(renderer2) {
        this.renderer2 = renderer2;
        this.onChange = new core_1.EventEmitter();
        this.files = [];
        this.title = '图片上传';
        this.dataURL = [];
    }
    UploadComponent.prototype.ngOnInit = function () {
        var _input = this.input.nativeElement;
        if (this.multiple) {
            this.renderer2.setProperty(_input, 'multiple', true);
        }
        if (this.media) {
            this.renderer2.setProperty(_input, 'accept', this.media);
        }
    };
    UploadComponent.prototype.onUploadChange = function (event) {
        var files = event.target.files;
        if (this.review) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (this.maxSize && file.size > this.maxSize) {
                    continue;
                }
                if (this.type) {
                    var regExp = new RegExp(this.type);
                    if (!regExp.test(this.type)) {
                        continue;
                    }
                }
                this.addFile(file);
            }
        }
        this.onChange.emit(this.files);
    };
    UploadComponent.prototype.addFile = function (file) {
        this.files.push(file);
        if (this.media) {
            this.imageToData(file);
        }
    };
    UploadComponent.prototype.imageToData = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.dataURL.push(e.target['result']);
        };
        reader.readAsDataURL(file);
    };
    UploadComponent.prototype.onDelete = function (index) {
        this.files.splice(index, 1);
        this.onChange.emit(this.files);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UploadComponent.prototype, "review", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadComponent.prototype, "media", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], UploadComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadComponent.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], UploadComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], UploadComponent.prototype, "input", void 0);
    UploadComponent = __decorate([
        core_1.Component({
            selector: 'free-upload',
            template: "\n    <div class=\"free-upload\">\n      <div class=\"free-upload-text\">\n        <i class=\"fa fa-upload\"></i>{{title}}\n      </div>\n      <div class=\"free-upload-inner\">\n        <input type=\"file\" #input name=\"uploadFile\" (change)=\"onUploadChange($event)\">\n      </div>\n    </div>\n    <div class=\"free-upload-review\" *ngIf=\"review\">\n      <ul>\n        <li *ngFor=\"let file of files;index as i\" class=\"free-upload-item\">\n          <img *ngIf=\"media\" src=\"{{dataURL[i]}}\" alt=\"{{file.name}}\">\n          {{file.name}}\n          <span class=\"free-upload-delete\" (click)=\"onDelete(i)\">\n            <i class=\"fa fa-close\"></i>\n          </span>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;
var UploadModule = (function () {
    function UploadModule() {
    }
    UploadModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [UploadComponent],
            exports: [UploadComponent]
        })
    ], UploadModule);
    return UploadModule;
}());
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.component.js.map
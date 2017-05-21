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
var highlight_js_1 = require("highlight.js/lib/highlight.js");
var scss_1 = require("highlight.js/lib/languages/scss");
var xml_1 = require("highlight.js/lib/languages/xml");
var javascript_1 = require("highlight.js/lib/languages/javascript");
var bash_1 = require("highlight.js/lib/languages/bash");
var button_directive_1 = require("../button/button.directive");
var CodeComponent = (function () {
    function CodeComponent(er, renderer2) {
        this.er = er;
        this.renderer2 = renderer2;
    }
    CodeComponent.prototype.ngOnInit = function () { };
    CodeComponent.prototype.ngAfterViewInit = function () {
        highlight_js_1.default.registerLanguage('scss', scss_1.default);
        highlight_js_1.default.registerLanguage('xml', xml_1.default);
        highlight_js_1.default.registerLanguage('javascript', javascript_1.default);
        highlight_js_1.default.registerLanguage('bash', bash_1.default);
        this.container = this.code.nativeElement;
        this.text = this.format();
        this.checkCode();
        this.renderer2.setProperty(this.container, 'clipboardText', this.text);
    };
    CodeComponent.prototype.format = function () {
        var lines = this.container.textContent.split('\n');
        var matches;
        if (lines[0] === '') {
            lines.shift();
        }
        var indentation = (matches = (/^[\s\t]+/).exec(lines[0])) !== null ? matches[0] : null;
        if (indentation) {
            lines = lines.map(function (line) {
                line = line.replace(indentation, '');
                return line.replace(/\t/g, '  ');
            });
            var text = lines.join('\n').trim();
            this.container.textContent = text;
            return text;
        }
    };
    CodeComponent.prototype.checkCode = function () {
        if (this.lang) {
            this.renderer2.addClass(this.container, this.lang);
            highlight_js_1.default.highlightBlock(this.container);
            // setTimeout(function(code) {
            //   this.hljs.highlightBlock(code);
            // }, 0, code);
        }
    };
    return CodeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CodeComponent.prototype, "lang", void 0);
__decorate([
    core_1.ViewChild('code'),
    __metadata("design:type", core_1.ElementRef)
], CodeComponent.prototype, "code", void 0);
CodeComponent = __decorate([
    core_1.Component({
        selector: 'free-code',
        template: "\n    <div class=\"free-code\">\n      <pre><code class=\"lang\" #code><ng-content></ng-content></code></pre>\n      <button class=\"code-clone\" fButton icon=\"copy\"></button>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
], CodeComponent);
exports.CodeComponent = CodeComponent;
var CodeModule = (function () {
    function CodeModule() {
    }
    return CodeModule;
}());
CodeModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, button_directive_1.ButtonModule],
        declarations: [CodeComponent],
        exports: [CodeComponent, button_directive_1.ButtonModule]
    })
], CodeModule);
exports.CodeModule = CodeModule;
//# sourceMappingURL=code.component.js.map
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
var highlight_js_1 = require("highlight.js/lib/highlight.js");
var javascript_1 = require("highlight.js/lib/languages/javascript");
var css_1 = require("highlight.js/lib/languages/css");
var bash_1 = require("highlight.js/lib/languages/bash");
var xml_1 = require("highlight.js/lib/languages/xml");
var core_1 = require("@angular/core");
var CodeComponent = (function () {
    function CodeComponent(renderer2) {
        this.renderer2 = renderer2;
        this.copy = true;
    }
    CodeComponent.prototype.ngAfterViewInit = function () {
        highlight_js_1.default.registerLanguage('javascript', javascript_1.default);
        highlight_js_1.default.registerLanguage('xml', xml_1.default);
        highlight_js_1.default.registerLanguage('bash', bash_1.default);
        highlight_js_1.default.registerLanguage('css', css_1.default);
        this.code = this.codeViewChild.nativeElement;
        this.codeText = this.format();
        highlight_js_1.default.highlightBlock(this.code);
    };
    CodeComponent.prototype.format = function () {
        var lines = this.code.textContent.split('\n');
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
            this.code.textContent = text;
            return text;
        }
    };
    CodeComponent.prototype.clearSelection = function () {
        var selection = window.getSelection();
        try {
            selection.removeAllRanges();
        }
        catch (ex) {
            document.body['createTextRange']().select();
            document['selection'].empty();
        }
    };
    CodeComponent.prototype.onCopy = function () {
        this.clearSelection();
        this.code.appendChild(document.createTextNode(''));
        var range = document.createRange();
        range.setStart(this.code, 0);
        range.setEnd(this.code.lastChild, 0);
        window.getSelection().addRange(range);
        document.execCommand('copy');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CodeComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CodeComponent.prototype, "copy", void 0);
    __decorate([
        core_1.ViewChild('code'),
        __metadata("design:type", core_1.ElementRef)
    ], CodeComponent.prototype, "codeViewChild", void 0);
    CodeComponent = __decorate([
        core_1.Component({
            selector: 'free-code',
            template: "\n    <div class=\"free-code\" lang=\"{{lang}}\">\n      <pre><code class=\"hljs {{lang}} free-iscroll\" #code>\n        <ng-content></ng-content>\n      </code></pre>\n      <button *ngIf=\"copy\" class=\"free-code-clone\" (click)=\"onCopy()\">\n        <i class=\"fa fa-copy\"></i>\n      </button>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2])
    ], CodeComponent);
    return CodeComponent;
}());
exports.CodeComponent = CodeComponent;
var CodeModule = (function () {
    function CodeModule() {
    }
    CodeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [CodeComponent],
            exports: [CodeComponent]
        })
    ], CodeModule);
    return CodeModule;
}());
exports.CodeModule = CodeModule;
//# sourceMappingURL=code.component.js.map
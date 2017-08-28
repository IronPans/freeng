import {CommonModule} from '@angular/common';
import * as highlight from 'highlight.js/lib/highlight.js';
import * as highlightJavascript from 'highlight.js/lib/languages/javascript';
import * as highlightCSS from 'highlight.js/lib/languages/css';
import * as highlightBash from 'highlight.js/lib/languages/bash';
import * as highlightXML from 'highlight.js/lib/languages/xml';
import {
  NgModule, Component, Input, ViewChild, AfterViewInit, ElementRef, Renderer2
} from '@angular/core';

@Component({
  selector: 'free-code',
  template: `
    <div class="free-code" lang="{{lang}}">
      <pre><code class="hljs {{lang}} free-iscroll" #code>
        <ng-content></ng-content>
      </code></pre>
      <button *ngIf="copy" class="free-code-clone" (click)="onCopy()">
        <i class="fa fa-copy"></i>
      </button>
    </div>
  `
})
export class CodeComponent implements AfterViewInit {

  @Input() lang: string;
  @Input() copy: boolean;
  @ViewChild('code') codeViewChild: ElementRef;
  codeText: string;
  code: HTMLElement;

  constructor(public renderer2: Renderer2) {
    this.copy = true;
  }

  ngAfterViewInit() {
    highlight.registerLanguage('javascript', highlightJavascript);
    highlight.registerLanguage('xml', highlightXML);
    highlight.registerLanguage('bash', highlightBash);
    highlight.registerLanguage('css', highlightCSS);
    this.code = this.codeViewChild.nativeElement;
    this.codeText = this.format();
    highlight.highlightBlock(this.code);
  }

  format() {
    let lines = this.code.textContent.split('\n');
    let matches;
    if (lines[0] === '') {
      lines.shift();
    }
    const indentation = (matches = (/^[\s\t]+/).exec(lines[0])) !== null ? matches[0] : null;
    if (indentation) {
      lines = lines.map(function (line) {
        line = line.replace(indentation, '');
        return line.replace(/\t/g, '  ');
      });
      const text = lines.join('\n').trim();
      this.code.textContent = text;
      return text;
    }
  }

  clearSelection() {
    const selection = window.getSelection();
    try {
      selection.removeAllRanges();
    } catch (ex) {
      document.body['createTextRange']().select();
      document['selection'].empty();
    }
  }

  onCopy() {
    this.clearSelection();
    this.code.appendChild(document.createTextNode(''));
    const range = document.createRange();
    range.setStart(this.code, 0);
    range.setEnd(this.code.lastChild, 0);
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }
}
@NgModule({
  imports: [CommonModule],
  declarations: [CodeComponent],
  exports: [CodeComponent]
})

export class CodeModule {
}

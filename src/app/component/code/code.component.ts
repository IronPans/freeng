import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, Input,
  ViewChild, AfterViewInit, ElementRef, Renderer2
} from '@angular/core';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { ButtonModule } from '../button/button.directive';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'free-code',
  template: `
    <div class="free-code">
      <pre><code class="lang typescript highlight" #code><ng-content></ng-content></code></pre>
      <button class="code-clone" ngxClipboard [cbContent]="codeText" fButton icon="copy"></button>
    </div>
    `
})
export class CodeComponent implements OnInit, AfterViewInit {

  @Input() lang: string;
  @ViewChild('code') code: ElementRef;
  codeText: string;
  container: any;
  constructor(private er: ElementRef,
              private service: HighlightJsService,
              private renderer2: Renderer2) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.container = this.code.nativeElement;
    this.codeText = this.format();
    this.checkCode();
  }

  format() {
    let lines = this.container.textContent.split('\n');
    let matches;
    if (lines[0] === '') {
      lines.shift();
    }
    const indentation = (matches = (/^[\s\t]+/).exec(lines[0])) !== null ? matches[0] : null;
    if (indentation) {
      lines = lines.map(function(line) {
        line = line.replace(indentation, '');
        return line.replace(/\t/g, '  ');
      });
      const text = lines.join('\n').trim();
      this.container.textContent = text;
      return text;
    }
  }

  checkCode() {
    if (this.lang) {
      this.renderer2.addClass(this.container, this.lang);
      this.service.highlight(this.container);
    }
  }

}
@NgModule({
  imports: [CommonModule, ButtonModule, ClipboardModule, HighlightJsModule],
  declarations: [CodeComponent],
  exports: [CodeComponent, ButtonModule],
  providers: [
    HighlightJsService
  ]
})

export class CodeModule {}

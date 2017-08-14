import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgModule, OnDestroy, Renderer2, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';
import {ColorPickerModule} from '../colorpicker/colorpicker.component';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true
};

@Component({
  selector: 'free-editor',
  template: `
    <div class="free-editor-container free-ui" #container [style]="style"
         [class.free-editor-fullscreen]="fullscreen" [style.maxHeight]="setSize(maxHeight)">
      <div class="free-toolbar clearfix" #toolbar [style.display]="toolbar ? 'block' : 'none'">
        <ng-template ngFor [ngForOf]="toolbarButtons" let-name>
          <a #btn class="free-toolbar-icon free-editor-tooltip"
             (click)="onMenuButtonClick($event, defaultButtons[name], btn)"
             [class.free-disabled]="!undoManager && (name === 'undo' || name === 'redo')"
             [class.dropdown]="name === 'align' || name === 'heading' || name === 'fontSize'"
             [attr.data-tooltip]="defaultButtons[name].title"
             [attr.data-edit]="name">
            <ng-container *ngIf="name !== 'align'; else alignButton">
              {{defaultButtons[name].icon}}
            </ng-container>
            <ng-template #alignButton>{{alignIcon}}</ng-template>
          </a>
        </ng-template>
      </div>
      <div class="free-editor">
        <div class="free-editor-wrapper free-iscroll" #editor tabindex="1"
             contenteditable="true" spellcheck="false"
             (focus)="onFocus()" (blur)="onBlur()" (keydown)="onKeydown($event)"
             (mouseup)="onMouseup($event)" (mousedown)="onMouseDown($event)"
             (keyup)="onEtKeyup($event)">
        </div>
      </div>
      <div class="free-table-resizer">
        <div class="free-table-resizer-line"></div>
      </div>
      <div class="free-modal-portal" [style.top]="toolbarHeight + 'px'" #modal
           [style.display]="isModalShow ? 'block' : 'none'">
        <span class="free-modal-arrow"></span>
        <div class="editor-heading" [style.display]="isHeadingShow ? 'block' : 'none'">
          <h1 (click)="onHeadingClick('h1')">h1</h1>
          <h2 (click)="onHeadingClick('h2')">h2</h2>
          <h3 (click)="onHeadingClick('h3')">h3</h3>
          <h4 (click)="onHeadingClick('h4')">h4</h4>
          <h5 (click)="onHeadingClick('h5')">h5</h5>
          <h6 (click)="onHeadingClick('h6')">h6</h6>
        </div>
        <div class="editor-align" [style.display]="isAlignShow ? 'block' : 'none'">
          <a #alignBtn class="free-toolbar-icon free-editor-tooltip" *ngFor="let btn of alignButtons"
             (click)="onMenuButtonClick($event, btn, alignBtn)"
             [attr.data-tooltip]="btn.title" [class.active]="btn.selected"
             [attr.data-edit]="btn.name">{{btn.icon}}</a>
        </div>
        <div class="editor-fontSize free-iscroll" [style.display]="isFontSizeShow ? 'block' : 'none'">
          <ul>
            <li *ngFor="let size of fontSize" [class.active]="size == currentFontSize">
              <span (click)="changeFontSize($event, size)">{{size}}</span>
            </li>
          </ul>
        </div>
        <div class="editor-color-picker" [style.display]="isColorpickerShow ? 'block' : 'none'">
          <free-color-picker [(ngModel)]="color" (onChange)="onColorChange($event)" [clickable]="true"
                             (onClick)="onColorpickerClick()" [inline]="true"></free-color-picker>
        </div>
        <div class="editor-link" [style.display]="isLinkShow ? 'block' : 'none'">
          <input type="text" #link placeholder="www.example.com" class="editor-link-input"/>
          <button type="button" class="editor-confirm" (click)="onLinkConfirm(link.value)">确认</button>
        </div>
        <div class="editor-file" [style.display]="isUploadShow ? 'block' : 'none'">
          <div class="editor-link">
            <input type="text" #imageUrl placeholder="image url"
                   class="editor-link-input"/>
            <button type="button" class="editor-confirm" (click)="uploadImage(imageUrl.value)">确认</button>
          </div>
          <div class="editor-upload">
            <i class="fa fa-plus"></i>图片上传
            <input type="file" name="photo" accept="image/*"
                   class="editor-file-input" (change)="onUploadChange($event)"/>
          </div>
        </div>
        <div class="editor-emotion" [style.display]="isEmotionShow ? 'block' : 'none'">
          <ng-template ngFor [ngForOf]="emotions" let-emotion let-i="index">
            <span class="emotion-item">
              <img src="{{path + emotion}}.svg"
                   class="emotion" width="20" height="20" alt="" (click)="onEmotionClick($event)"/>
            </span>
            <br *ngIf="i % 8 === 7">
          </ng-template>
        </div>
        <div class="editor-table" *ngIf="isTableShow">
          <p>{{selectedRow + 1}} * {{selectedCol + 1}}</p>
          <div class="editor-table-wrapper">
            <ng-template ngFor [ngForOf]="tds" let-td let-i="index">
              <span class="editor-table-td" [class.active]="isTdInSelected(i)"
                    (mouseenter)="onTdMouseenter(i)" (mousedown)="onTdMousedown(i)">
                <span></span>
              </span>
              <br *ngIf="i % 10 === 9">
            </ng-template>
          </div>
        </div>
      </div>
      <div class="free-popup" #linkPopup [style.display]="isLinkPopupShow ? 'block' : 'none'">
        <div class="editor-link">
          <input type="text" #linkInput [(ngModel)]="linkUrl" placeholder="www.example.com"
                 class="editor-link-input"/>
          <button type="button" class="editor-confirm"
                  (click)="onLinkChange(linkInput.value, widthInput.value, heightInput.value)">确认
          </button>
        </div>
        <div class="image-size" [style.display]="isImageLink ? 'block' : 'none'">
          <span>宽：</span><input type="text" #widthInput><span>高：</span><input type="text" #heightInput>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="free-popup" #tablePopup [style.display]="isTablePopupShow ? 'block' : 'none'">
        <div class="arrow"></div>
        <div class="free-table-button">
          <span class="free-dropdown-menu free-editor-tooltip" [attr.data-tooltip]="'行'"
                (click)="onTableDropdown(row, col)">
            <i class="fa fa-bars"></i>
            <ul #row>
              <li (click)="addRow(1)">在下方新增行</li>
              <li (click)="addRow(-1)">在上方新增行</li>
              <li (click)="deleteRow()">删除行</li>
            </ul>
          </span>
          <span class="free-dropdown-menu free-editor-tooltip" [attr.data-tooltip]="'列'"
                (click)="onTableDropdown(col, row)">
            <i class="fa fa-bars fa-rotate-90"></i>
            <ul #col>
              <li (click)="addColumn(-1)">在左侧新增列</li>
              <li (click)="addColumn(1)">在右侧新增列</li>
              <li (click)="deleteColumn()">删除列</li>
            </ul>
          </span>
          <span (click)="deleteTable()" class="free-editor-tooltip" [attr.data-tooltip]="'删除表格'">
            <i class="fa fa-trash"></i>
          </span>
        </div>
      </div>
      <div class="free-editor-cache" *ngIf="cacheTip">
        本地保存成功
      </div>
      <div class="free-editor-counter" *ngIf="counter">
        {{contentLength}}
      </div>
    </div>
  `,
  providers: [DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class EditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() buttons: any;
  @Input() style: any;
  @Input() toolbar: boolean;
  @Input() readonly: boolean;
  @Input() gif: boolean;
  @Input() cache: boolean;
  @Input() cacheTime: boolean;
  @Input() maxHeight: any;
  @Input() counter: boolean;
  @Input() undoManager: boolean;
  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('toolbar') toolbarViewChild: ElementRef;
  @ViewChild('editor') editorViewChild: ElementRef;
  @ViewChild('modal') modalViewChild: ElementRef;
  @ViewChild('linkPopup') linkPopupViewChild: ElementRef;
  @ViewChild('tablePopup') tablePopupViewChild: ElementRef;
  linkPopup: HTMLDivElement;
  tablePopup: HTMLDivElement;
  linkUrl: HTMLInputElement;
  container: HTMLDivElement;
  toolbarElem: HTMLDivElement;
  et: HTMLDivElement;
  text: string;
  selectedRange: any;
  modal: any;
  defaultButtons: any;
  toolbarButtons: any;
  heading: string[];
  emotions: string[];
  tds: number[];
  stack: any[];
  historyValue: any;
  capacity: number;
  stackIndex: number;
  lastTime: any;
  stackTimeoutId: any;
  isHeadingShow: boolean;
  isModalShow: boolean;
  isColorpickerShow: boolean;
  isLinkShow: boolean;
  isUploadShow: boolean;
  isEmotionShow: boolean;
  isLinkPopupShow: boolean;
  isFontSizeShow: boolean;
  isImageLink: boolean;
  isTableShow: boolean;
  isTablePopupShow: boolean;
  isAlignShow: boolean;
  isWriting: boolean;
  colorType: string;
  foreColor: string;
  backColor: string;
  currentButton: any;
  color: string;
  face: number;
  path: string;
  toolbarHeight: number;
  cacheContent: any;
  cacheInterval: any;
  cacheTip: boolean;
  toolButtons: any;
  currentLinkElem: any;
  fullscreen: boolean;
  contentLength: number;
  fontSize: any;
  currentFontSize: any;
  selectedRow: number;
  selectedCol: number;
  etClickListener: any;
  documentClickListener: any;
  onMouseleaveListener: any;
  onValueChangedEvent: any;
  onValueChangedListener: any;
  _startPosition: any;
  _endPosition: any;
  alignButtons: any[];
  alignIcon: string;
  currentPosition: any;
  onModelChange: Function = () => {
  };
  onTouchedChange: Function = () => {
  };

  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) {
    this.style = {
      width: '600px',
      height: '200px'
    };
    this.toolbar = true;
    this.toolbarButtons = [];
    this.toolButtons = [];
    this.foreColor = 'red';
    this.backColor = 'transparent';
    this.heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    this.capacity = 20;
    this.stack = [];
    this.stackIndex = -1;
    this.lastTime = 0;
    this.undoManager = true;
    this.path = 'http://oumfrpm5j.bkt.clouddn.com/freeng_';
    this.emotions = ['1f60a', '1f60b', '1f60c', '1f60d', '1f60e', '1f60f', '1f61a', '1f61b',
      '1f61c', '1f61d', '1f61e', '1f61f', '1f62a', '1f62b', '1f62c',
      '1f62d', '1f62e', '1f62f', '1f600', '1f601', '1f602',
      '1f603', '1f604', '1f605', '1f606', '1f607', '1f608', '1f609',
      '1f610', '1f611', '1f612', '1f613', '1f614', '1f615', '1f616', '1f617', '1f618',
      '1f619', '1f620', '1f621', '1f622', '1f623', '1f624', '1f625', '1f626', '1f627', '1f628',
      '1f629', '1f630', '1f631', '1f632', '1f633', '1f634', '1f635', '1f636', '1f637'
    ];
    this.historyValue = '<p><br></p>';
    this.face = 72;
    this.alignIcon = '\uf036';
    this.fontSize = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
    this.tds = new Array(50).fill(1);
    this.selectedRow = this.selectedCol = 0;
    this.defaultButtons = {
      bold: {
        title: '粗体',
        icon: '\uf032',
        click: () => {
          this.execCommand('bold');
        }
      },
      italic: {
        title: '斜体',
        icon: '\uf033',
        click: () => {
          this.execCommand('italic');
        }
      },
      underline: {
        title: '下划线',
        icon: '\uf0cd',
        click: () => {
          this.execCommand('underline');
        }
      },
      strikethrough: {
        title: '删除线',
        icon: '\uf0cc',
        click: () => {
          this.execCommand('strikethrough');
        }
      },
      subscript: {
        title: '下标',
        icon: '\uf12c',
        click: () => {
          this.execCommand('subscript');
        }
      },
      superscript: {
        title: '上标',
        icon: '\uf12b',
        click: () => {
          this.execCommand('superscript');
        }
      },
      heading: {
        title: '标题',
        icon: '\uf1dd',
        click: () => {
          this.openModal();
          this.isHeadingShow = true;
        }
      },
      fontSize: {
        title: '字体大小',
        icon: '\uf034',
        click: () => {
          this.isFontSizeShow = true;
          this.openModal();
        }
      },
      foreColor: {
        title: '文本颜色',
        icon: '\uf1fc',
        click: () => {
          this.isColorpickerShow = true;
          this.colorType = 'foreColor';
          this.color = this.foreColor;
          this.openModal();
        }
      },
      backColor: {
        title: '背景颜色',
        icon: '\uf043',
        click: () => {
          this.isColorpickerShow = true;
          this.colorType = 'backColor';
          this.color = this.backColor;
          this.openModal();
        }
      },
      align: {
        title: '排列',
        icon: '\uf036',
        click: () => {
          this.isAlignShow = true;
          this.openModal();
        }
      },
      insertOrderedList: {
        title: '编号列表',
        icon: '\uf0cb',
        click: () => {
          this.execCommand('insertOrderedList');
        }
      },
      insertUnorderedList: {
        title: '项目列表',
        icon: '\uf0ca',
        click: () => {
          this.execCommand('insertUnorderedList');
        }
      },
      blockquote: {
        title: '引用',
        icon: '\uf10d',
        click: () => {
          this.execCommand('formatBlock', '<BLOCKQUOTE>');
          const p = document.createElement('p');
          p.innerHTML = '<br>';
          this.et.appendChild(p);
        }
      },
      table: {
        title: '插入表格',
        icon: '\uf0ce',
        click: () => {
          this.isTableShow = true;
          this.openModal();
        }
      },
      createLink: {
        title: '插入超链接',
        icon: '\uf0c1',
        click: () => {
          this.isLinkShow = true;
          this.openModal();
        }
      },
      insertImage: {
        title: '图像',
        icon: '\uf03e',
        click: () => {
          this.isUploadShow = true;
          this.openModal();
        }
      },
      emotion: {
        title: '插入表情',
        icon: '\uf118',
        click: () => {
          this.isEmotionShow = true;
          this.openModal();
        }
      },
      fullscreen: {
        title: '全屏',
        icon: '\uf066',
        click: (event, btn) => {
          this.toggleFullScreen(btn);
        }
      },
      undo: {
        title: '撤消',
        icon: '\uf0e2',
        click: (event, btn) => {
          if (this.undoManager) {
            this.execCommand('undo');
          } else {
            this.undo(btn);
          }
        }
      },
      redo: {
        title: '重做',
        icon: '\uf01e',
        click: (event, btn) => {
          if (this.undoManager) {
            this.execCommand('redo');
          } else {
            this.redo(btn);
          }
        }
      }
    };
    this.alignButtons = [
      {
        name: 'justifyLeft',
        title: '居左',
        icon: '\uf036',
        selected: true,
        click: () => {
          this.execCommand('justifyLeft');
          this.alignIcon = '\uf036';
        }
      },
      {
        name: 'justifyCenter',
        title: '居中',
        icon: '\uf037',
        click: () => {
          this.execCommand('justifyCenter');
          this.alignIcon = '\uf037';
        }
      },
      {
        name: 'justifyRight',
        title: '居右',
        icon: '\uf038',
        click: () => {
          this.execCommand('justifyRight');
          this.alignIcon = '\uf038';
        }
      },
      {
        name: 'justifyFull',
        title: '两端对齐',
        icon: '\uf039',
        click: () => {
          this.execCommand('justifyFull');
          this.alignIcon = '\uf039';
        }
      }];
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.gif) {
      this.path = 'assets/images/emotion/';
    }
    this.modal = this.modalViewChild.nativeElement;
    this.et = this.editorViewChild.nativeElement;
    this.linkPopup = this.linkPopupViewChild.nativeElement;
    this.tablePopup = this.tablePopupViewChild.nativeElement;
    this.getButtons();
    if (this.toolbar) {
      this.toolbarElem = this.toolbarViewChild.nativeElement;
    }
    this.init();
    if (this.readonly) {
      this.domRenderer.setProperty(this.container, 'contenteditable', false);
    }
  }

  writeValue(value: string) {
    if (value) {
      this.text = value;
      this.et.innerHTML = value;
      this.initSelection(true);
      this.getCounter();
    }
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedChange = fn;
  }

  init() {
    this.documentClickListener = this.renderer2.listen('document', 'click', (e) => this.isInModal(e));
    if (this.toolbar) {
      this.toolbarHeight = this.toolbarElem['offsetHeight'] + 5;
      this.et.style.height = (this.container.offsetHeight - this.toolbarHeight) + 'px';
    }
    if (!/%$/.test(this.maxHeight)) {
      this.maxHeight += 'px';
    }
    this.initSelection(true);
    this.etClickListener = this.renderer2.listen(this.et, 'click', (e) => {
      this.resetImage();
      this.isImageLink = false;
      this.resetCell();
      this.isTablePopupShow = false;
      this.isLinkPopupShow = false;
      this.currentLinkElem = null;
      this.closeModal();
      let target = e.target;
      while (target) {
        const nodeName = this.getNodename(target);
        if (nodeName === 'a') {
          this.changeLink();
          break;
        }
        if (nodeName === 'img' && !this.domRenderer.hasClass(target, 'emotion')) {
          this.domRenderer.addClass(target, 'free-editor-image-selected');
          this.isImageLink = true;
          this.changeLink(target);
          break;
        }
        if (nodeName === 'td' || nodeName === 'th') {
          const dropmenu = this.tablePopup.querySelectorAll('.free-dropdown-menu');
          this.domRenderer.addClass(target, 'free-selected-cell');
          for (let i = 0; i < dropmenu.length; i++) {
            dropmenu[i].lastElementChild['style'].display = 'none';
          }
          this.isTablePopupShow = true;
          this.getPopupPosition(target, this.tablePopup);
          break;
        }
        target = target.parentNode;
      }
    });
    this.onValueChangedEvent = this.domRenderer.createEvent('valuechanged');
    if (!this.undoManager) {
      this.renderer2.listen('document', 'selectionchange', (e) => {
        this.resetCaretPosition();
        if (this.stackTimeoutId) {
          clearTimeout(this.stackTimeoutId);
          this.stackTimeoutId = null;
        }
      });
      this.onValueChangedListener = this.domRenderer.listen(this.et, 'valuechanged',
        () => this.updateStack());
    }
  }

  setSize(value: any) {
    if (!value) { return; }
    if (!/%/.test(value)) {
      return value + 'px';
    }
  }

  getButtons() {
    const set = (params) => {
      for (const b in params) {
        if (params.hasOwnProperty(b)) {
          this.toolbarButtons.push(b);
        }
      }
    };
    if (this.buttons) {
      this.toolbarButtons = this.buttons;
    } else {
      set(this.defaultButtons);
    }
  }

  getCounter() {
    this.contentLength = this.et.textContent.length;
  }

  initSelection(newLine?: boolean) {
    if (!this.et.childNodes) {
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      this.et.appendChild(p);
      this.initSelection();
      return;
    }
    const lastElem = this.et.lastElementChild;

    if (newLine && lastElem) {
      const html = lastElem.innerHTML.toLowerCase();
      const nodeName = lastElem.nodeName;
      if (html !== '<br>' && html !== '<br\/>' || nodeName !== 'P') {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        this.et.appendChild(p);
        this.initSelection();
        return;
      }
    }
  }

  toggleFullScreen(btn: any) {
    this.fullscreen = !this.fullscreen;
    if (this.fullscreen) {
      this.domRenderer.addClass(btn, 'active');
      this.domRenderer.addClass(this.container, 'free-editor-fullscreen');
    } else {
      this.domRenderer.removeClass(btn, 'active');
      this.domRenderer.removeClass(this.container, 'free-editor-fullscreen');
    }
  }

  execCommand(command, param: any = null) {
    this.restoreSelection();
    this.et.focus();
    document.execCommand(command, false, param);
    this.saveSelection();
    this.domRenderer.triggerEvent(this.et, this.onValueChangedEvent);
  }

  queryCommandValue(name) {
    return document.queryCommandValue(name);
  }

  queryCommandState(name) {
    return document.queryCommandState(name);
  }

  getCurrentRange(range?: any) {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        return sel.getRangeAt(0);
      }
    } else if (document['selection']) {
      const sel = document['selection'];
      return sel.createRange();
    }
    return null;
  }

  saveSelection() {
    const range = this.getCurrentRange();
    const containerElem = this.getSelectionContainerElem(range);
    if (!containerElem) {
      return;
    }
    if (this.et.contains(containerElem)) {
      this.selectedRange = range;
      this.changeMenuActive(containerElem);
      this.getHTML();
      this.currentPosition = this.caretPosition();
    }
  }

  restoreSelection(range: any = this.selectedRange) {
    const selection = window.getSelection();
    if (range) {
      try {
        selection.removeAllRanges();
      } catch (ex) {
        document.body['createTextRange']().select();
        document['selection'].empty();
      }
      selection.addRange(range);
    }
  }

  setRangeAtStartOf(node, range?: any) {
    if (range == null) {
      range = this.selectedRange;
    }
    range.setEnd(node, 0);
    range.collapse(false);
    this.restoreSelection(range);
  }

  createRangeByElem(elem, toStart: boolean = false, isContent: boolean = true) {
    if (!elem) {
      return;
    }
    const range = document.createRange();
    if (isContent) {
      range.selectNodeContents(elem);
    } else {
      range.selectNode(elem);
    }
    range.collapse(toStart);
    this.selectedRange = range;
  }

  isSelectionEmpty() {
    const range = this.selectedRange;
    if (range && range.startContainer) {
      if (range.startContainer === range.endContainer) {
        if (range.startOffset === range.endOffset) {
          return true;
        }
      }
    }
    return false;
  }

  getSelectionText() {
    if (!this.isSelectionEmpty()) {
      return this.selectedRange.toString();
    } else {
      return '&#8203;';
    }
  }

  getSelectionContainerElem(range: any = this.selectedRange) {
    let elem = void 0;
    if (range) {
      elem = range.commonAncestorContainer;
      return elem.nodeType === 1 ? elem : elem.parentNode;
    }
  }

  onUploadChange(e) {
    const files = e.target.files;
    let file = null;
    let url = null;
    if (files && files.length > 0) {
      file = files[0];
      try {
        const fileReader = new FileReader();
        fileReader.onload = (event: any) => {
          url = event.target.result;
          const img = '<img src="' + url + '"/>';
          this.execCommand('insertHTML', img);
        };
        fileReader.readAsDataURL(file);
      } catch (e) {

      }
    }
    this.closeModal();
  }

  uploadImage(value: string) {
    const url = value.trim();
    if (url) {
      const img = new Image();
      img.onload = () => {
        const imgElem = '<img src="' + url + '"/>';
        this.execCommand('insertHTML', imgElem);
      };
      img.src = url;
    }
    this.closeModal();
  }

  resetImage() {
    const images = this.et.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      this.domRenderer.removeClass(images[i], 'free-editor-image-selected');
    }
  }

  openModal() {
    this.modal.style.opacity = 0;
    this.isModalShow = true;
    setTimeout(() => {
      const offsetWidth = this.modal.offsetWidth;
      const arrow = this.modal.querySelector('.free-modal-arrow');
      const containerWidth = this.container.offsetWidth;
      let left = this.currentButton.offsetLeft + this.currentButton.offsetWidth / 2 - offsetWidth / 2;
      let aLeft = '50%';
      if (left < 0) {
        left = this.currentButton.offsetLeft;
        aLeft = this.currentButton.offsetWidth / 2 + 'px';
      } else if (left + offsetWidth > containerWidth) {
        left = this.currentButton.offsetLeft - offsetWidth + this.currentButton.offsetWidth;
        aLeft = offsetWidth - this.currentButton.offsetWidth / 2 + 'px';
      }
      this.modal.style.left = left + 'px';
      arrow.style.left = aLeft;
      this.modal.style.opacity = 1;
    }, 50);
  };

  closeModal() {
    if (this.modal) {
      this.isModalShow = false;
      this.isHeadingShow = false;
      this.isColorpickerShow = false;
      this.isLinkShow = false;
      this.isUploadShow = false;
      this.isEmotionShow = false;
      this.isFontSizeShow = false;
      this.isTablePopupShow = false;
      this.isTableShow = false;
      this.isLinkPopupShow = false;
      this.currentLinkElem = null;
      this.isAlignShow = false;
      this.selectedCol = this.selectedRow = 0;
    }
  }

  closePopup() {
    this.isTablePopupShow = false;
    const currentElem = this.getSelectionContainerElem();
    let cell = currentElem;
    const nodeName = this.getNodename(currentElem);
    if (nodeName !== 'td' && nodeName !== 'th') {
      cell = currentElem.querySelector('td, th');
    }
    if (cell) {
      this.setRangeAtStartOf(cell);
      if (cell) {
        this.domRenderer.addClass(cell, 'free-selected-cell');
      }
    }
    this.et.focus();
  }

  createTable(index: number) {
    const row = parseInt(index / 10 + '', 10) + 1;
    const col = index % 10 + 1;
    let table = '<table style="width: 100%">';
    const width = (100 / col).toFixed(1) + '%';
    let thead = '<thead><tr>';
    let colgroup = '<colgroup>';
    for (let i = 0; i < col; i++) {
      thead += `<th><br></th>`;
      colgroup += `<col style="width: ${width}"></col>`;
    }
    thead += '</tr></thead>';
    table += colgroup + thead + '<tbody>';
    for (let i = 0; i < row; i++) {
      table += `<tr>`;
      for (let j = 0; j < col; j++) {
        table += `<td><br></td>`;
      }
      table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
  }

  findElement(elem: any, tag: string) {
    while (elem) {
      if (this.getNodename(elem) === tag) {
        break;
      }
      elem = elem.parentNode;
    }
    return elem;
  }

  getTdLocation() {
    const currentElem = this.getSelectionContainerElem();
    const table = this.findElement(currentElem, 'table');
    const colgroup = table.firstElementChild;
    const nextElem = colgroup.nextElementSibling;
    const trs = [];
    this.domRenderer.forEach(nextElem.children, (elem) => {
      trs.push(elem);
    });
    const lastElem = table.lastElementChild;
    this.domRenderer.forEach(lastElem.children, (elem) => {
      trs.push(elem);
    });
    const tr = this.findElement(currentElem, 'tr');
    const tds = tr.children;
    const cols = colgroup.querySelectorAll('col');
    let data;
    for (let i = 0; i < tds.length; i++) {
      if (currentElem === tds[i]) {
        data = {
          index: i,
          elem: currentElem,
          trs: trs,
          parent: tr,
          length: tds.length,
          table: table,
          cols: cols
        }
      }
    }
    return data;
  }

  resetCell() {
    const cells = this.et.querySelectorAll('td, th');
    for (let i = 0; i < cells.length; i++) {
      this.domRenderer.removeClass(cells[i], 'free-selected-cell');
    }
  }

  deleteTable() {
    const currentElem = this.getSelectionContainerElem();
    const table = this.findElement(currentElem, 'table');
    table.parentNode.removeChild(table);
    this.closePopup();
  }

  deleteRow() {
    const currentElem = this.getSelectionContainerElem();
    const table = this.findElement(currentElem, 'table');
    let parent;
    if (this.getNodename(currentElem) === 'th') {
      parent = table.firstElementChild;
    } else {
      parent = table.lastElementChild;
    }
    const tr = this.findElement(currentElem, 'tr');
    parent.removeChild(tr);
    this.closePopup();
  }

  deleteColumn() {
    const data = this.getTdLocation();
    const trs = data.trs;
    const index = data.index;
    let i = trs.length;
    const cols = data.cols;
    const width = (100 / (data.length - 1)).toFixed(1) + '%';
    while (i) {
      i--;
      const tds = trs[i].children;
      let j = tds.length;
      while (j) {
        j--;
        if (j === index) {
          trs[i].removeChild(tds[index]);
          if (cols[index]) {
          }
        }
        cols[j].style.width = width;
      }
    }
    cols[index].parentNode.removeChild(cols[index]);
    const table = data.table;
    if (table.firstElementChild.children.length <= 0) {
      table.parentNode.removeChild(table);
    }
    this.closePopup();
  }

  addRow(position: number) {
    const data = this.getTdLocation();
    if (this.getNodename(data.elem) === 'td') {
      const tr = document.createElement('tr');
      const tds = [];
      for (let i = 0; i < data.length; i++) {
        const td = '<td><br></td>';
        tds.push(td);
      }
      tr.innerHTML = tds.join('');
      if (position === 1) {
        this.domRenderer.insertAfter(data.table.lastElementChild, tr, data.parent);
      } else {
        this.domRenderer.insertBefore(data.table.lastElementChild, tr, data.parent);
      }
    }
    this.closePopup();
  }

  addColumn(position: number) {
    const data = this.getTdLocation();
    const trs = data.trs;
    const index = data.index;
    const cols = data.cols;
    let i = trs.length;
    const width = (100 / (data.length + 1)).toFixed(1) + '%';
    while (i) {
      i--;
      let child = document.createElement('td');
      const elem = trs[i].firstElementChild;
      if (this.getNodename(elem) === 'th') {
        child = document.createElement('th');
      }
      const tds = trs[i].children;
      let j = tds.length;
      while (j) {
        j--;
        cols[j].style.width = width;
        if (j === index) {
          if (position === 1) {
            this.domRenderer.insertAfter(trs[i], child, tds[j]);
          } else {
            this.domRenderer.insertBefore(trs[i], child, tds[j]);
          }
        }
      }
    }
    const col = document.createElement('col');
    col.style.width = width;
    if (position === 1) {
      this.domRenderer.insertAfter(cols[index].parentNode, col, cols[index]);
    } else {
      this.domRenderer.insertBefore(cols[index].parentNode, col, cols[index]);
    }
    this.closePopup();
  }

  undo(btn: HTMLElement) {
    let state;
    if (this.stackIndex < 1 || this.stack.length < 2) {
      this.domRenderer.addClass(btn, 'free-disabled');
      return;
    }
    this.stackIndex--;
    state = this.stack[this.stackIndex];
    this.et.innerHTML = state.html;
    const range = this.caretPosition(this.stack[this.stackIndex + 1].caret);
    this.restoreSelection(range);
    console.log(this.stack);
    this.et.focus();
    this.saveSelection();
    this.domRenderer.forEach(this.toolButtons, (b) => {
      const name = b.getAttribute('data-edit');
      if (name === 'redo') {
        this.domRenderer.removeClass(b, 'free-disabled');
      }
      if (name === 'undo' && this.stackIndex <= 0) {
        this.domRenderer.addClass(b, 'free-disabled');
      }
    });
  }

  redo(btn: HTMLElement) {
    let state;
    if (this.stackIndex < 0 || this.stack.length < this.stackIndex + 2) {
      this.domRenderer.addClass(btn, 'free-disabled');
      return;
    }
    this.stackIndex++;
    state = this.stack[this.stackIndex];
    this.et.innerHTML = state.html;
    console.log(this.stack);
    const range = this.caretPosition(this.stack[this.stackIndex - 1].caret);
    this.restoreSelection(range);
    this.et.focus();
    this.domRenderer.forEach(this.toolButtons, (b) => {
      const name = b.getAttribute('data-edit');
      if (name === 'redo' && this.stack.length === this.stackIndex + 1) {
        this.domRenderer.addClass(b, 'free-disabled');
      }
      if (name === 'undo') {
        this.domRenderer.removeClass(b, 'free-disabled');
      }
    });
  }

  updateState() {
    if (!this.undoManager) {
      this.stackIndex++;
      // const caret = this.caretPosition();
      const caret = this.currentPosition;
      this.stack.push({
        html: this.et.innerHTML,
        caret: caret
      });
      if (this.stack.length > this.capacity) {
        this.stack.shift();
        return (this.stackIndex--);
      }
      this.stackTimeoutId = null;
      this.lastTime = +new Date();
      this.domRenderer.forEach(this.toolButtons, (b) => {
        const name = b.getAttribute('data-edit');
        if (name === 'undo') {
          this.domRenderer.removeClass(b, 'free-disabled');
        }
      });
      this.currentPosition = null;
      this.saveSelection();
    }
  }

  updateStack(wait: number = 2000) {
    if (!this.undoManager) {
      const html = this.et.innerHTML;
      const state = this.stack[this.stackIndex];
      if (state && html && html !== state.html) {
        const delta = +new Date() - this.lastTime;
        if (!this.stackTimeoutId) {
          if (delta >= wait) {
            this.updateState();
          } else {
            this.stackTimeoutId = setTimeout(() => {
              this.updateState();
            }, wait - delta);
          }
        }
      }
    }
  }

  getNodeLength(node) {
    switch (node.nodeType) {
      case 7:
      case 10:
        return 0;
      case 3:
      case 8:
        return node.length;
      default:
        return node.childNodes.length;
    }
  }

  resetCaretPosition() {
    this._startPosition = null;
    return this._endPosition = null;
  }

  getIndex(node) {
    const parent = node.parentNode;
    let index = 0;
    if (parent && parent.childNodes) {
      this.domRenderer.forEach(parent.childNodes, (n, i) => {
        if (n === node) {
          index = i;
        }
      });
    }
    return index;
  }

  getRangePosition(type: string) {
    const currentRange = this.selectedRange;
    let range = currentRange[type + 'Container'];
    let offset = currentRange[type + 'Offset'];
    let prevNode;
    if (range.nodeType === Node.TEXT_NODE) {
      prevNode = range.previousSibling;
      while (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
        range = prevNode;
        offset += this.getNodeLength(prevNode);
        prevNode = prevNode.previousSibling;
      }
    } else {
      offset = this.getIndex(range);
    }
    const position = [offset];
    let target = range;
    while (target) {
      position.push(this.getIndex(target));
      target = target.parentNode;
      if (target && this.domRenderer.hasClass(target, 'free-editor')) {
        break;
      }
    }
    return position;
  }

  startPosition() {
    const range = this.selectedRange;
    if (range) {
      this._startPosition = this.getRangePosition('start');
    }
    return this._startPosition;
  }

  endPosition() {
    const range = this.selectedRange;
    if (range) {
      if (!this._endPosition) {
        if (range.collapsed) {
          return this._startPosition;
        } else {
          return this.getRangePosition('end');
        }
      }

    }
    return this._endPosition;
  }

  getNodeByPosition(position) {
    let node;
    if (position) {
      node = this.et;
      let length = position.length;
      let target = this.et.childNodes;
      while (length > 1) {
        length--;
        if (node['nodeType'] !== Node.TEXT_NODE) {
          this.domRenderer.forEach(target, (n, i) => {
            if (i === position[length]) {
              node = n;
            }
          });
          target = node.childNodes;
        } else {
          node = <any>node.firstChild;
          break;
        }
      }
    }
    return node;
  }

  caretPosition(caret?: any) {
    let startContainer, startOffset, endContainer, endOffset;
    let range;
    if (!caret) {
      range = this.selectedRange;
      return range ? {
        start: this.startPosition(),
        end: this.endPosition(),
        collapsed: range.collapsed
      } : {};
    } else {
      if (!caret.start) {
        return;
      }
      startContainer = this.getNodeByPosition(caret.start);
      startOffset = caret.start[0];
      if (caret.collapsed) {
        endContainer = startContainer;
        endOffset = startOffset;
      } else {
        endContainer = this.getNodeByPosition(caret.end);
        endOffset = caret.end[0];
      }
      if (!startContainer || !endContainer) {
        console.warn('invalid caret state');
        return;
      }
    }
    range = document.createRange();
    range.setStart(startContainer, startOffset);
    range.setEnd(endContainer, endOffset);
    return range;
  }

  onTdMouseenter(index: number) {
    this.selectedRow = parseInt(index / 10 + '', 10);
    this.selectedCol = index % 10;
  }

  onTdMousedown(index: number) {
    const table = this.createTable(index);
    this.execCommand('insertHTML', table);
    this.execCommand('enableObjectResizing', false);
    this.execCommand('enableInlineTableEditing', false);
    this.closeModal();
  }

  onMenuButtonClick(event: any, button: any, btn: any) {
    if (this.selectedRange && !this.domRenderer.hasClass(btn, 'free-disabled')) {
      this.closeModal();
      if (typeof button['click'] !== 'undefined' && !this.readonly) {
        this.restoreSelection();
        this.currentButton = btn;
        button.click(event, btn);
        this.saveSelection();
      }
      event.stopPropagation();
    }
  }

  changeMenuActive(containerElem: any) {
    if (this.toolbar) {
      if (this.toolButtons.length <= 0) {
        this.toolButtons = this.toolbarElem.querySelectorAll('a');
      }
      for (const btn of this.toolButtons) {
        const name = btn.getAttribute('data-edit');
        if (this.queryCommandState(name)) {
          this.domRenderer.addClass(btn, 'active');
        } else {
          this.domRenderer.removeClass(btn, 'active');
        }
        if (name === 'blockquote') {
          const reg = /^BLOCKQUOTE$/i;
          const value = this.queryCommandValue('formatBlock');
          if (reg.test(value)) {
            this.domRenderer.addClass(btn, 'active');
          } else {
            this.domRenderer.removeClass(btn, 'active');
          }
        }
        if (name === 'heading') {
          const reg = /^h/i;
          const value = this.queryCommandValue('formatBlock');
          if (reg.test(value)) {
            this.domRenderer.addClass(btn, 'active');
          } else {
            this.domRenderer.removeClass(btn, 'active');
          }
        }
        if (name === 'fullscreen') {
          if (this.fullscreen) {
            this.domRenderer.addClass(btn, 'active');
          } else {
            this.domRenderer.removeClass(btn, 'active');
          }
        }
        if (name === 'createLink' && this.getNodename(containerElem) === 'a') {
          this.domRenderer.addClass(btn, 'active');
        }
        if (name === 'fontSize') {
          const elem = this.getSelectionContainerElem();
          const size = this.domRenderer.getStyle(elem, 'fontSize');
          this.currentFontSize = parseInt(size, 10);
        }
        if (name === 'align') {
          for (const b of this.alignButtons) {
            b.selected = false;
            if (this.queryCommandState(b.name)) {
              btn.innerHTML = b.icon;
              b.selected = true;
            }
          }
        }
        this.foreColor = this.queryCommandValue('foreColor');
        this.backColor = this.queryCommandValue('backColor');
      }
    }
  }

  onHeadingClick(head: string) {
    this.execCommand('formatBlock', '<' + head + '>');
    this.closeModal();
    this.toolbarButtons['heading']['click']();
  }

  onLinkConfirm(value: string) {
    if (value.trim() !== '') {
      const a = '<a href="' + value + '" target="_blank">' + value + '</a>';
      this.execCommand('insertHTML', a);
      this.closeModal();
    }
  }

  onEmotionClick(event: any) {
    const img = '<img src="' + event.target.src + '" class="emotion" width="20" height="20" alt="" />';
    this.execCommand('insertHTML', img);
    this.closeModal();
  }

  onColorChange(event: any) {
    if (this.colorType === 'foreColor') {
      this.foreColor = event.value;
      this.execCommand('foreColor', this.foreColor);
    } else {
      this.backColor = event.value;
      this.execCommand('backColor', this.backColor);
    }
  }

  onColorpickerClick() {
    setTimeout(() => {
      this.closeModal();
    }, 150);
  }

  changeFontSize(event: any, value: number) {
    this.currentFontSize = value;
    this.execCommand('insertHTML', `<span style="font-size: ${value}px">${this.getSelectionText()}</span>`);
    this.closeModal();
    event.stopPropagation();
  }

  getHTML() {
    this.text = this.et.innerHTML;
    this.onModelChange(this.text);
  }

  startCache() {
    if (this.cache && !this.isWriting) {
      this.cacheInterval = setInterval(() => {
        this.cacheContent = this.getHTML();
      }, this.cacheTime);
    }
  }

  stopCache() {
    if (this.cacheInterval) {
      clearInterval(this.cacheInterval);
    }
  }

  getNodename(elem) {
    if (!elem) {
      return;
    }
    return elem.nodeName.toLowerCase();
  }

  changeLink(target?: any) {
    const currentElem = target || this.getSelectionContainerElem();
    const nodeName = this.getNodename(currentElem);
    if (nodeName === 'a' || nodeName === 'img') {
      this.getPopupPosition(currentElem, this.linkPopup);
      this.currentLinkElem = currentElem;
    }
  }

  getPopupPosition(currentElem: any, popupElem: HTMLDivElement) {
    const nodeName = this.getNodename(currentElem);
    const rect = this.domRenderer.getRect(currentElem);
    const etRect = this.domRenderer.getRect(this.et);
    if (nodeName === 'a' || nodeName === 'img') {
      this.linkUrl = currentElem.href || currentElem.src;
      this.isLinkPopupShow = true;
    }
    const offset = this.domRenderer.getHiddenElementOuterHeight(popupElem);
    const offsetLeft = rect.left - etRect.left;
    let left = offsetLeft - offset.width / 2 + rect.width / 2;
    const top = rect.top - etRect.top + offset.height + rect.height - 10;
    const arrow = popupElem.querySelector('.arrow');
    this.domRenderer.removeClass(popupElem, 'free-popup-left free-popup-right');
    if (left < 0) {
      left = offsetLeft;
      this.domRenderer.addClass(popupElem, 'free-popup-left');
    } else if (offsetLeft + offset.width > etRect.width) {
      left = offsetLeft - offset.width + rect.width;
      this.domRenderer.addClass(popupElem, 'free-popup-right');
    }
    popupElem.style.left = left + 'px';
    popupElem.style.top = top + 'px';
  }

  onLinkChange(value: string, width: string, height: string) {
    const nodeName = this.getNodename(this.currentLinkElem);
    if (nodeName === 'a') {
      this.currentLinkElem.href = value;
    } else if (nodeName === 'img') {
      this.currentLinkElem.src = value;
      if (!/%$/.test(width)) {
        width += 'px';
      }
      if (!/%$/.test(height)) {
        height += 'px';
      }
      this.currentLinkElem.style.width = width;
      this.currentLinkElem.style.height = height;
    }
    this.isLinkPopupShow = false;
    this.currentLinkElem = null;
  }

  onTableDropdown(showElem: HTMLUListElement, hideElem: HTMLUListElement) {
    if (showElem) {
      hideElem.style.display = 'none';
      showElem.style.display = 'block';
    }
  }

  isInEditor(event: any) {
    let target = event.target;
    let isIn = false;
    while (target) {
      if (target === this.container) {
        isIn = true;
        break;
      }
      target = target.parentNode;
    }
    return isIn;
  }

  isInModal(e) {
    if (!this.isInEditor(e)) {
      this.selectedRange = null;
      this.resetCell();
      this.closeModal();
      return false;
    }
    const et = this.findElement(e.target, 'free-editor');
    if (et) {
      const currentElem = this.getSelectionContainerElem();
      const nodeName = this.getNodename(currentElem);
      if (nodeName !== 'td' && nodeName !== 'th') {
        this.isTablePopupShow = false;
        this.resetCell();
      }
    }
    if (this.isModalShow) {
      let node = e.target;
      let isIn = false;
      while (node && typeof node !== 'undefined' && node.nodeName !== '#document') {
        if (node === this.modal) {
          isIn = true;
          break;
        }
        node = node.parentNode;
      }
      if (!isIn) {
        this.closeModal();
      }
    }
  }

  isTdInSelected(index: number) {
    const row = parseInt(index / 10 + '', 10);
    const col = index % 10;
    return row <= this.selectedRow && col <= this.selectedCol;
  }

  onMouseDown(event: any) {
    this.onMouseleaveListener = this.renderer2.listen(this.et, 'mouseleave', () => {
      this.saveSelection();
      this.onMouseleaveListener = null;
    });
  }

  onFocus() {
    if (this.stack.length === 0) {
      setTimeout(() => {
        this.saveSelection();
        this.updateState();
      }, 10);
    }
  }

  onBlur() {
    this.resetCaretPosition();
  }

  onMouseup(event: any) {
    this.saveSelection();
    this.unbindMouseleaveListener();
  }

  onKeydown(event: any) {
  }

  onEtKeyup(event: KeyboardEvent) {
    this.resetCell();
    this.isTablePopupShow = false;
    if (!this.undoManager) {
      this.domRenderer.triggerEvent(this.et, this.onValueChangedEvent);
    } else {
      this.saveSelection();
    }
    this.getCounter();
  }

  unbindMouseleaveListener() {
    if (this.onMouseleaveListener) {
      this.onMouseleaveListener();
      this.onMouseleaveListener = null;
    }
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
    if (this.etClickListener) {
      this.etClickListener();
      this.etClickListener = null;
    }
    if (this.onValueChangedListener) {
      this.onValueChangedListener();
      this.onValueChangedListener = null;
    }
    this.unbindMouseleaveListener();
  }
}
@NgModule({
  imports: [CommonModule, FormsModule, ColorPickerModule],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})

export class EditorModule {
}

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
var common_1 = require("@angular/common");
var dom_1 = require("../common/dom");
var colorpicker_component_1 = require("../colorpicker/colorpicker.component");
var forms_1 = require("@angular/forms");
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return EditorComponent; }),
    multi: true
};
var EditorComponent = (function () {
    function EditorComponent(domRenderer, renderer2) {
        var _this = this;
        this.domRenderer = domRenderer;
        this.renderer2 = renderer2;
        this.onModelChange = function () {
        };
        this.onTouchedChange = function () {
        };
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
                click: function () {
                    _this.execCommand('bold');
                }
            },
            italic: {
                title: '斜体',
                icon: '\uf033',
                click: function () {
                    _this.execCommand('italic');
                }
            },
            underline: {
                title: '下划线',
                icon: '\uf0cd',
                click: function () {
                    _this.execCommand('underline');
                }
            },
            strikethrough: {
                title: '删除线',
                icon: '\uf0cc',
                click: function () {
                    _this.execCommand('strikethrough');
                }
            },
            subscript: {
                title: '下标',
                icon: '\uf12c',
                click: function () {
                    _this.execCommand('subscript');
                }
            },
            superscript: {
                title: '上标',
                icon: '\uf12b',
                click: function () {
                    _this.execCommand('superscript');
                }
            },
            heading: {
                title: '标题',
                icon: '\uf1dd',
                click: function () {
                    _this.openModal();
                    _this.isHeadingShow = true;
                }
            },
            fontSize: {
                title: '字体大小',
                icon: '\uf034',
                click: function () {
                    _this.isFontSizeShow = true;
                    _this.openModal();
                }
            },
            foreColor: {
                title: '文本颜色',
                icon: '\uf1fc',
                click: function () {
                    _this.isColorpickerShow = true;
                    _this.colorType = 'foreColor';
                    _this.color = _this.foreColor;
                    _this.openModal();
                }
            },
            backColor: {
                title: '背景颜色',
                icon: '\uf043',
                click: function () {
                    _this.isColorpickerShow = true;
                    _this.colorType = 'backColor';
                    _this.color = _this.backColor;
                    _this.openModal();
                }
            },
            align: {
                title: '排列',
                icon: '\uf036',
                click: function () {
                    _this.isAlignShow = true;
                    _this.openModal();
                }
            },
            insertOrderedList: {
                title: '编号列表',
                icon: '\uf0cb',
                click: function () {
                    _this.execCommand('insertOrderedList');
                }
            },
            insertUnorderedList: {
                title: '项目列表',
                icon: '\uf0ca',
                click: function () {
                    _this.execCommand('insertUnorderedList');
                }
            },
            blockquote: {
                title: '引用',
                icon: '\uf10d',
                click: function () {
                    _this.execCommand('formatBlock', '<BLOCKQUOTE>');
                    var p = document.createElement('p');
                    p.innerHTML = '<br>';
                    _this.et.appendChild(p);
                }
            },
            table: {
                title: '插入表格',
                icon: '\uf0ce',
                click: function () {
                    _this.isTableShow = true;
                    _this.openModal();
                }
            },
            createLink: {
                title: '插入超链接',
                icon: '\uf0c1',
                click: function () {
                    _this.isLinkShow = true;
                    _this.openModal();
                }
            },
            insertImage: {
                title: '图像',
                icon: '\uf03e',
                click: function () {
                    _this.isUploadShow = true;
                    _this.openModal();
                }
            },
            emotion: {
                title: '插入表情',
                icon: '\uf118',
                click: function () {
                    _this.isEmotionShow = true;
                    _this.openModal();
                }
            },
            fullscreen: {
                title: '全屏',
                icon: '\uf066',
                click: function (event, btn) {
                    _this.toggleFullScreen(btn);
                }
            },
            undo: {
                title: '撤消',
                icon: '\uf0e2',
                click: function (event, btn) {
                    if (_this.undoManager) {
                        _this.execCommand('undo');
                    }
                    else {
                        _this.undo(btn);
                    }
                }
            },
            redo: {
                title: '重做',
                icon: '\uf01e',
                click: function (event, btn) {
                    if (_this.undoManager) {
                        _this.execCommand('redo');
                    }
                    else {
                        _this.redo(btn);
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
                click: function () {
                    _this.execCommand('justifyLeft');
                    _this.alignIcon = '\uf036';
                }
            },
            {
                name: 'justifyCenter',
                title: '居中',
                icon: '\uf037',
                click: function () {
                    _this.execCommand('justifyCenter');
                    _this.alignIcon = '\uf037';
                }
            },
            {
                name: 'justifyRight',
                title: '居右',
                icon: '\uf038',
                click: function () {
                    _this.execCommand('justifyRight');
                    _this.alignIcon = '\uf038';
                }
            },
            {
                name: 'justifyFull',
                title: '两端对齐',
                icon: '\uf039',
                click: function () {
                    _this.execCommand('justifyFull');
                    _this.alignIcon = '\uf039';
                }
            }
        ];
    }
    EditorComponent.prototype.ngAfterViewInit = function () {
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
    };
    EditorComponent.prototype.writeValue = function (value) {
        if (value) {
            this.text = value;
            this.et.innerHTML = value;
            this.initSelection(true);
            this.getCounter();
        }
    };
    EditorComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    EditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedChange = fn;
    };
    EditorComponent.prototype.init = function () {
        var _this = this;
        this.documentClickListener = this.renderer2.listen('document', 'click', function (e) { return _this.isInModal(e); });
        if (this.toolbar) {
            this.toolbarHeight = this.toolbarElem['offsetHeight'] + 5;
            this.et.style.height = (this.container.offsetHeight - this.toolbarHeight) + 'px';
        }
        if (!/%$/.test(this.maxHeight)) {
            this.maxHeight += 'px';
        }
        this.initSelection(true);
        this.etClickListener = this.renderer2.listen(this.et, 'click', function (e) {
            _this.resetImage();
            _this.isImageLink = false;
            _this.resetCell();
            _this.isTablePopupShow = false;
            _this.isLinkPopupShow = false;
            _this.currentLinkElem = null;
            _this.closeModal();
            var target = e.target;
            while (target) {
                var nodeName = _this.getNodename(target);
                if (nodeName === 'a') {
                    _this.changeLink();
                    break;
                }
                if (nodeName === 'img' && !_this.domRenderer.hasClass(target, 'emotion')) {
                    _this.domRenderer.addClass(target, 'free-editor-image-selected');
                    _this.isImageLink = true;
                    _this.changeLink(target);
                    break;
                }
                if (nodeName === 'td' || nodeName === 'th') {
                    var dropmenu = _this.tablePopup.querySelectorAll('.free-dropdown-menu');
                    _this.domRenderer.addClass(target, 'free-selected-cell');
                    for (var i = 0; i < dropmenu.length; i++) {
                        dropmenu[i].lastElementChild['style'].display = 'none';
                    }
                    _this.isTablePopupShow = true;
                    _this.getPopupPosition(target, _this.tablePopup);
                    break;
                }
                target = target.parentNode;
            }
        });
        this.onValueChangedEvent = this.domRenderer.createEvent('valuechanged');
        if (!this.undoManager) {
            this.renderer2.listen('document', 'selectionchange', function (e) {
                _this.resetCaretPosition();
                if (_this.stackTimeoutId) {
                    clearTimeout(_this.stackTimeoutId);
                    _this.stackTimeoutId = null;
                }
            });
            this.onValueChangedListener = this.domRenderer.listen(this.et, 'valuechanged', function () { return _this.updateStack(); });
        }
    };
    EditorComponent.prototype.setSize = function (value) {
        if (!value) {
            return;
        }
        if (!/%/.test(value)) {
            return value + 'px';
        }
    };
    EditorComponent.prototype.getButtons = function () {
        var _this = this;
        var set = function (params) {
            for (var b in params) {
                if (params.hasOwnProperty(b)) {
                    _this.toolbarButtons.push(b);
                }
            }
        };
        if (this.buttons) {
            this.toolbarButtons = this.buttons;
        }
        else {
            set(this.defaultButtons);
        }
    };
    EditorComponent.prototype.getCounter = function () {
        this.contentLength = this.et.textContent.length;
    };
    EditorComponent.prototype.initSelection = function (newLine) {
        if (!this.et.childNodes) {
            var p = document.createElement('p');
            p.innerHTML = '<br>';
            this.et.appendChild(p);
            this.initSelection();
            return;
        }
        var lastElem = this.et.lastElementChild;
        if (newLine && lastElem) {
            var html = lastElem.innerHTML.toLowerCase();
            var nodeName = lastElem.nodeName;
            if (html !== '<br>' && html !== '<br\/>' || nodeName !== 'P') {
                var p = document.createElement('p');
                p.innerHTML = '<br>';
                this.et.appendChild(p);
                this.initSelection();
                return;
            }
        }
    };
    EditorComponent.prototype.toggleFullScreen = function (btn) {
        this.fullscreen = !this.fullscreen;
        if (this.fullscreen) {
            this.domRenderer.addClass(btn, 'active');
            this.domRenderer.addClass(this.container, 'free-editor-fullscreen');
        }
        else {
            this.domRenderer.removeClass(btn, 'active');
            this.domRenderer.removeClass(this.container, 'free-editor-fullscreen');
        }
    };
    EditorComponent.prototype.execCommand = function (command, param) {
        if (param === void 0) { param = null; }
        this.restoreSelection();
        this.et.focus();
        document.execCommand(command, false, param);
        this.saveSelection();
        this.domRenderer.triggerEvent(this.et, this.onValueChangedEvent);
    };
    EditorComponent.prototype.queryCommandValue = function (name) {
        return document.queryCommandValue(name);
    };
    EditorComponent.prototype.queryCommandState = function (name) {
        return document.queryCommandState(name);
    };
    EditorComponent.prototype.getCurrentRange = function (range) {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.rangeCount > 0) {
                return sel.getRangeAt(0);
            }
        }
        else if (document['selection']) {
            var sel = document['selection'];
            return sel.createRange();
        }
        return null;
    };
    EditorComponent.prototype.saveSelection = function () {
        var range = this.getCurrentRange();
        var containerElem = this.getSelectionContainerElem(range);
        if (!containerElem) {
            return;
        }
        if (this.et.contains(containerElem)) {
            this.selectedRange = range;
            this.changeMenuActive(containerElem);
            this.getHTML();
            this.currentPosition = this.caretPosition();
        }
    };
    EditorComponent.prototype.restoreSelection = function (range) {
        if (range === void 0) { range = this.selectedRange; }
        var selection = window.getSelection();
        if (range) {
            try {
                selection.removeAllRanges();
            }
            catch (ex) {
                document.body['createTextRange']().select();
                document['selection'].empty();
            }
            selection.addRange(range);
        }
    };
    EditorComponent.prototype.setRangeAtStartOf = function (node, range) {
        if (range == null) {
            range = this.selectedRange;
        }
        range.setEnd(node, 0);
        range.collapse(false);
        this.restoreSelection(range);
    };
    EditorComponent.prototype.createRangeByElem = function (elem, toStart, isContent) {
        if (toStart === void 0) { toStart = false; }
        if (isContent === void 0) { isContent = true; }
        if (!elem) {
            return;
        }
        var range = document.createRange();
        if (isContent) {
            range.selectNodeContents(elem);
        }
        else {
            range.selectNode(elem);
        }
        range.collapse(toStart);
        this.selectedRange = range;
    };
    EditorComponent.prototype.isSelectionEmpty = function () {
        var range = this.selectedRange;
        if (range && range.startContainer) {
            if (range.startContainer === range.endContainer) {
                if (range.startOffset === range.endOffset) {
                    return true;
                }
            }
        }
        return false;
    };
    EditorComponent.prototype.getSelectionText = function () {
        if (!this.isSelectionEmpty()) {
            return this.selectedRange.toString();
        }
        else {
            return '&#8203;';
        }
    };
    EditorComponent.prototype.getSelectionContainerElem = function (range) {
        if (range === void 0) { range = this.selectedRange; }
        var elem = void 0;
        if (range) {
            elem = range.commonAncestorContainer;
            return elem.nodeType === 1 ? elem : elem.parentNode;
        }
    };
    EditorComponent.prototype.onUploadChange = function (e) {
        var _this = this;
        var files = e.target.files;
        var file = null;
        var url = null;
        if (files && files.length > 0) {
            file = files[0];
            try {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    url = event.target.result;
                    var img = '<img src="' + url + '"/>';
                    _this.execCommand('insertHTML', img);
                };
                fileReader.readAsDataURL(file);
            }
            catch (e) {
            }
        }
        this.closeModal();
    };
    EditorComponent.prototype.uploadImage = function (value) {
        var _this = this;
        var url = value.trim();
        if (url) {
            var img = new Image();
            img.onload = function () {
                var imgElem = '<img src="' + url + '"/>';
                _this.execCommand('insertHTML', imgElem);
            };
            img.src = url;
        }
        this.closeModal();
    };
    EditorComponent.prototype.resetImage = function () {
        var images = this.et.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            this.domRenderer.removeClass(images[i], 'free-editor-image-selected');
        }
    };
    EditorComponent.prototype.openModal = function () {
        var _this = this;
        this.modal.style.opacity = 0;
        this.isModalShow = true;
        setTimeout(function () {
            var offsetWidth = _this.modal.offsetWidth;
            var arrow = _this.modal.querySelector('.free-modal-arrow');
            var containerWidth = _this.container.offsetWidth;
            var left = _this.currentButton.offsetLeft + _this.currentButton.offsetWidth / 2 - offsetWidth / 2;
            var aLeft = '50%';
            if (left < 0) {
                left = _this.currentButton.offsetLeft;
                aLeft = _this.currentButton.offsetWidth / 2 + 'px';
            }
            else if (left + offsetWidth > containerWidth) {
                left = _this.currentButton.offsetLeft - offsetWidth + _this.currentButton.offsetWidth;
                aLeft = offsetWidth - _this.currentButton.offsetWidth / 2 + 'px';
            }
            _this.modal.style.left = left + 'px';
            arrow.style.left = aLeft;
            _this.modal.style.opacity = 1;
        }, 50);
    };
    ;
    EditorComponent.prototype.closeModal = function () {
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
    };
    EditorComponent.prototype.closePopup = function () {
        this.isTablePopupShow = false;
        var currentElem = this.getSelectionContainerElem();
        var cell = currentElem;
        var nodeName = this.getNodename(currentElem);
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
    };
    EditorComponent.prototype.createTable = function (index) {
        var row = parseInt(index / 10 + '', 10) + 1;
        var col = index % 10 + 1;
        var table = '<table style="width: 100%">';
        var width = (100 / col).toFixed(1) + '%';
        var thead = '<thead><tr>';
        var colgroup = '<colgroup>';
        for (var i = 0; i < col; i++) {
            thead += "<th><br></th>";
            colgroup += "<col style=\"width: " + width + "\"></col>";
        }
        thead += '</tr></thead>';
        table += colgroup + thead + '<tbody>';
        for (var i = 0; i < row; i++) {
            table += "<tr>";
            for (var j = 0; j < col; j++) {
                table += "<td><br></td>";
            }
            table += '</tr>';
        }
        table += '</tbody></table>';
        return table;
    };
    EditorComponent.prototype.findElement = function (elem, tag) {
        while (elem) {
            if (this.getNodename(elem) === tag) {
                break;
            }
            elem = elem.parentNode;
        }
        return elem;
    };
    EditorComponent.prototype.getTdLocation = function () {
        var currentElem = this.getSelectionContainerElem();
        var table = this.findElement(currentElem, 'table');
        var colgroup = table.firstElementChild;
        var nextElem = colgroup.nextElementSibling;
        var trs = [];
        this.domRenderer.forEach(nextElem.children, function (elem) {
            trs.push(elem);
        });
        var lastElem = table.lastElementChild;
        this.domRenderer.forEach(lastElem.children, function (elem) {
            trs.push(elem);
        });
        var tr = this.findElement(currentElem, 'tr');
        var tds = tr.children;
        var cols = colgroup.querySelectorAll('col');
        var data;
        for (var i = 0; i < tds.length; i++) {
            if (currentElem === tds[i]) {
                data = {
                    index: i,
                    elem: currentElem,
                    trs: trs,
                    parent: tr,
                    length: tds.length,
                    table: table,
                    cols: cols
                };
            }
        }
        return data;
    };
    EditorComponent.prototype.resetCell = function () {
        var cells = this.et.querySelectorAll('td, th');
        for (var i = 0; i < cells.length; i++) {
            this.domRenderer.removeClass(cells[i], 'free-selected-cell');
        }
    };
    EditorComponent.prototype.deleteTable = function () {
        var currentElem = this.getSelectionContainerElem();
        var table = this.findElement(currentElem, 'table');
        table.parentNode.removeChild(table);
        this.closePopup();
    };
    EditorComponent.prototype.deleteRow = function () {
        var currentElem = this.getSelectionContainerElem();
        var table = this.findElement(currentElem, 'table');
        var parent;
        if (this.getNodename(currentElem) === 'th') {
            parent = table.firstElementChild;
        }
        else {
            parent = table.lastElementChild;
        }
        var tr = this.findElement(currentElem, 'tr');
        parent.removeChild(tr);
        this.closePopup();
    };
    EditorComponent.prototype.deleteColumn = function () {
        var data = this.getTdLocation();
        var trs = data.trs;
        var index = data.index;
        var i = trs.length;
        var cols = data.cols;
        var width = (100 / (data.length - 1)).toFixed(1) + '%';
        while (i) {
            i--;
            var tds = trs[i].children;
            var j = tds.length;
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
        var table = data.table;
        if (table.firstElementChild.children.length <= 0) {
            table.parentNode.removeChild(table);
        }
        this.closePopup();
    };
    EditorComponent.prototype.addRow = function (position) {
        var data = this.getTdLocation();
        if (this.getNodename(data.elem) === 'td') {
            var tr = document.createElement('tr');
            var tds = [];
            for (var i = 0; i < data.length; i++) {
                var td = '<td><br></td>';
                tds.push(td);
            }
            tr.innerHTML = tds.join('');
            if (position === 1) {
                this.domRenderer.insertAfter(data.table.lastElementChild, tr, data.parent);
            }
            else {
                this.domRenderer.insertBefore(data.table.lastElementChild, tr, data.parent);
            }
        }
        this.closePopup();
    };
    EditorComponent.prototype.addColumn = function (position) {
        var data = this.getTdLocation();
        var trs = data.trs;
        var index = data.index;
        var cols = data.cols;
        var i = trs.length;
        var width = (100 / (data.length + 1)).toFixed(1) + '%';
        while (i) {
            i--;
            var child = document.createElement('td');
            var elem = trs[i].firstElementChild;
            if (this.getNodename(elem) === 'th') {
                child = document.createElement('th');
            }
            var tds = trs[i].children;
            var j = tds.length;
            while (j) {
                j--;
                cols[j].style.width = width;
                if (j === index) {
                    if (position === 1) {
                        this.domRenderer.insertAfter(trs[i], child, tds[j]);
                    }
                    else {
                        this.domRenderer.insertBefore(trs[i], child, tds[j]);
                    }
                }
            }
        }
        var col = document.createElement('col');
        col.style.width = width;
        if (position === 1) {
            this.domRenderer.insertAfter(cols[index].parentNode, col, cols[index]);
        }
        else {
            this.domRenderer.insertBefore(cols[index].parentNode, col, cols[index]);
        }
        this.closePopup();
    };
    EditorComponent.prototype.undo = function (btn) {
        var _this = this;
        var state;
        if (this.stackIndex < 1 || this.stack.length < 2) {
            this.domRenderer.addClass(btn, 'free-disabled');
            return;
        }
        this.stackIndex--;
        state = this.stack[this.stackIndex];
        this.et.innerHTML = state.html;
        var range = this.caretPosition(this.stack[this.stackIndex + 1].caret);
        this.restoreSelection(range);
        console.log(this.stack);
        this.et.focus();
        this.saveSelection();
        this.domRenderer.forEach(this.toolButtons, function (b) {
            var name = b.getAttribute('data-edit');
            if (name === 'redo') {
                _this.domRenderer.removeClass(b, 'free-disabled');
            }
            if (name === 'undo' && _this.stackIndex <= 0) {
                _this.domRenderer.addClass(b, 'free-disabled');
            }
        });
    };
    EditorComponent.prototype.redo = function (btn) {
        var _this = this;
        var state;
        if (this.stackIndex < 0 || this.stack.length < this.stackIndex + 2) {
            this.domRenderer.addClass(btn, 'free-disabled');
            return;
        }
        this.stackIndex++;
        state = this.stack[this.stackIndex];
        this.et.innerHTML = state.html;
        console.log(this.stack);
        var range = this.caretPosition(this.stack[this.stackIndex - 1].caret);
        this.restoreSelection(range);
        this.et.focus();
        this.domRenderer.forEach(this.toolButtons, function (b) {
            var name = b.getAttribute('data-edit');
            if (name === 'redo' && _this.stack.length === _this.stackIndex + 1) {
                _this.domRenderer.addClass(b, 'free-disabled');
            }
            if (name === 'undo') {
                _this.domRenderer.removeClass(b, 'free-disabled');
            }
        });
    };
    EditorComponent.prototype.updateState = function () {
        var _this = this;
        if (!this.undoManager) {
            this.stackIndex++;
            // const caret = this.caretPosition();
            var caret = this.currentPosition;
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
            this.domRenderer.forEach(this.toolButtons, function (b) {
                var name = b.getAttribute('data-edit');
                if (name === 'undo') {
                    _this.domRenderer.removeClass(b, 'free-disabled');
                }
            });
            this.currentPosition = null;
            this.saveSelection();
        }
    };
    EditorComponent.prototype.updateStack = function (wait) {
        var _this = this;
        if (wait === void 0) { wait = 2000; }
        if (!this.undoManager) {
            var html = this.et.innerHTML;
            var state = this.stack[this.stackIndex];
            if (state && html && html !== state.html) {
                var delta = +new Date() - this.lastTime;
                if (!this.stackTimeoutId) {
                    if (delta >= wait) {
                        this.updateState();
                    }
                    else {
                        this.stackTimeoutId = setTimeout(function () {
                            _this.updateState();
                        }, wait - delta);
                    }
                }
            }
        }
    };
    EditorComponent.prototype.getNodeLength = function (node) {
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
    };
    EditorComponent.prototype.resetCaretPosition = function () {
        this._startPosition = null;
        return this._endPosition = null;
    };
    EditorComponent.prototype.getIndex = function (node) {
        var parent = node.parentNode;
        var index = 0;
        if (parent && parent.childNodes) {
            this.domRenderer.forEach(parent.childNodes, function (n, i) {
                if (n === node) {
                    index = i;
                }
            });
        }
        return index;
    };
    EditorComponent.prototype.getRangePosition = function (type) {
        var currentRange = this.selectedRange;
        var range = currentRange[type + 'Container'];
        var offset = currentRange[type + 'Offset'];
        var prevNode;
        if (range.nodeType === Node.TEXT_NODE) {
            prevNode = range.previousSibling;
            while (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
                range = prevNode;
                offset += this.getNodeLength(prevNode);
                prevNode = prevNode.previousSibling;
            }
        }
        else {
            offset = this.getIndex(range);
        }
        var position = [offset];
        var target = range;
        while (target) {
            position.push(this.getIndex(target));
            target = target.parentNode;
            if (target && this.domRenderer.hasClass(target, 'free-editor')) {
                break;
            }
        }
        return position;
    };
    EditorComponent.prototype.startPosition = function () {
        var range = this.selectedRange;
        if (range) {
            this._startPosition = this.getRangePosition('start');
        }
        return this._startPosition;
    };
    EditorComponent.prototype.endPosition = function () {
        var range = this.selectedRange;
        if (range) {
            if (!this._endPosition) {
                if (range.collapsed) {
                    return this._startPosition;
                }
                else {
                    return this.getRangePosition('end');
                }
            }
        }
        return this._endPosition;
    };
    EditorComponent.prototype.getNodeByPosition = function (position) {
        var node;
        if (position) {
            node = this.et;
            var length_1 = position.length;
            var target = this.et.childNodes;
            while (length_1 > 1) {
                length_1--;
                if (node['nodeType'] !== Node.TEXT_NODE) {
                    this.domRenderer.forEach(target, function (n, i) {
                        if (i === position[length_1]) {
                            node = n;
                        }
                    });
                    target = node.childNodes;
                }
                else {
                    node = node.firstChild;
                    break;
                }
            }
        }
        return node;
    };
    EditorComponent.prototype.caretPosition = function (caret) {
        var startContainer, startOffset, endContainer, endOffset;
        var range;
        if (!caret) {
            range = this.selectedRange;
            return range ? {
                start: this.startPosition(),
                end: this.endPosition(),
                collapsed: range.collapsed
            } : {};
        }
        else {
            if (!caret.start) {
                return;
            }
            startContainer = this.getNodeByPosition(caret.start);
            startOffset = caret.start[0];
            if (caret.collapsed) {
                endContainer = startContainer;
                endOffset = startOffset;
            }
            else {
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
    };
    EditorComponent.prototype.onTdMouseenter = function (index) {
        this.selectedRow = parseInt(index / 10 + '', 10);
        this.selectedCol = index % 10;
    };
    EditorComponent.prototype.onTdMousedown = function (index) {
        var table = this.createTable(index);
        this.execCommand('insertHTML', table);
        this.execCommand('enableObjectResizing', false);
        this.execCommand('enableInlineTableEditing', false);
        this.closeModal();
    };
    EditorComponent.prototype.onMenuButtonClick = function (event, button, btn) {
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
    };
    EditorComponent.prototype.changeMenuActive = function (containerElem) {
        if (this.toolbar) {
            if (this.toolButtons.length <= 0) {
                this.toolButtons = this.toolbarElem.querySelectorAll('a');
            }
            for (var _i = 0, _a = this.toolButtons; _i < _a.length; _i++) {
                var btn = _a[_i];
                var name_1 = btn.getAttribute('data-edit');
                if (this.queryCommandState(name_1)) {
                    this.domRenderer.addClass(btn, 'active');
                }
                else {
                    this.domRenderer.removeClass(btn, 'active');
                }
                if (name_1 === 'blockquote') {
                    var reg = /^BLOCKQUOTE$/i;
                    var value = this.queryCommandValue('formatBlock');
                    if (reg.test(value)) {
                        this.domRenderer.addClass(btn, 'active');
                    }
                    else {
                        this.domRenderer.removeClass(btn, 'active');
                    }
                }
                if (name_1 === 'heading') {
                    var reg = /^h/i;
                    var value = this.queryCommandValue('formatBlock');
                    if (reg.test(value)) {
                        this.domRenderer.addClass(btn, 'active');
                    }
                    else {
                        this.domRenderer.removeClass(btn, 'active');
                    }
                }
                if (name_1 === 'fullscreen') {
                    if (this.fullscreen) {
                        this.domRenderer.addClass(btn, 'active');
                    }
                    else {
                        this.domRenderer.removeClass(btn, 'active');
                    }
                }
                if (name_1 === 'createLink' && this.getNodename(containerElem) === 'a') {
                    this.domRenderer.addClass(btn, 'active');
                }
                if (name_1 === 'fontSize') {
                    var elem = this.getSelectionContainerElem();
                    var size = this.domRenderer.getStyle(elem, 'fontSize');
                    this.currentFontSize = parseInt(size, 10);
                }
                if (name_1 === 'align') {
                    for (var _b = 0, _c = this.alignButtons; _b < _c.length; _b++) {
                        var b = _c[_b];
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
    };
    EditorComponent.prototype.onHeadingClick = function (head) {
        this.execCommand('formatBlock', '<' + head + '>');
        this.closeModal();
        this.toolbarButtons['heading']['click']();
    };
    EditorComponent.prototype.onLinkConfirm = function (value) {
        if (value.trim() !== '') {
            var a = '<a href="' + value + '" target="_blank">' + value + '</a>';
            this.execCommand('insertHTML', a);
            this.closeModal();
        }
    };
    EditorComponent.prototype.onEmotionClick = function (event) {
        var img = '<img src="' + event.target.src + '" class="emotion" width="20" height="20" alt="" />';
        this.execCommand('insertHTML', img);
        this.closeModal();
    };
    EditorComponent.prototype.onColorChange = function (event) {
        if (this.colorType === 'foreColor') {
            this.foreColor = event.value;
            this.execCommand('foreColor', this.foreColor);
        }
        else {
            this.backColor = event.value;
            this.execCommand('backColor', this.backColor);
        }
    };
    EditorComponent.prototype.onColorpickerClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.closeModal();
        }, 150);
    };
    EditorComponent.prototype.changeFontSize = function (event, value) {
        this.currentFontSize = value;
        this.execCommand('insertHTML', "<span style=\"font-size: " + value + "px\">" + this.getSelectionText() + "</span>");
        this.closeModal();
        event.stopPropagation();
    };
    EditorComponent.prototype.getHTML = function () {
        this.text = this.et.innerHTML;
        this.onModelChange(this.text);
    };
    EditorComponent.prototype.startCache = function () {
        var _this = this;
        if (this.cache && !this.isWriting) {
            this.cacheInterval = setInterval(function () {
                _this.cacheContent = _this.getHTML();
            }, this.cacheTime);
        }
    };
    EditorComponent.prototype.stopCache = function () {
        if (this.cacheInterval) {
            clearInterval(this.cacheInterval);
        }
    };
    EditorComponent.prototype.getNodename = function (elem) {
        if (!elem) {
            return;
        }
        return elem.nodeName.toLowerCase();
    };
    EditorComponent.prototype.changeLink = function (target) {
        var currentElem = target || this.getSelectionContainerElem();
        var nodeName = this.getNodename(currentElem);
        if (nodeName === 'a' || nodeName === 'img') {
            this.getPopupPosition(currentElem, this.linkPopup);
            this.currentLinkElem = currentElem;
        }
    };
    EditorComponent.prototype.getPopupPosition = function (currentElem, popupElem) {
        var nodeName = this.getNodename(currentElem);
        var rect = this.domRenderer.getRect(currentElem);
        var etRect = this.domRenderer.getRect(this.et);
        if (nodeName === 'a' || nodeName === 'img') {
            this.linkUrl = currentElem.href || currentElem.src;
            this.isLinkPopupShow = true;
        }
        var offset = this.domRenderer.getHiddenElementOuterHeight(popupElem);
        var offsetLeft = rect.left - etRect.left;
        var left = offsetLeft - offset.width / 2 + rect.width / 2;
        var top = rect.top - etRect.top + offset.height + rect.height - 10;
        var arrow = popupElem.querySelector('.arrow');
        this.domRenderer.removeClass(popupElem, 'free-popup-left free-popup-right');
        if (left < 0) {
            left = offsetLeft;
            this.domRenderer.addClass(popupElem, 'free-popup-left');
        }
        else if (offsetLeft + offset.width > etRect.width) {
            left = offsetLeft - offset.width + rect.width;
            this.domRenderer.addClass(popupElem, 'free-popup-right');
        }
        popupElem.style.left = left + 'px';
        popupElem.style.top = top + 'px';
    };
    EditorComponent.prototype.onLinkChange = function (value, width, height) {
        var nodeName = this.getNodename(this.currentLinkElem);
        if (nodeName === 'a') {
            this.currentLinkElem.href = value;
        }
        else if (nodeName === 'img') {
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
    };
    EditorComponent.prototype.onTableDropdown = function (showElem, hideElem) {
        if (showElem) {
            hideElem.style.display = 'none';
            showElem.style.display = 'block';
        }
    };
    EditorComponent.prototype.isInEditor = function (event) {
        var target = event.target;
        var isIn = false;
        while (target) {
            if (target === this.container) {
                isIn = true;
                break;
            }
            target = target.parentNode;
        }
        return isIn;
    };
    EditorComponent.prototype.isInModal = function (e) {
        if (!this.isInEditor(e)) {
            this.selectedRange = null;
            this.resetCell();
            this.closeModal();
            return false;
        }
        var et = this.findElement(e.target, 'free-editor');
        if (et) {
            var currentElem = this.getSelectionContainerElem();
            var nodeName = this.getNodename(currentElem);
            if (nodeName !== 'td' && nodeName !== 'th') {
                this.isTablePopupShow = false;
                this.resetCell();
            }
        }
        if (this.isModalShow) {
            var node = e.target;
            var isIn = false;
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
    };
    EditorComponent.prototype.isTdInSelected = function (index) {
        var row = parseInt(index / 10 + '', 10);
        var col = index % 10;
        return row <= this.selectedRow && col <= this.selectedCol;
    };
    EditorComponent.prototype.onMouseDown = function (event) {
        var _this = this;
        this.onMouseleaveListener = this.renderer2.listen(this.et, 'mouseleave', function () {
            _this.saveSelection();
            _this.onMouseleaveListener = null;
        });
    };
    EditorComponent.prototype.onFocus = function () {
        var _this = this;
        if (this.stack.length === 0) {
            setTimeout(function () {
                _this.saveSelection();
                _this.updateState();
            }, 10);
        }
    };
    EditorComponent.prototype.onBlur = function () {
        this.resetCaretPosition();
    };
    EditorComponent.prototype.onMouseup = function (event) {
        this.saveSelection();
        this.unbindMouseleaveListener();
    };
    EditorComponent.prototype.onKeydown = function (event) {
    };
    EditorComponent.prototype.onEtKeyup = function (event) {
        this.resetCell();
        this.isTablePopupShow = false;
        if (!this.undoManager) {
            this.domRenderer.triggerEvent(this.et, this.onValueChangedEvent);
        }
        else {
            this.saveSelection();
        }
        this.getCounter();
    };
    EditorComponent.prototype.unbindMouseleaveListener = function () {
        if (this.onMouseleaveListener) {
            this.onMouseleaveListener();
            this.onMouseleaveListener = null;
        }
    };
    EditorComponent.prototype.ngOnDestroy = function () {
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
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditorComponent.prototype, "buttons", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditorComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "toolbar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "gif", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "cache", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "cacheTime", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditorComponent.prototype, "maxHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "counter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditorComponent.prototype, "undoManager", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('toolbar'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "toolbarViewChild", void 0);
    __decorate([
        core_1.ViewChild('editor'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "editorViewChild", void 0);
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "modalViewChild", void 0);
    __decorate([
        core_1.ViewChild('linkPopup'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "linkPopupViewChild", void 0);
    __decorate([
        core_1.ViewChild('tablePopup'),
        __metadata("design:type", core_1.ElementRef)
    ], EditorComponent.prototype, "tablePopupViewChild", void 0);
    EditorComponent = __decorate([
        core_1.Component({
            selector: 'free-editor',
            template: "\n    <div class=\"free-editor-container free-ui\" #container [style]=\"style\"\n         [class.free-editor-fullscreen]=\"fullscreen\" [style.maxHeight]=\"setSize(maxHeight)\">\n      <div class=\"free-toolbar clearfix\" #toolbar [style.display]=\"toolbar ? 'block' : 'none'\">\n        <ng-template ngFor [ngForOf]=\"toolbarButtons\" let-name>\n          <a #btn class=\"free-toolbar-icon free-editor-tooltip\"\n             (click)=\"onMenuButtonClick($event, defaultButtons[name], btn)\"\n             [class.free-disabled]=\"!undoManager && (name === 'undo' || name === 'redo')\"\n             [class.dropdown]=\"name === 'align' || name === 'heading' || name === 'fontSize'\"\n             [attr.data-tooltip]=\"defaultButtons[name].title\"\n             [attr.data-edit]=\"name\">\n            <ng-container *ngIf=\"name !== 'align'; else alignButton\">\n              {{defaultButtons[name].icon}}\n            </ng-container>\n            <ng-template #alignButton>{{alignIcon}}</ng-template>\n          </a>\n        </ng-template>\n      </div>\n      <div class=\"free-editor\">\n        <div class=\"free-editor-wrapper free-iscroll\" #editor tabindex=\"1\"\n             contenteditable=\"true\" spellcheck=\"false\"\n             (focus)=\"onFocus()\" (blur)=\"onBlur()\" (keydown)=\"onKeydown($event)\"\n             (mouseup)=\"onMouseup($event)\" (mousedown)=\"onMouseDown($event)\"\n             (keyup)=\"onEtKeyup($event)\">\n        </div>\n      </div>\n      <div class=\"free-table-resizer\">\n        <div class=\"free-table-resizer-line\"></div>\n      </div>\n      <div class=\"free-modal-portal\" [style.top]=\"toolbarHeight + 'px'\" #modal\n           [style.display]=\"isModalShow ? 'block' : 'none'\">\n        <span class=\"free-modal-arrow\"></span>\n        <div class=\"editor-heading\" [style.display]=\"isHeadingShow ? 'block' : 'none'\">\n          <h1 (click)=\"onHeadingClick('h1')\">h1</h1>\n          <h2 (click)=\"onHeadingClick('h2')\">h2</h2>\n          <h3 (click)=\"onHeadingClick('h3')\">h3</h3>\n          <h4 (click)=\"onHeadingClick('h4')\">h4</h4>\n          <h5 (click)=\"onHeadingClick('h5')\">h5</h5>\n          <h6 (click)=\"onHeadingClick('h6')\">h6</h6>\n        </div>\n        <div class=\"editor-align\" [style.display]=\"isAlignShow ? 'block' : 'none'\">\n          <a #alignBtn class=\"free-toolbar-icon free-editor-tooltip\" *ngFor=\"let btn of alignButtons\"\n             (click)=\"onMenuButtonClick($event, btn, alignBtn)\"\n             [attr.data-tooltip]=\"btn.title\" [class.active]=\"btn.selected\"\n             [attr.data-edit]=\"btn.name\">{{btn.icon}}</a>\n        </div>\n        <div class=\"editor-fontSize free-iscroll\" [style.display]=\"isFontSizeShow ? 'block' : 'none'\">\n          <ul>\n            <li *ngFor=\"let size of fontSize\" [class.active]=\"size == currentFontSize\">\n              <span (click)=\"changeFontSize($event, size)\">{{size}}</span>\n            </li>\n          </ul>\n        </div>\n        <div class=\"editor-color-picker\" [style.display]=\"isColorpickerShow ? 'block' : 'none'\">\n          <free-color-picker [(ngModel)]=\"color\" (onChange)=\"onColorChange($event)\" [clickable]=\"true\"\n                             (onClick)=\"onColorpickerClick()\" [inline]=\"true\"></free-color-picker>\n        </div>\n        <div class=\"editor-link\" [style.display]=\"isLinkShow ? 'block' : 'none'\">\n          <input type=\"text\" #link placeholder=\"www.example.com\" class=\"editor-link-input\"/>\n          <button type=\"button\" class=\"editor-confirm\" (click)=\"onLinkConfirm(link.value)\">\u786E\u8BA4</button>\n        </div>\n        <div class=\"editor-file\" [style.display]=\"isUploadShow ? 'block' : 'none'\">\n          <div class=\"editor-link\">\n            <input type=\"text\" #imageUrl placeholder=\"image url\"\n                   class=\"editor-link-input\"/>\n            <button type=\"button\" class=\"editor-confirm\" (click)=\"uploadImage(imageUrl.value)\">\u786E\u8BA4</button>\n          </div>\n          <div class=\"editor-upload\">\n            <i class=\"fa fa-plus\"></i>\u56FE\u7247\u4E0A\u4F20\n            <input type=\"file\" name=\"photo\" accept=\"image/*\"\n                   class=\"editor-file-input\" (change)=\"onUploadChange($event)\"/>\n          </div>\n        </div>\n        <div class=\"editor-emotion\" [style.display]=\"isEmotionShow ? 'block' : 'none'\">\n          <ng-template ngFor [ngForOf]=\"emotions\" let-emotion let-i=\"index\">\n            <span class=\"emotion-item\">\n              <img src=\"{{path + emotion}}.svg\"\n                   class=\"emotion\" width=\"20\" height=\"20\" alt=\"\" (click)=\"onEmotionClick($event)\"/>\n            </span>\n            <br *ngIf=\"i % 8 === 7\">\n          </ng-template>\n        </div>\n        <div class=\"editor-table\" *ngIf=\"isTableShow\">\n          <p>{{selectedRow + 1}} * {{selectedCol + 1}}</p>\n          <div class=\"editor-table-wrapper\">\n            <ng-template ngFor [ngForOf]=\"tds\" let-td let-i=\"index\">\n              <span class=\"editor-table-td\" [class.active]=\"isTdInSelected(i)\"\n                    (mouseenter)=\"onTdMouseenter(i)\" (mousedown)=\"onTdMousedown(i)\">\n                <span></span>\n              </span>\n              <br *ngIf=\"i % 10 === 9\">\n            </ng-template>\n          </div>\n        </div>\n      </div>\n      <div class=\"free-popup\" #linkPopup [style.display]=\"isLinkPopupShow ? 'block' : 'none'\">\n        <div class=\"editor-link\">\n          <input type=\"text\" #linkInput [(ngModel)]=\"linkUrl\" placeholder=\"www.example.com\"\n                 class=\"editor-link-input\"/>\n          <button type=\"button\" class=\"editor-confirm\"\n                  (click)=\"onLinkChange(linkInput.value, widthInput.value, heightInput.value)\">\u786E\u8BA4\n          </button>\n        </div>\n        <div class=\"image-size\" [style.display]=\"isImageLink ? 'block' : 'none'\">\n          <span>\u5BBD\uFF1A</span><input type=\"text\" #widthInput><span>\u9AD8\uFF1A</span><input type=\"text\" #heightInput>\n        </div>\n        <div class=\"arrow\"></div>\n      </div>\n      <div class=\"free-popup\" #tablePopup [style.display]=\"isTablePopupShow ? 'block' : 'none'\">\n        <div class=\"arrow\"></div>\n        <div class=\"free-table-button\">\n          <span class=\"free-dropdown-menu free-editor-tooltip\" [attr.data-tooltip]=\"'\u884C'\"\n                (click)=\"onTableDropdown(row, col)\">\n            <i class=\"fa fa-bars\"></i>\n            <ul #row>\n              <li (click)=\"addRow(1)\">\u5728\u4E0B\u65B9\u65B0\u589E\u884C</li>\n              <li (click)=\"addRow(-1)\">\u5728\u4E0A\u65B9\u65B0\u589E\u884C</li>\n              <li (click)=\"deleteRow()\">\u5220\u9664\u884C</li>\n            </ul>\n          </span>\n          <span class=\"free-dropdown-menu free-editor-tooltip\" [attr.data-tooltip]=\"'\u5217'\"\n                (click)=\"onTableDropdown(col, row)\">\n            <i class=\"fa fa-bars fa-rotate-90\"></i>\n            <ul #col>\n              <li (click)=\"addColumn(-1)\">\u5728\u5DE6\u4FA7\u65B0\u589E\u5217</li>\n              <li (click)=\"addColumn(1)\">\u5728\u53F3\u4FA7\u65B0\u589E\u5217</li>\n              <li (click)=\"deleteColumn()\">\u5220\u9664\u5217</li>\n            </ul>\n          </span>\n          <span (click)=\"deleteTable()\" class=\"free-editor-tooltip\" [attr.data-tooltip]=\"'\u5220\u9664\u8868\u683C'\">\n            <i class=\"fa fa-trash\"></i>\n          </span>\n        </div>\n      </div>\n      <div class=\"free-editor-cache\" *ngIf=\"cacheTip\">\n        \u672C\u5730\u4FDD\u5B58\u6210\u529F\n      </div>\n      <div class=\"free-editor-counter\" *ngIf=\"counter\">\n        {{contentLength}}\n      </div>\n    </div>\n  ",
            providers: [dom_1.DomRenderer, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [dom_1.DomRenderer, core_1.Renderer2])
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
var EditorModule = (function () {
    function EditorModule() {
    }
    EditorModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, colorpicker_component_1.ColorPickerModule],
            declarations: [EditorComponent],
            exports: [EditorComponent]
        })
    ], EditorModule);
    return EditorModule;
}());
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.component.js.map
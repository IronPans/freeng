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
var EditorComponent = (function () {
    function EditorComponent() {
        this.toggleFullScreen = function () {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        };
        this.execCommand = function (command, param) {
            this.selections.restoreSelection();
            this.et.focus();
            if (!arguments[1]) {
                param = null;
            }
            document.execCommand(command, false, param);
        };
        this.fileInput = function () {
            var fi = document.querySelector('.editor-file-input');
            fi['onchange'] = function change(e) {
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
                            document.execCommand('insertHTML', false, img);
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                    }
                }
                this.closeModal();
            };
        };
        this.getStyle = function (dom, attr) {
            var value = dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, 'false')[attr];
            return parseFloat(value);
        };
        this.openModal = function (html, fn) {
            this.modal = document.createElement('div');
            this.modal.className = 'editor-modal';
            this.modal.innerHTML = html;
            this.parent.appendChild(this.modal);
            var left = this.offsetLeft + (this.getStyle(this, 'width') - this.getStyle(this.modal, 'width')) / 2;
            if (left < 0) {
                left = 3;
            }
            this.modal.style.left = left + 'px';
            if (fn) {
                fn();
            }
        };
        this.params = {
            width: 900,
            height: 500,
            borderColor: '#ddd',
            buttons: {
                heading: {
                    title: '标题',
                    icon: '\uf1dc',
                    click: function () {
                        var h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                        this.closeModal();
                        var html = '<div class="editor-heading">';
                        h.forEach(function (h1) {
                            html += '<' + h1 + ' data-h="' + h1 + '">' + h1 + '</' + h1 + '>';
                        });
                        html += '</div>';
                        this.openModal.call(this, html, this.hClick);
                    }
                },
                code: {
                    title: '引用',
                    icon: '\uf10d',
                    click: function () {
                        var html = '<blockquote class="editor-block"><p><br></p></blockquote>';
                        this.execCommand('insertHTML', html);
                        var p = document.createElement('p');
                        p.innerHTML = '<br>';
                        this.et.appendChild(p);
                    }
                },
                bold: {
                    title: '加粗',
                    icon: '\uf032',
                    click: function () {
                        this.execCommand('bold');
                    }
                },
                italic: {
                    title: '斜体',
                    icon: '\uf033',
                    click: function () {
                        this.execCommand('italic');
                    }
                },
                underline: {
                    title: '下划线',
                    icon: '\uf0cd',
                    click: function () {
                        this.execCommand('underline');
                    }
                },
                strikethrough: {
                    title: '删除线',
                    icon: '\uf0cc',
                    click: function () {
                        this.execCommand('strikethrough');
                    }
                },
                foreColor: {
                    title: '字体颜色',
                    icon: '\uf1fc',
                    click: function () {
                        var color = this.colorPicker('foreColor');
                        this.openModal.call(this, color.addColorBoard(), color.clickEvent);
                    }
                },
                backColor: {
                    title: '背景色',
                    icon: '\uf043',
                    click: function () {
                        var color = this.colorPicker('hiliteColor');
                        this.openModal.call(this, color.addColorBoard(), color.clickEvent);
                    }
                },
                justifyLeft: {
                    title: '居左',
                    icon: '\uf036',
                    click: function () {
                        this.execCommand('justifyLeft');
                    }
                },
                justifyCenter: {
                    title: '居中',
                    icon: '\uf037',
                    click: function () {
                        this.execCommand('justifyCenter');
                    }
                },
                justifyRight: {
                    title: '居右',
                    icon: '\uf038',
                    click: function () {
                        this.execCommand('justifyRight');
                    }
                },
                justifyFull: {
                    title: '两端对齐',
                    icon: '\uf039',
                    click: function () {
                        this.execCommand('justifyFull');
                    }
                },
                insertOrderedList: {
                    title: '有序列表',
                    icon: '\uf0cb',
                    click: function () {
                        this.execCommand('insertOrderedList');
                    }
                },
                insertUnorderedList: {
                    title: '无序列表',
                    icon: '\uf0ca',
                    click: function () {
                        this.execCommand('insertUnorderedList');
                    }
                },
                indent: {
                    title: 'indent',
                    icon: '\uf03c',
                    click: function () {
                        this.execCommand('indent');
                    }
                },
                outdent: {
                    title: 'outdent',
                    icon: '\uf03b',
                    click: function () {
                        this.execCommand('outdent');
                    }
                },
                createLink: {
                    title: '链接',
                    icon: '\uf0c1',
                    click: function () {
                        this.closeModal();
                        var html = "<input type=\"text\" placeholder=\"www.example.com\" class=\"editor-link-input\"/> \n                  <button type=\"button\" class=\"editor-confirm\">\u786E\u8BA4</button>";
                        this.openModal.call(this, html, this.btnClick);
                    }
                },
                insertImage: {
                    title: '插入图片',
                    icon: '\uf03e',
                    click: function () {
                        this.closeModal();
                        var html = "<div class=\"editor-file\">\u56FE\u7247\u4E0A\u4F20\n                    <input type=\"file\" name=\"photo\" accept=\"image/*\" class=\"editor-file-input\"/></div>";
                        this.openModal.call(this, html, this.fileInput);
                    }
                },
                emotion: {
                    title: '表情',
                    icon: '\uf118',
                    click: function () {
                        this.closeModal();
                        this.drawEmotion.call(this);
                    }
                },
                fullscreen: {
                    title: '全屏',
                    icon: '\uf066',
                    click: function () {
                        this.toggleFullScreen();
                    }
                },
                save: {
                    title: '保存',
                    icon: '\uf0c7'
                }
            }
        };
    }
    EditorComponent.prototype.ngOnInit = function () {
        this.editorInit();
    };
    EditorComponent.prototype.btnClick = function () {
        var confirm = document.querySelector('.editor-confirm');
        this.addEvent(confirm, 'click', function () {
            var link = document.querySelector('.editor-link-input');
            if (link['value'].trim() !== '') {
                var a = '<a href="' + link['value'] + '" target="_blank">' + link['value'] + '</a>';
                this.execCommand('insertHTML', a);
                this.closeModal();
            }
            ;
        }, false);
    };
    EditorComponent.prototype.hClick = function () {
        var heading = document.querySelector('.editor-heading');
        var child = heading.childNodes;
        // h.forEach(function (v) {
        //   this.addEvent(v, 'click', function () {
        //     var h = this.getAttribute('data-h');
        //     this.execCommand('formatBlock', '<' + h + '>');
        //     this.closeModal();
        //   }, false);
        // });
    };
    EditorComponent.prototype.addEvent = function (element, type, handler, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, useCapture ? true : false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        else if (element !== window) {
            element['on' + type] = handler;
        }
    };
    EditorComponent.prototype.drawTool = function (toolbarTop) {
        var buttons = this.params.buttons;
        for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
            var btn = buttons_1[_i];
            var btnA = document.createElement('a');
            btnA.className = 're-toolbar-icon';
            btnA.setAttribute('title', buttons[btn]['title']);
            btnA.setAttribute('data-edit', btn);
            btnA.innerHTML = buttons[btn]['icon'];
            toolbarTop.appendChild(btnA);
        }
    };
    EditorComponent.prototype.drawEmotion = function () {
        var list_smilies = ['smile', 'smiley', 'yum', 'relieved', 'blush', 'anguished', 'worried', 'sweat',
            'unamused', 'sweat_smile', 'sunglasses', 'wink', 'relaxed', 'scream', 'pensive',
            'persevere', 'mask', 'no_mouth', 'kissing_closed_eyes', 'kissing_heart', 'hushed',
            'heart_eyes', 'grin', 'frowning', 'flushed', 'fearful', 'dizzy_face', 'disappointed_relieved',
            'cry', 'confounded', 'cold_sweat', 'angry', 'anguished', 'broken_heart', 'beetle', 'good', 'no', 'beer',
            'beers', 'birthday', 'bow', 'bomb', 'coffee', 'cocktail', 'gun', 'metal', 'moon'
        ];
        var html = '';
        list_smilies.forEach(function (v) {
            html += '<img src="assets/Images/emotion/' + v + '.png" class="emotion" width="20" height="20" alt="" />';
        });
        this.openModal.call(this, html);
        function add() {
            var img = '<img src="' + this.src + '" class="emotion" width="20" height="20" alt="" />';
            document.execCommand('insertHTML', true, img);
            this.closeModal();
        }
        ;
        var emotion = Array.from(document.querySelectorAll('.emotion'));
        for (var _i = 0, emotion_1 = emotion; _i < emotion_1.length; _i++) {
            var e = emotion_1[_i];
            this.addEvent(e, 'click', add, false);
        }
    };
    EditorComponent.prototype.getCurrentRange = function () {
        // 获取当前range
        if (window.getSelection) {
            // 使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
            var sel = window.getSelection();
            if (sel.rangeCount > 0) {
                // 通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
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
        this.selectedRange = this.getCurrentRange();
    };
    EditorComponent.prototype.restoreSelection = function () {
        // 重置为上个range
        var selection = window.getSelection();
        if (this.selectedRange) {
            try {
                selection.removeAllRanges();
            }
            catch (ex) {
                // document.body.createTextRange().select();
                // document['selection'].empty();
            }
            ;
            selection.addRange(this.selectedRange);
        }
    };
    EditorComponent.prototype.toolClick = function () {
        var toolbtn = document.querySelectorAll('a[data-edit]');
        for (var i = 0; i < toolbtn.length; i++) {
            this.addEvent(toolbtn[i], 'click', function (e) {
                var btn = this.params.buttons;
                var name = this.getAttribute('data-edit');
                if (typeof btn[name]['click'] !== 'undefined') {
                    this.restoreSelection();
                    btn[name].click.call(this);
                    this.saveSelection();
                }
                else {
                }
                e.stopPropagation();
            }, false);
        }
    };
    EditorComponent.prototype.closeModal = function () {
        if (this.modal != null) {
            this.parent.removeChild(this.modal);
            this.modal = null;
        }
    };
    EditorComponent.prototype.isInModal = function (e) {
        if (this.modal != null) {
            var node = e.target;
            var isIn = false;
            var modal = document.querySelector('.editor-modal');
            while (typeof node !== 'undefined' && node.nodeName !== '#document') {
                if (node === modal) {
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
    EditorComponent.prototype.editorInit = function () {
        this.parent = '';
        var defaultValue = this.parent.innerHTML;
        this.parent.innerHTML = '';
        this.parent.className += ' re-container';
        this.parent.style.boxSizing = 'border-box';
        this.parent.style.border = '1px solid ' + this.params.borderColor;
        this.parent.style.width = this.params.width + 'px';
        this.parent.style.height = this.params.height + 'px';
        this.et = document.createElement('div');
        this.et.className = 're-editor';
        this.et.setAttribute('tabindex', 1);
        this.et.setAttribute('contenteditable', true);
        this.et.setAttribute('spellcheck', false);
        this.et.innerHTML = defaultValue;
        this.toolbarTop = document.createElement('div');
        this.toolbarTop.className = 're-toolbar re-toolbar-top';
        this.toolbarTop.style.backgroundColor = this.params.toolBg;
        this.parent.appendChild(this.toolbarTop);
        this.parent.appendChild(this.et);
        this.drawTool(this.toolbarTop);
        this.toolClick();
        this.addEvent(window, 'click', this.isInModal, false);
        this.addEvent(this.et, 'keyup', function (e) {
            this.saveSelection();
        }, false);
        this.addEvent(this.et, 'mouseup', function (e) {
            this.saveSelection();
        }, false);
        var addActiveClass = function () {
            this.parentNode.classList.add('active');
        };
        var removeActiveClass = function () {
            this.parentNode.classList.remove('active');
        };
        this.addEvent(this.et, 'focus', addActiveClass, false);
        this.addEvent(this.et, 'blur', removeActiveClass, false);
        var topHeight = document.querySelector('.re-toolbar-top')['offsetHeight'];
        this.et.style.height = (this.params.height - topHeight) + 'px';
    };
    EditorComponent.prototype.getHTML = function () {
        var et = document.querySelector('.re-editor');
        return et.innerHTML;
    };
    EditorComponent.prototype.getText = function () {
        var et = document.querySelector('.re-editor');
        return et.textContent;
    };
    EditorComponent.prototype.colorPicker = function (command) {
        var HSVtoRGB = function (h, s, v) {
            var r, g, b, i, f, p, q, t;
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v, g = t, b = p;
                    break;
                case 1:
                    r = q, g = v, b = p;
                    break;
                case 2:
                    r = p, g = v, b = t;
                    break;
                case 3:
                    r = p, g = q, b = v;
                    break;
                case 4:
                    r = t, g = p, b = v;
                    break;
                case 5:
                    r = v, g = p, b = q;
                    break;
            }
            var hr = Math.floor(r * 255).toString(16);
            var hg = Math.floor(g * 255).toString(16);
            var hb = Math.floor(b * 255).toString(16);
            return '#' + (hr.length < 2 ? '0' : '') + hr +
                (hg.length < 2 ? '0' : '') + hg +
                (hb.length < 2 ? '0' : '') + hb;
        };
        var that = {};
        that['addColorBoard'] = function () {
            var table = document.createElement('table');
            table.setAttribute('cellpadding', '0');
            table.setAttribute('cellspacing', '0');
            table.setAttribute('unselectable', 'on');
            table.style.border = '1px solid #d9d9d9';
            table.setAttribute('id', 'color-board');
            for (var row = 1; row < 15; ++row) {
                var rows = document.createElement('tr');
                for (var col = 0; col < 25; ++col) {
                    var color = void 0;
                    if (col === 24) {
                        var gray = Math.floor(255 / 13 * (14 - row)).toString(16);
                        var hexg = (gray.length < 2 ? '0' : '') + gray;
                        color = '#' + hexg + hexg + hexg;
                    }
                    else {
                        var hue = col / 24;
                        var saturation = row <= 8 ? row / 8 : 1;
                        var value = row > 8 ? (16 - row) / 8 : 1;
                        color = HSVtoRGB(hue, saturation, value);
                    }
                    var td = document.createElement('td');
                    td.setAttribute('title', color);
                    td.style.cursor = 'url(../util/TGeditor/di.ico),crosshair';
                    td.setAttribute('unselectable', 'on');
                    td.style.backgroundColor = color;
                    td.width = '12';
                    td.height = '12';
                    rows.appendChild(td);
                }
                table.appendChild(rows);
            }
            ;
            var box = document.createElement('div');
            box.appendChild(table);
            return box.innerHTML;
        };
        that['clickEvent'] = function () {
            // let tds = document.getElementById('color-board');
            // tds = tds.childNodes[0].getElementsByTagName('td');
            // for (let i = 0; i < tds.length; i++) {
            //   this.addEvent(tds[i], 'click', function() {
            //     const color = this.getAttribute('title');
            //     this.execCommand(command, color);
            //     this.closeModal();
            //   }, false);
            // }
        };
        return that;
    };
    return EditorComponent;
}());
EditorComponent = __decorate([
    core_1.Component({
        selector: 'free-editor',
        templateUrl: './editor.component.html',
        styleUrls: ['./editor.component.scss']
    }),
    __metadata("design:paramtypes", [])
], EditorComponent);
exports.EditorComponent = EditorComponent;
var EditorModule = (function () {
    function EditorModule() {
    }
    return EditorModule;
}());
EditorModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [EditorComponent],
        exports: [EditorComponent]
    })
], EditorModule);
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.component.js.map
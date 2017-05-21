import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  params: any;
  selectedRange: any;
  et: any;
  toolbarTop: any;
  modal: any;
  parent: any;

  constructor() {
    this.params = {
      width: 900,
      height: 500,
      borderColor: '#ddd',
      buttons: {
        heading: {
          title: '标题',
          icon: '\uf1dc',
          click: function () {
            const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            this.closeModal();
            let html = '<div class="editor-heading">';
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
            const html = '<blockquote class="editor-block"><p><br></p></blockquote>';
            this.execCommand('insertHTML', html);
            const p = document.createElement('p');
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
            const color = this.colorPicker('foreColor');
            this.openModal.call(this, color.addColorBoard(), color.clickEvent);
          }
        },
        backColor: {
          title: '背景色',
          icon: '\uf043',
          click: function () {
            const color = this.colorPicker('hiliteColor');
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
            const html = `<input type="text" placeholder="www.example.com" class="editor-link-input"/> 
                  <button type="button" class="editor-confirm">确认</button>`;

            this.openModal.call(this, html, this.btnClick);
          }
        },
        insertImage: {
          title: '插入图片',
          icon: '\uf03e',
          click: function () {
            this.closeModal();
            const html = `<div class="editor-file">图片上传
                    <input type="file" name="photo" accept="image/*" class="editor-file-input"/></div>`;
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

  ngOnInit() {
    this.editorInit();
  }

  btnClick() {
    const confirm = document.querySelector('.editor-confirm');
    this.addEvent(confirm, 'click', function () {
      const link = document.querySelector('.editor-link-input');
      if (link['value'].trim() !== '') {
        const a = '<a href="' + link['value'] + '" target="_blank">' + link['value'] + '</a>';
        this.execCommand('insertHTML', a);
        this.closeModal();
      }
      ;
    }, false);
  }

  hClick() {
    const heading = document.querySelector('.editor-heading');
    const child = heading.childNodes;
    // h.forEach(function (v) {
    //   this.addEvent(v, 'click', function () {
    //     var h = this.getAttribute('data-h');
    //     this.execCommand('formatBlock', '<' + h + '>');
    //     this.closeModal();
    //   }, false);
    // });
  }

  addEvent(element, type, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, useCapture ? true : false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else if (element !== window) {
      element['on' + type] = handler;
    }
  }

  drawTool(toolbarTop) {
    const buttons = this.params.buttons;
    for (const btn of buttons) {
      const btnA = document.createElement('a');
      btnA.className = 're-toolbar-icon';
      btnA.setAttribute('title', buttons[btn]['title']);
      btnA.setAttribute('data-edit', btn);
      btnA.innerHTML = buttons[btn]['icon'];
      toolbarTop.appendChild(btnA);
    }
  }

  drawEmotion() {
    const list_smilies = ['smile', 'smiley', 'yum', 'relieved', 'blush', 'anguished', 'worried', 'sweat',
      'unamused', 'sweat_smile', 'sunglasses', 'wink', 'relaxed', 'scream', 'pensive',
      'persevere', 'mask', 'no_mouth', 'kissing_closed_eyes', 'kissing_heart', 'hushed',
      'heart_eyes', 'grin', 'frowning', 'flushed', 'fearful', 'dizzy_face', 'disappointed_relieved',
      'cry', 'confounded', 'cold_sweat', 'angry', 'anguished', 'broken_heart', 'beetle', 'good', 'no', 'beer',
      'beers', 'birthday', 'bow', 'bomb', 'coffee', 'cocktail', 'gun', 'metal', 'moon'
    ];
    let html = '';
    list_smilies.forEach(function (v) {
      html += '<img src="assets/Images/emotion/' + v + '.png" class="emotion" width="20" height="20" alt="" />';
    });
    this.openModal.call(this, html);

    function add() {
      const img = '<img src="' + this.src + '" class="emotion" width="20" height="20" alt="" />';
      document.execCommand('insertHTML', true, img);
      this.closeModal();
    };
    const emotion = Array.from(document.querySelectorAll('.emotion'));
    for (const e of emotion) {
      this.addEvent(e, 'click', add, false);
    }
  }

  toggleFullScreen = function () {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  execCommand = function (command, param) {
    this.selections.restoreSelection();
    this.et.focus();
    if (!arguments[1]) {
      param = null;
    }
    document.execCommand(command, false, param);
  };

  getCurrentRange() {
    // 获取当前range
    if (window.getSelection) {
      // 使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
      const sel = window.getSelection();
      if (sel.rangeCount > 0) {
        // 通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
        return sel.getRangeAt(0);
      }

    } else if (document['selection']) {
      const sel = document['selection'];
      return sel.createRange();
    }
    return null;
  }

  saveSelection() {
    this.selectedRange = this.getCurrentRange();
  }

  restoreSelection() {
    // 重置为上个range
    const selection = window.getSelection();
    if (this.selectedRange) {
      try {
        selection.removeAllRanges();
      } catch (ex) {
        // document.body.createTextRange().select();
        // document['selection'].empty();
      }
      ;
      selection.addRange(this.selectedRange);
    }
  }

  fileInput = function () {
    const fi = document.querySelector('.editor-file-input');

    fi['onchange'] = function change(e) {
      const files = e.target.files;
      let file = null;
      let url = null;
      if (files && files.length > 0) {
        file = files[0];
        try {
          const fileReader = new FileReader();
          fileReader.onload = function (event: any) {
            url = event.target.result;
            const img = '<img src="' + url + '"/>';
            document.execCommand('insertHTML', false, img);
          };
          fileReader.readAsDataURL(file);
        } catch (e) {

        }
      }
      this.closeModal();
    };
  };


  toolClick() {
    const toolbtn = document.querySelectorAll('a[data-edit]');
    for (let i = 0; i < toolbtn.length; i++) {
      this.addEvent(toolbtn[i], 'click', function (e) {
        const btn = this.params.buttons;
        const name = this.getAttribute('data-edit');
        if (typeof btn[name]['click'] !== 'undefined') {
          this.restoreSelection();
          btn[name].click.call(this);
          this.saveSelection();
        } else {

        }
        e.stopPropagation();
      }, false);
    }
  }

  getStyle = function (dom, attr) {
    const value = dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, 'false')[attr];
    return parseFloat(value);
  };

  openModal = function (html, fn) {
    this.modal = document.createElement('div');
    this.modal.className = 'editor-modal';
    this.modal.innerHTML = html;
    this.parent.appendChild(this.modal);
    let left = this.offsetLeft + (this.getStyle(this, 'width') - this.getStyle(this.modal, 'width')) / 2;
    if (left < 0) {
      left = 3;
    }
    this.modal.style.left = left + 'px';
    if (fn) {
      fn();
    }
  };

  closeModal() {
    if (this.modal != null) {
      this.parent.removeChild(this.modal);
      this.modal = null;
    }
  }

  isInModal(e) {
    if (this.modal != null) {
      let node = e.target;
      let isIn = false;
      const modal = document.querySelector('.editor-modal');
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
  }

  editorInit() {
    this.parent = '';
    const defaultValue = this.parent.innerHTML;
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
    const addActiveClass = function () {
      this.parentNode.classList.add('active');
    };
    const removeActiveClass = function () {
      this.parentNode.classList.remove('active');
    };
    this.addEvent(this.et, 'focus', addActiveClass, false);
    this.addEvent(this.et, 'blur', removeActiveClass, false);

    const topHeight = document.querySelector('.re-toolbar-top')['offsetHeight'];
    this.et.style.height = (this.params.height - topHeight) + 'px';
  }

  getHTML() {
    const et = document.querySelector('.re-editor');
    return et.innerHTML;
  }

  getText() {
    const et = document.querySelector('.re-editor');
    return et.textContent;
  }

  colorPicker(command) {
    const HSVtoRGB = function(h, s, v) {
      let r, g, b, i, f, p, q, t;
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
      const hr = Math.floor(r * 255).toString(16);
      const hg = Math.floor(g * 255).toString(16);
      const hb = Math.floor(b * 255).toString(16);
      return '#' + (hr.length < 2 ? '0' : '') + hr +
        (hg.length < 2 ? '0' : '') + hg +
        (hb.length < 2 ? '0' : '') + hb;
    };
    const that = {};
    that['addColorBoard'] = function() {
      const table = document.createElement('table');
      table.setAttribute('cellpadding', '0');
      table.setAttribute('cellspacing', '0');
      table.setAttribute('unselectable', 'on');
      table.style.border = '1px solid #d9d9d9';
      table.setAttribute('id', 'color-board');
      for (let row = 1; row < 15; ++row) {
        const rows = document.createElement('tr');
        for (let col = 0; col < 25; ++col) {
          let color;
          if (col === 24) {
            const gray = Math.floor(255 / 13 * (14 - row)).toString(16);
            const hexg = (gray.length < 2 ? '0' : '') + gray;
            color = '#' + hexg + hexg + hexg;
          } else {
            const hue = col / 24;
            const saturation = row <= 8 ? row / 8 : 1;
            const value = row > 8 ? (16 - row) / 8 : 1;
            color = HSVtoRGB(hue, saturation, value);
          }
          const td = document.createElement('td');
          td.setAttribute('title', color);
          td.style.cursor = 'url(../util/TGeditor/di.ico),crosshair';
          td.setAttribute('unselectable', 'on');
          td.style.backgroundColor = color;
          td.width = '12';
          td.height = '12';
          rows.appendChild(td);
        }
        table.appendChild(rows);
      };
      const box = document.createElement('div');
      box.appendChild(table);
      return box.innerHTML;
    };
    that['clickEvent'] = function() {
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
  }
}
@NgModule({
  imports: [CommonModule],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})

export class EditorModule {}

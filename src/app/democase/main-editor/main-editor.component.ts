import {Component, HostBinding, OnInit} from '@angular/core';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css'],
  animations: [fadeInUp]
})
export class MainEditorComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  buttons: any;
  text: string;
  pageTitle = 'Components-Editor';
  constructor() {
    this.buttons = {
      heading: {
        title: '标题',
        icon: '\uf1dc'
      },
      code: {
        title: '引用',
        icon: '\uf10d'
      }
    };
    this.text = `<p>这是一个富文本编辑器，简单高效！</p>
    <p>
    <ul>
    <li>123</li>
    <li>43 <span>work</span></li>
</ul>
</p>
		<p>你可以<a href="http://123">123</a>内容，也可以通过getText()获取纯文本内容</p>`;
  }

  ngOnInit() {
  }

}

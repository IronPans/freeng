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
    this.text = `<p>
Editor is a lightweight WYSIWYG HTML Editor written in Javascript
that enables rich text editing capabilities for your applications.</p>
    <p>
    <ul>
    <li>Simple</li>
    <li>Effective</li>
</ul>
</p>
		<p>It has complete documentation.
		<img width="100" src="https://cdn0.froala.com/assets/editor/pages/B/editor-photo-9fb6e5149212f06a0a54df52ccc30934.jpg"></p>`;
  }

  ngOnInit() {
  }

  onUploadCompleted(event: any) {
    console.log(event);
  }
}

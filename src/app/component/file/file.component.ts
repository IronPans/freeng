import {CommonModule} from '@angular/common';
import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'free-file',
  template: `
    <div class="free-file">
      <div class="free-file-text">{{title}}</div>
      <div class="free-file-inner">
        <input type="file" #input name="uploadFile" (change)="fileChange($event)">
      </div>
    </div>
    <div class="free-file-review" *ngIf="review">
      <ul>
        <li *ngFor="let file of files;index as i">
          {{file.name}}
          <span class="free-file-delete" (click)="onDelete(i)">删除</span>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() title = '图片上传';
  files: any[];
  @Input() review: boolean;
  @Input() multiple: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() media: string;
  @ViewChild('input') input: ElementRef;
  constructor(private renderer2: Renderer2) {
    this.files = [];
  }

  ngOnInit() {
    const _input = this.input.nativeElement;
    if (this.multiple) {
      this.renderer2.setProperty(_input, 'multiple', true);
    }

    if (this.media) {
      this.renderer2.setProperty(_input, 'accept', this.media);
    }
  }

  fileChange(event: any) {
    const files = event.target.files;
    if (this.review) {
      for (const file of files) {
        this.files.push(file);
      }
    }
    this.onChange.emit(this.files);
  }

  onDelete(index: number) {
    this.files.splice(index, 1);
    this.onChange.emit(this.files)
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [FileComponent],
  exports: [FileComponent]
})

export class FileModule {}
